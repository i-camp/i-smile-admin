import {Component, OnInit} from '@angular/core';
import {RankingEvent} from '@app/game';
import {Logger} from '@app/core';
import {Observable} from 'rxjs/internal/Observable';
import {RankingService} from 'app/ranking.service';
import {map, share} from 'rxjs/operators';
import {HasLayout, Layout} from '@app/Layout';
import {GameManagementService} from '@app/game-management.service';

@Component({
  selector: 'sml-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit, HasLayout {

  public photographers: Observable<any[]>;
  public subjects: Observable<any[]>;

  public rankingVisibility: 'hidden' | 'visible';
  public featuredPhotoVisibility: 'block' | 'none';
  public isLargeRanking: boolean;
  public showWinner: boolean;

  private MAX_DISPLAYED_USERS_COUNT = 20;

  private logger = new Logger('RankingComponent');

  constructor(private ranking: RankingService, private game: GameManagementService) {
  }

  ngOnInit() {
    // when updated layout
    this.game.updatedLayoutObservable.subscribe((e) => {
      switch (e.layout) {
        case Layout.PhotoOnly:
          this.onPhotoOnlyLayout();
          break;
        case Layout.Result:
          this.onResultLayout();
          break;
        case Layout.Full:
          this.onFullLayout();
          break;
        default:
      }
    });

    // when updated ranking
    // TODO should unsubscribe when stop game + n second
    const rankingObservable = this.ranking.updatedObservable.pipe(share());
    this.photographers = rankingObservable.pipe(
      map((rank: RankingEvent) => rank.photographer.slice(0, this.MAX_DISPLAYED_USERS_COUNT))
    );
    this.subjects = rankingObservable.pipe(
      map((rank: RankingEvent) => rank.subject.slice(0, this.MAX_DISPLAYED_USERS_COUNT))
    );
    rankingObservable.subscribe((e) => {
      this.logger.debug(e);
    });
  }

  public onFullLayout(): void {
    this.rankingVisibility = 'visible';
    this.featuredPhotoVisibility = 'block';
    this.isLargeRanking = false;
    this.showWinner = false;
  }

  public onPhotoOnlyLayout(): void {
    this.rankingVisibility = 'hidden';
    this.featuredPhotoVisibility = 'block';
    this.isLargeRanking = false;
    this.showWinner = false;
  }

  public onResultLayout(): void {
    this.rankingVisibility = 'visible';
    this.featuredPhotoVisibility = 'none';
    this.isLargeRanking = true;
    this.showWinner = true;
  }

}
