import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class RankingService implements OnInit {

  private updatedSubject = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.execRanking();
  }

  private execRanking() {
    setInterval(() => {
      this.updatedSubject.next({test: 'hyoooooo'});
    }, 1000);
  }

}
