export class Game {
  public id: string;
  public startedAt: Date;
  public finishedAt: Date;
}

export interface GameConf {
  during: number;
}

export interface GameEvent {
  gameId: string;
  [propName: string]: any;
}

export interface SnapEvent extends GameEvent {
  photographerId: string;
  subjectId: string;
  photoUrl: string;
  createdAt: Date;
}

