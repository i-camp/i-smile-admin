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

  constructor(private game: GameManagementService) {
  }

  ngOnInit() {
    this.remaining = this.game.progressedObservable.pipe(map(event => event.remaining));
  }

}
