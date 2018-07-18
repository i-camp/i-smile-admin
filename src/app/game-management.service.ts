import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Game, GameConf} from '@app/game';
import {AngularFireDatabase} from 'angularfire2/database';
import {interval} from 'rxjs/internal/observable/interval';
import {Subscription} from 'rxjs/internal/Subscription';
import {Observable} from 'rxjs/internal/Observable';
import {Logger} from '@app/core';
import {Layout} from '@app/Layout';

@Injectable({
  providedIn: 'root'
})
export class GameManagementService {

  private GAMES_REF_PATH = 'currentGame';

  private _currentGame: Game;
  private currentGameTimer: Subscription;
  private currentGameConfig: GameConf;

  private _setSubject = new Subject<{}>();
  private _startedSubject = new Subject<{ startedAt: Date }>();
  private _progressedSubject = new Subject<{ remaining: number }>();
  private _finishedSubject = new Subject<{ finishedAt: Date }>();
  private _updatedLayoutSubject = new Subject<{ layout: Layout}>();

  private logger = new Logger('GameManagementService');

  constructor(private db: AngularFireDatabase) {
    db.object(this.GAMES_REF_PATH).valueChanges().subscribe(e => {
      this.logger.debug(e);
    });
  }

  get currentGame(): Game {
    return this._currentGame;
  }

  get setObservable(): Observable<{}> {
    return this._setSubject.asObservable();
  }

  get startedObservable(): Observable<{ startedAt: Date }> {
    return this._startedSubject.asObservable();
  }

  get progressedObservable(): Observable<{ remaining: number }> {
    return this._progressedSubject.asObservable();
  }

  get finishedObservable(): Observable<{ finishedAt: Date }> {
    return this._finishedSubject.asObservable();
  }

  get updatedLayoutObservable(): Observable<{ layout: Layout }> {
    return this._updatedLayoutSubject.asObservable();
  }

  public createGame(conf: GameConf): PromiseLike<any> {
    const newGame = new Game();
    return this.db.object(this.GAMES_REF_PATH)
      .set(newGame)
      .then(() => {
        this._currentGame = newGame;
        this.currentGameTimer = void 0;
        this.currentGameConfig = conf;
        this._setSubject.next({});
        this._progressedSubject.next({remaining: conf.during});
      });
  }

  public startGame(): PromiseLike<any> {
    const now = new Date();
    return this.db.object(this.GAMES_REF_PATH)
      .update({startedAt: now})
      .then(() => {
        this._currentGame.startedAt = now;
        this._startedSubject.next({startedAt: now});
        this.startTimer();
      });
  }

  public stopGame(): PromiseLike<any> {
    const now = new Date();
    return this.db.object(this.GAMES_REF_PATH)
      .update({finishedAt: now})
      .then(() => {
        this._currentGame.finishedAt = now;
        this._finishedSubject.next({finishedAt: now});
        this.currentGameTimer.unsubscribe();
      });
  }

  private startTimer() {
    let counter = this.currentGameConfig.during;

    this.currentGameTimer = interval(1000).subscribe(() => {
      if (!counter) {
        this._progressedSubject.next({remaining: 0});
        this.stopGame();
        return;
      }
      this._progressedSubject.next({remaining: counter--});
    });
  }

  public setLayout(layout: Layout) {
    this._updatedLayoutSubject.next({layout: layout});
  }
}

