import { GetPlayerProfile, PlayerProfileOutputDTO } from "./GetPlayerProfile.usecase";
import { GetAllBadges, BadgeDTO } from "./GetAllBadges.usecase"
import { GetRanking, RankingDTO } from "./GetRanking.usecase";
import { RegisterGameplay, RegisterGameplayInputDTO, RegisterGameplayOutputDTO } from "./RegisterGameplay.usecase";
import { CreatePlayer } from "./CreatePlayer.usecase";
import { UpdateProfile, UpdateProfileInputDTO, UpdateProfileOutputDTO } from "./UpdateProfile.usecase"

export type { RankingDTO, BadgeDTO, PlayerProfileOutputDTO, UpdateProfileInputDTO, UpdateProfileOutputDTO, RegisterGameplayInputDTO, RegisterGameplayOutputDTO }
export { GetRanking, RegisterGameplay, GetAllBadges, GetPlayerProfile, CreatePlayer, UpdateProfile }