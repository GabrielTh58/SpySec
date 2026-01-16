import { DomainEvents, Result, UseCase } from "@spysec/shared";
import { EducationRepository } from "../provider/Education.repository";
import { TrackProgressRepository } from "../provider/TrackProgress.repository";
import { TrackProgress } from "../model/TrackProgress.entity";
import { MissionCompletedEvent } from "../events/MissionCompleted.event";
import { TrackCompletedEvent } from "../events/TrackCompleted.event"; 

export interface CompleteMissionInputDTO {
    userId: string;
    missionId: string;
}

export interface CompleteMissionOutputDTO {
    xpEarned: number;
    missionTitle: string;
    nextMissionId?: string | null;
    isTrackFinished: boolean; 
}

export class CompleteMission implements UseCase<CompleteMissionInputDTO, CompleteMissionOutputDTO> {
    constructor(
        private readonly repoEducation: EducationRepository,
        private readonly repoProgress: TrackProgressRepository, 
    ) {}

    async execute(input: CompleteMissionInputDTO): Promise<Result<CompleteMissionOutputDTO>> {
        // 1. Busca a missão
        const missionOrError = await Result.tryAsync(() =>
            this.repoEducation.findMissionById(input.missionId)
        );
        if (missionOrError.failed) return Result.fail(missionOrError.errors);

        const mission = missionOrError.value;
        if (!mission) return Result.fail("MISSION_NOT_FOUND");

        // 2. Busca ou Cria o Progresso
        let progress = await this.repoProgress.findProgress(input.userId, mission.trackId);
        
        if (!progress) {
            const newProgressResult = TrackProgress.start({ 
                userId: input.userId, 
                trackId: mission.trackId 
            });
            if (newProgressResult.failed) return Result.fail(newProgressResult.errors);            
            progress = newProgressResult.value!;
        }

        // 3. Verifica se é a primeira vez que completa (para dar XP)
        const isFirstCompletion = progress.lastCompletedOrder < mission.order;

        // 4. Atualiza o progresso na memória
        progress = progress.updateLastMission(mission.order);

        // 5. Verifica o Futuro: Existe próxima missão?
        // Se não existir missão com ordem + 1, significa que esta é a última.
        const nextMissionResult = await Result.tryAsync(() =>
            this.repoEducation.findMissionByOrder(mission.trackId, mission.order + 1)
        );  
        
        const nextMission = nextMissionResult.succeeded ? nextMissionResult.value : null;
        const hasNextMission = !!nextMission;
        const isLastMission = !hasNextMission;

        if (isLastMission && !progress.isCompleted) {
            const completeResult = progress.complete(0);
            if (completeResult.succeeded) {
                progress = completeResult.value!; 
            }
        }

        // 7. Salva no Banco
        const saveResult = await Result.tryAsync(() => this.repoProgress.save(progress));
        if(saveResult.failed) return Result.fail("ERROR_SAVE_DB");

        if (isFirstCompletion) {
            // Evento A: Missão Completada (Dá XP)
            DomainEvents.dispatch(new MissionCompletedEvent({
                userId: input.userId,
                missionId: input.missionId,
                xpEarned: mission.xpReward, 
                trackId: mission.trackId,
                missionCategory: mission.category,
                isLastMission: isLastMission 
            }));

            // Evento B: Trilha Completada (Dá Badge)
        if (isLastMission) {                                
            const trackSlug = await this.repoEducation.findTrackSlugById(mission.trackId);
            
            DomainEvents.dispatch(new TrackCompletedEvent({
                userId: input.userId,
                trackId: mission.trackId,
                trackSlug: trackSlug || '',    
                occurredAt: new Date()
                }));
            }
        }

        return Result.ok({
            missionTitle: mission.title,
            nextMissionId: nextMission ? nextMission.id.toString() : null,            
            xpEarned: isFirstCompletion ? mission.xpReward : 0,
            isTrackFinished: isLastMission
        });
    }
}