import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Observable, zip} from 'rxjs';
import {GameEvent, RankingEvent} from '@app/game';
import {GameManagementService} from '@app/game-management.service';
import {map, take} from 'rxjs/operators';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private updatedSubject = new Subject<RankingEvent>();

  private SNAP_EVENTS_REF_PATH = 'snapEvents';
  private PLAYER_REF_PATH = 'players';
  private SUMMARY_INTERVAL_TIME = 1000;

  constructor(private db: AngularFireDatabase, private game: GameManagementService) {
    game.startedObservable.subscribe((startedEvent: GameEvent) => {
      setInterval(() => this.updateRanking(startedEvent.gameId), this.SUMMARY_INTERVAL_TIME);
    });
  }

  get updatedObservable(): Observable<RankingEvent> {
    return this.updatedSubject.asObservable();
  }

  private updateRanking(gameId: string): void {
    this.aggregateGameProgress(gameId).subscribe((ranking: RankingEvent) => {
      this.updatedSubject.next(ranking);
    });
  }

  private getGameProgress(gameId: string): Observable<GameProgress> {
    const snapEvents = this.db.list(`${this.SNAP_EVENTS_REF_PATH}/${gameId}`).valueChanges().pipe(take(1));
    const players = this.db.list(`${this.PLAYER_REF_PATH}/${gameId}`).valueChanges().pipe(take(1));
    return zip(snapEvents, players, (s: any, p: any) => ({gameId: gameId, snapEvents: s, players: p}));
  }

  private aggregateGameProgress(gameId: string): Observable<RankingEvent> {
    return this.getGameProgress(gameId).pipe(
      map((data: GameProgress) => {
        // TODO dataを集計してreturn
        return {
          gameId: this.game.currentGame.id,
          photographer: [{photographerId: 'ddd', name: 'sss2'}],
          subject: [{subjectId: 'sss', name: 'sss2'}]
        };
      }));
  }
}

interface GameProgress {
  gameId: string;
  players: [
      {
        id: string,
        name: string
      }
  ];
  snapEvents: [
    {
      photographerId: string;
      subjectId: string;
      photoUrl:  string;
      photoPath:  string;
      createdAt: Date;
    }
  ];
}
