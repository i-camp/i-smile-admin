import { Component, OnInit } from '@angular/core';
import { PhotographService } from '@app/photograph.service';
import { SnapEvent } from '@app/game';
import { GameManagementService } from '@app/game-management.service';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'sml-photograph-gallery',
  templateUrl: './photograph-gallery.component.html',
  styleUrls: ['./photograph-gallery.component.scss']
})
export class PhotographGalleryComponent implements OnInit {

  public photoUrls: string[] = [];

  private nextPaneNumber = 0;
  private MAX_PHOTO_COUNT = 20;

  constructor(private game: GameManagementService, private photo: PhotographService) { }

  ngOnInit() {
    // init pane
    for (let i = 0; i < this.MAX_PHOTO_COUNT; i++) {
      this.photoUrls[i] = 'https://placehold.jp/3d4070/8082ad/640x640.png?text=ya-smile';
    }

    // push photos to pane
    this.game.startedObservable.pipe(
      flatMap(() => this.photo.getCurrentGameSnappedObservable())
    ).subscribe((e: SnapEvent) => this.pushImageToPane(e));
  }

  private pushImageToPane(e: SnapEvent) {
    this.photoUrls[this.nextPaneNumber % this.MAX_PHOTO_COUNT] = e.photoUrl;
    this.nextPaneNumber++;
  }
}
