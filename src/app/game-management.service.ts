import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Game, GameConf, GameEvent} from '@app/game';
import {AngularFireDatabase} from 'angularfire2/database';
import {interval} from 'rxjs/internal/observable/interval';
import {Subscription} from 'rxjs/internal/Subscription';
import {database} from 'firebase'; import {UUID} from 'angular2-uuid';
import {Observable} from 'rxjs/internal/Observable';
import {Logger} from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class GameManagementService {

  private GAMES_REF_PATH = 'games';
  private CURRENT_GAMES_REF_PATH = 'currentGames';

  private _currentGame: Game;
  private currentGameKey: string;
  private currentGameTimer: Subscription;
  private currentGameConfig: GameConf;

  private _setSubject = new Subject<GameEvent>();
  private _startedSubject = new Subject<GameEvent>();
  private _progressedSubject = new Subject<GameEvent>();
  private _finishedSubject = new Subject<GameEvent>();

  private logger = new Logger('GameManagementService');

  constructor(private db: AngularFireDatabase) {
    db.list(this.GAMES_REF_PATH).valueChanges().subscribe(e => {
      this.logger.debug(e);
    });
    db.object(this.CURRENT_GAMES_REF_PATH).valueChanges().subscribe(e => {
      this.logger.debug(e);
    });
  }

  get currentGame(): Game {
    return this._currentGame;
  }

  get setObservable(): Observable<GameEvent> {
    return this._setSubject.asObservable();
  }

  get startedObservable(): Observable<GameEvent> {
    return this._startedSubject.asObservable();
  }

  get progressedObservable(): Observable<GameEvent> {
    return this._progressedSubject.asObservable();
  }

  get finishedObservable(): Observable<GameEvent> {
    return this._finishedSubject.asObservable();
  }


  public createGame(conf: GameConf): PromiseLike<any> {
    const newGame = new Game();
    newGame.id = UUID.UUID();

    const gamesRef = this.db.list(this.GAMES_REF_PATH);
    return gamesRef.push(newGame)
      .then((ref: database.ThenableReference) => {
        this.currentGameKey = `${this.GAMES_REF_PATH}/${ref.key}`;
        return this.db.object(this.CURRENT_GAMES_REF_PATH).set(newGame.id);
      })
      .then(() => {
        this._currentGame = newGame;
        this.currentGameTimer = void 0;
        this.currentGameConfig = conf;
        this._setSubject.next({gameId: this._currentGame.id});
      });
  }

  public startGame(): PromiseLike<any> {
    const now = new Date();
    return this.db.object(this.currentGameKey)
      .update({startedAt: now})
      .then(() => {
        this._currentGame.startedAt = now;
        this._startedSubject.next({gameId: this._currentGame.id, startedAt: now});
        this.startTimer();
      });
  }

  public stopGame(): PromiseLike<any> {
    const now = new Date();
    return this.db.object(this.currentGameKey)
      .update({finishedAt: now})
      .then(() => {
        this._currentGame.finishedAt = now;
        this._finishedSubject.next({gameId: this._currentGame.id, finishedAt: now});
        this.currentGameTimer.unsubscribe();
      });
  }

  private startTimer() {
    let counter = this.currentGameConfig.during;

    this.currentGameTimer = interval(1000).subscribe(() => {
      if (!counter) {
        this._progressedSubject.next({gameId: this._currentGame.id, remaining: 0});
        this.stopGame();
        return;
      }
      this._progressedSubject.next({gameId: this._currentGame.id, remaining: counter--});
    });
  }

}

