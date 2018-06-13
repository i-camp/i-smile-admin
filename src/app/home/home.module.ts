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

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent, RankingComponent, PhotographGalleryComponent
  ],
  providers: [
    QuoteService
  ]
})
export class HomeModule { }
