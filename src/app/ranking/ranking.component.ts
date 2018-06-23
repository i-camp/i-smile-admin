import { Component, OnInit } from '@angular/core';
import {RankingEvent} from '@app/game';
import {Logger} from '@app/core';
import {Observable} from 'rxjs/internal/Observable';
import {RankingService} from '@app/ranking.service';
import {map, share} from 'rxjs/operators';

@Component({
  selector: 'sml-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  public photographers: Observable<any[]>;
  public subjects: Observable<any[]>;

  private MAX_DISPLAYED_USERS_COUNT = 3;

  private logger = new Logger('RankingComponent');

  constructor(private ranking: RankingService) {
  }

  ngOnInit() {
    // TODO should unsubscribe when stop game + n second
    const rankingObservable = this.ranking.updatedObservable.pipe(share());
    this.photographers = rankingObservable.pipe(
      map((rank: RankingEvent) => rank.photographer.slice(0,this.MAX_DISPLAYED_USERS_COUNT))
    );
    this.subjects = rankingObservable.pipe(
      map((rank: RankingEvent) => rank.subject.slice(0,this.MAX_DISPLAYED_USERS_COUNT))
    );
    rankingObservable.subscribe((e) => {
      this.logger.debug(e);
    });
  }

}
