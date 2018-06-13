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

  private logger = new Logger('RankingComponent');

  constructor(private ranking: RankingService) {
  }

  ngOnInit() {
    // TODO should unsubscribe when stop game + n second
    const rankingObservable = this.ranking.updatedObservable.pipe(share());
    this.photographers = rankingObservable.pipe(
      map((rank: RankingEvent) => rank.photographer)
    );
    this.subjects = rankingObservable.pipe(
      map((rank: RankingEvent) => rank.subject)
    );
    rankingObservable.subscribe((e) => {
      this.logger.debug(e);
    });
  }

}
