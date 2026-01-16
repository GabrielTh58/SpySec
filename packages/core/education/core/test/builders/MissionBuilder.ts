import { Mission, CreateMissionInputDTO, MissionBlock } from '@spysec/education'


export class MissionBuilder {
  private props: CreateMissionInputDTO;

  constructor() {
    const defaultContent: MissionBlock[] = [
      { 
        id: "block-1", 
        type: "INFO", 
        data: { text: "Conteúdo padrão" } 
      }
    ];

    this.props = {
      trackId: "track-default-id",
      title: "Missão de Teste",
      description: "Descrição da missão",
      xpReward: 100,
      order: 1,
      category: "General",
      content: defaultContent
    };
  }

  public static aMission(): MissionBuilder {
    return new MissionBuilder();
  }

  public inTrack(trackId: string): this {
    this.props.trackId = trackId;
    return this;
  }

  public withOrder(order: number): this {
    this.props.order = order;
    return this;
  }

  public withXp(xp: number): this {
    this.props.xpReward = xp;
    return this;
  }

  public withContent(blocks: MissionBlock[]): this {
    this.props.content = blocks;
    return this;
  }

  public build(): Mission {
    const missionOrError = Mission.create(this.props);
    if (missionOrError.failed) {
      throw new Error(`Erro ao construir Mission no teste: ${JSON.stringify(missionOrError.errors)}`);
    }
    return missionOrError.value!;
  }
}