import {Component, OnInit} from '@angular/core';
import {GameManagementService} from '@app/game-management.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'sml-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public remaining: Observable<number>;
  public isShownRanking = true;

  constructor(private game: GameManagementService) {
  }

  ngOnInit() {
    this.remaining = this.game.progressedObservable.pipe(map(event => event.remaining));
    this.game.rankingDisappearedObservable.subscribe(e => this.isShownRanking = e.isShow);
    this.game.rankingAppearedObservable.subscribe(e => this.isShownRanking = e.isShow);
  }

}
