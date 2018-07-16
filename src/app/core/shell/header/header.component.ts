import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;
  constructor() { }

  ngOnInit() { }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

}
