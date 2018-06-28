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
  photographer: { photographerId: string, name: string, count: number }[];
  subject: { subjectId: string, name: string , count: number}[];
}

export interface GameProgress {
  players:
    { id: string, name: string }[];
  snapEvents:
    { photographerId: string; subjectId: string; photoUrl: string; photoPath: string; createdAt: Date; }[];
}
