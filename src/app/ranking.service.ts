import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs';
import {GameEvent, RankingEvent, SnapEvent} from '@app/game';
import {GameManagementService} from '@app/game-management.service';
import {flatMap} from 'rxjs/operators';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private updatedSubject = new Subject<RankingEvent>();

  private SNAP_EVENTS_REF_PATH = 'snapEvents';

  constructor(private db: AngularFireDatabase, private game: GameManagementService) {
    game.startedObservable.pipe(
      flatMap((e: GameEvent) => db.list(`${this.SNAP_EVENTS_REF_PATH}/${e.gameId}`).valueChanges())
    ).subscribe((events: SnapEvent[]) => {
      setInterval(() => this.emitSummary(events), 1000);
    });
  }

  get updatedObservable(): Observable<RankingEvent> {
    return this.updatedSubject.asObservable();
  }

  private emitSummary(events: SnapEvent[]) {
    // TODO eventsを集計してnext

    this.updatedSubject.next({
      gameId: this.game.currentGame.id,
      photographer: [],
      subject: []
    });
  }

}
