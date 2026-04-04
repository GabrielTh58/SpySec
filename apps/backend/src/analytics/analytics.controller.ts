import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AnalyticsFacade } from '@spysec/analytics-adapter'
import type { UserPayloadJwt } from 'src/auth/auth.controller';
import { UserLogged } from 'src/common/decorators/user.decorator';
import { AnalyzeMissionDto } from './dto/AnalyzeMission.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';

@UseGuards(AuthGuard)
@Controller('analytics')
export class AnalyticsController {
    constructor(
        private readonly analyticsFacade: AnalyticsFacade
    )
    {}

    @Post('missions/:missionId/analyze')
    async analyzeMissionMistakes(
        @Body() body: AnalyzeMissionDto,
        @UserLogged() user: UserPayloadJwt,
        @Param('missionId') missionId: string
    ) {
        return this.analyticsFacade.generateMissionInsight({
            userId: user.sub, 
            missionId: missionId,
            answers: body.answers 
        });
    }
}
