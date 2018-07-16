import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { RankingComponent } from '@app/ranking/ranking.component';
import { PhotographGalleryComponent } from '@app/photograph-gallary/photograph-gallery.component';
import { FeaturedPhotoComponent } from '@app/featured-photo/featured-photo.component';
import { ScoreBoardComponent } from '@app/home/score-board.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    RankingComponent,
    PhotographGalleryComponent,
    FeaturedPhotoComponent,
    ScoreBoardComponent
  ],
  providers: [
    QuoteService
  ]
})
export class HomeModule { }
