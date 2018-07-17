import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameManagementService} from 'app/game-management.service';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'sml-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.scss']
})
export class GameControllerComponent implements OnInit, OnDestroy {

  public isStarted: boolean;
  public isFinished: boolean;

  private subscriptions: Subscription[] = [];

  constructor(private game: GameManagementService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.game.setObservable.subscribe(e => {
      this.isStarted = false;
      this.isFinished = false;
    }));
    this.subscriptions.push(this.game.startedObservable.subscribe(e => {
      this.isStarted = true;
    }));
    this.subscriptions.push(this.game.finishedObservable.subscribe(e => {
      this.isFinished = true;
    }));

    // TODO should disable link until created Game
    this.game.createGame({during: 30});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public startGame() {
    // TODO should disable start button
    this.game.startGame();
  }

  public stopGame() {
    // TODO should disable stop button
    this.game.stopGame();
  }
}
