import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {SnapEvent} from '@app/game';
import {Observable} from 'rxjs/internal/Observable';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotographService {

  private EVENT_REF_PATH = 'snapEvents';

  constructor(private db: AngularFireDatabase) {}

  public getCurrentGameSnappedObservable(): Observable<SnapEvent> {
    return this.db.list(this.EVENT_REF_PATH)
      .valueChanges()
      .pipe(
        filter((e: any[]) => !!e.length),
        map((e: any[]) => e[e.length - 1])
      );
  }
}
