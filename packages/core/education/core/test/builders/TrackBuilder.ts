import { CreateTrackInputDTO, Track, TrackDifficulty, TrackVisibility } from "@spysec/education";

export class TrackBuilder {
  private props: CreateTrackInputDTO = {
    title: "Trilha de Teste",
    description: "Uma descrição qualquer",  
    iconUrl: "https://example.com/icon.png",
    difficulty: TrackDifficulty.BASIC,
    targetProfile: TrackVisibility.ALL,
    minLevel: 0,
    prerequisiteTrackId: null 
  };

  static aTrack(): TrackBuilder {
    return new TrackBuilder();
  }

  withTitle(title: string): this {
    this.props.title = title;
    return this;
  }

  withDescription(description: string): this {
    this.props.description = description
    return this
  }

  withIconUrl(iconUrl: string): this {
    this.props.iconUrl = iconUrl
    return this
  }
  
  withDifficulty(difficulty: TrackDifficulty): this {
    this.props.difficulty = difficulty;
    return this;
  }

  forProfile(profile: TrackVisibility): this {
    this.props.targetProfile = profile;
    return this;
  }

  withMinLevel(level: number): this {
    this.props.minLevel = level;
    return this;
  }

  withPrerequisite(trackId: string | undefined): this {
    this.props.prerequisiteTrackId = trackId;
    return this;
  }
  
  build(): Track {
    const trackOrError = Track.create(this.props);
    if (trackOrError.failed) {
      throw new Error(`Error building Track in test: ${JSON.stringify(trackOrError.errors)}`);
    }
    return trackOrError.value!;
  }
}