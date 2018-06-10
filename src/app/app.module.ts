import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RankingComponent } from './ranking/ranking.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [AppComponent, RankingComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
