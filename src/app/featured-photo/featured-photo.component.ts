import { Component, OnInit } from '@angular/core';
import { SnapEvent } from "@app/game";
import { PhotographService } from "@app/photograph.service";
import { GameManagementService } from "@app/game-management.service";
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'sml-featured-photo',
  templateUrl: './featured-photo.component.html',
  styleUrls: ['./featured-photo.component.scss']
})
export class FeaturedPhotoComponent implements OnInit {
  public photoUrl: string;

  constructor(private game: GameManagementService, private photo: PhotographService) { }

  ngOnInit() {
    this.game.startedObservable.pipe(
      flatMap(() => this.photo.getCurrentGameSnappedObservable())
    ).subscribe((e: SnapEvent) => this.photoUrl = e.photoUrl);
  }

}
