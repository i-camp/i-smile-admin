import { TestBed, inject } from '@angular/core/testing';

import { GameManagementService } from './game-management.service';
import { AngularFireDatabase } from 'angularfire2/database';

describe('GameManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [
       GameManagementService,
       {provide: AngularFireDatabase, useValue: {}}
      ]
    });
  });

  it('should be created', inject([GameManagementService], (service: GameManagementService) => {
    expect(service).toBeTruthy();
  }));
});
