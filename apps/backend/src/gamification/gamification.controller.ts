import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { GamificationFacade } from '@spysec/gamification-adapter';
import type { UserPayloadJwt } from 'src/auth/auth.controller';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { UserLogged } from 'src/common/decorators/user.decorator';

@UseGuards(AuthGuard)
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationFacade: GamificationFacade) {}

  @Get('profile')
  getPlayerProfile(@UserLogged() user: UserPayloadJwt) {
    return this.gamificationFacade.getPlayerProfile(user.sub);
  }

  @Get('badges')
  getAllBadges() {
    return this.gamificationFacade.getAllBadges();
  }

  @Get('ranking')
  getRanking(@Query('limit') limit: number) {
    const safeLimit = +limit || 10;
    return this.gamificationFacade.getRanking(+safeLimit);
  }

  @Patch('nickname')
  updateNickName(
    @UserLogged() user: UserPayloadJwt, 
    @Body() body: { nickName: string }
  ) {
    return this.gamificationFacade.updateProfile({
      userId: user.sub,
      newData: {
        nickname: body.nickName 
      }
    });
  }
}
