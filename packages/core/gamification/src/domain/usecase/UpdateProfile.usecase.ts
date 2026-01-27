import { Result, UseCase } from "@spysec/shared";
import { IPlayerUpdateParams, PlayerRepository } from "../provider";
import { ProfileType } from "@spysec/auth";

export interface UpdateProfileInputDTO {
  userId: string;
  newData: IPlayerUpdateParams;
}

export interface UpdateProfileOutputDTO {
  playerId: string;
  userId: string;
  nickname: string;
  type: ProfileType;
  currentLevel: number;
  currentXp: number;
  streak: number;
  completedMissionsCount: number;
  totalStudySeconds: number;
  badges: string[];
}

export class UpdateProfile implements UseCase<UpdateProfileInputDTO, UpdateProfileOutputDTO> {
  constructor(
    private readonly repoPlayer: PlayerRepository
  ) { }

  async execute(input: UpdateProfileInputDTO): Promise<Result<UpdateProfileOutputDTO>> {
    const { newData, userId } = input

    const currentPlayer = await this.repoPlayer.findByUserId(userId);
    if (!currentPlayer) return Result.fail('USER_NOT_FOUND')

    let updatedPlayer = currentPlayer;

    if (newData && newData.nickname) {
      const newNick = newData.nickname;

      if (newNick !== currentPlayer.nickname) {
        const nicknameTaken = await this.repoPlayer.existsByNickname(newNick);        
        if (nicknameTaken) return Result.fail("NICKNAME_ALREADY_TAKEN");
        
        const resultOrError = await Result.tryAsync(() => 
            this.repoPlayer.update(userId, { nickname: newNick })
        );
        
        if (resultOrError.failed) return Result.fail(resultOrError.errors);
        
        updatedPlayer = resultOrError.value!;
      }
    }

    const output: UpdateProfileOutputDTO = {
      playerId: updatedPlayer.id.toString(),
      userId: updatedPlayer.userId,
      nickname: updatedPlayer.nickname,
      type: updatedPlayer.type as ProfileType,
      currentLevel: updatedPlayer.currentLevel,
      currentXp: updatedPlayer.currentXp,
      streak: updatedPlayer.streak,
      completedMissionsCount: updatedPlayer.completedMissionsCount || 0,
      totalStudySeconds: updatedPlayer.totalStudySeconds,
      badges: updatedPlayer.badges,
    };

    return Result.ok(output);
  }
}