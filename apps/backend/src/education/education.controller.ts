import { Controller, Get, Post, Body, Param, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { EducationFacade } from '@spysec/education-adapter'; 
import { BrowseTracksInputDTO } from '@spysec/education';
import { CreateTrackDto } from './dto/create-track.dto'; 
import { CreateMissionDto } from './dto/create-mission.dto';
import { UserLogged } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import type { UserPayloadJwt } from 'src/auth/auth.controller';

@UseGuards(AuthGuard)
@Controller('education')
export class EducationController {
  constructor(private readonly educationFacade: EducationFacade) {}

  @Post('tracks') 
  async createTrack(@Body() dto: CreateTrackDto) {
    return this.educationFacade.createTrack(dto);
  }
  
  @Post('missions')
  async createMission(@Body() dto: CreateMissionDto) {
    return this.educationFacade.createMission(dto);
  }

  @Get('tracks') 
  async getAllTracks(@UserLogged() user: UserPayloadJwt) {
    const input: BrowseTracksInputDTO = {
        userId: user.sub.toString(),
        userProfile: user.scope
    };
    return this.educationFacade.browseTracks(input);
  }

  @Get('tracks/:trackId')
  async getTrackDetails(
      @Param('trackId', ParseUUIDPipe) trackId: string, 
      @UserLogged() user: UserPayloadJwt
  ) {
    return this.educationFacade.getTrackDetails({
        trackId,
        userId: user.sub.toString()
    });
  }

  @Get('missions/:missionId')
  async getMissionData(
      @Param('missionId') missionId: string,
      @UserLogged() user: UserPayloadJwt
  ) {
    return this.educationFacade.getMissionData({
        missionId,
        userId: user.sub.toString()
    });
  } 

  @Post('missions/:missionId/complete')
  async completeMission(
      @Param('missionId') missionId: string,
      @UserLogged() user: UserPayloadJwt 
  ) {
    return this.educationFacade.completeMission({
        missionId,
        userId: user.sub.toString()
    });
  }
}