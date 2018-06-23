import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {SnapEvent} from '@app/game';
import {Observable} from 'rxjs/internal/Observable';
import {GameManagementService} from '@app/game-management.service';
import {map} from 'rxjs/operators';
import {interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotographService {

  private EVENT_REF_PATH = 'snapEvents';

  constructor(private db: AngularFireDatabase, private game: GameManagementService) {}

  public getCurrentGameSnappedObservable(): Observable<SnapEvent> {
    // TODO for debug
    return interval(600).pipe(
      map(() => {
        return {
          gameId: 'lfkjslf',
          photographerId: 'lsjf',
          subjectId: 'dlf',
          photoUrl: 'assets/camera_kao_ninshiki.png',
          photoPath: '',
          createdAt: new Date()
        };
      })
    );

    // const gameId = this.game.currentGame.id;
    // return this.db.list(`${this.EVENT_REF_PATH}/${gameId}`)
    //   .valueChanges()
    //   .pipe(
    //     map((e: any[]) => e[e.length - 1]),
    //     map((e: any) => Object.assign({gameId: gameId}, e)),
    //   );
  }

}
