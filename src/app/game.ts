export class Game {
  public startedAt: Date;
  public finishedAt: Date;
}

export interface GameConf {
  during: number;
}

export interface SnapEvent {
  photographerId: string; subjectId: string;
  photoUrl: string;
  photoPath: string;
  createdAt: Date;
}

export interface RankingEvent {
  photographer: { uuid: string, name: string, score: number, order: number }[];
  subject: { uuid: string, name: string , score: number, order: number }[];
}

export interface GameProgress {
  players:
    { id: string, name: string }[];
  snapEvents:
    { photographerId: string; subjectId: string; photoUrl: string; photoPath: string; createdAt: Date; }[];
}
