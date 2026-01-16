import { Result, UseCase } from "@spysec/shared";
import { PlayerRepository } from "../provider";
import { Player } from "../model";
import { CreatePlayerInput } from "../model/Player";

export class CreatePlayer implements UseCase<CreatePlayerInput, Player>{
    constructor(
        private readonly repoPlayer: PlayerRepository
    ){} 

    async execute(input: CreatePlayerInput): Promise<Result<Player>> {
        const { userId, nickname, type } = input;        

        const playerExists = await this.repoPlayer.findByUserId(userId)
        if(playerExists) return Result.fail('PLAYER_ALREADY_EXISTS')

        const playerOrError = Player.create({ 
            userId, 
            nickname, 
            type 
        });
        if(playerOrError.failed) return Result.fail(playerOrError.errors)

       const player = playerOrError.value!

       const result = await Result.tryAsync(() => this.repoPlayer.save(player))
       if(result.failed) return Result.fail(result.errors)

        return Result.ok(player);       
    }
}