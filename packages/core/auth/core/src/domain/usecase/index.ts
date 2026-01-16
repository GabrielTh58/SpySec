import { LoginUser, LoginInputDTO } from './Login.usecase';
import { RegisterUser, RegisterUserInputDTO } from './RegisterUser.usecase';
import { LoginWithGoogle, LoginWithGoogleInputDTO } from './LoginGoogle.usecase'
import { UpdateProfileType, UpdateProfileTypeInputDTO } from './UpdateProfileType.usecase'
import { AuthResultDTO } from './shared/usecases.dto'

export {
  LoginUser,
  RegisterUser,
  LoginWithGoogle,
  UpdateProfileType,
};

export type {
  LoginInputDTO,
  RegisterUserInputDTO,
  LoginWithGoogleInputDTO,
  UpdateProfileTypeInputDTO,
  AuthResultDTO
};
