import { Component, OnInit } from '@angular/core';
import { GameManagementService } from '@app/game-management.service';
import { Layout } from '@app/Layout';

@Component({
  selector: 'sml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;
  _currentLayout: Layout;
  constructor(private game: GameManagementService) { }

  ngOnInit() {
   this.setLayout('Full');
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLayout(layout: string) {
    this._currentLayout = Layout[layout];
    this.game.setLayout(this._currentLayout);
  }

  get currentLayout(): string {
    return this._currentLayout as string;
  }

  get layouts(): string[] {
    return Object.keys(Layout);
  }
}
