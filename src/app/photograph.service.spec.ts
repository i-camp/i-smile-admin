import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';

import { PhotographService } from './photograph.service';
import { AngularFireDatabase } from 'angularfire2/database';

describe('PhotographService', () => {

  const dbMock = {
    list: () => ({
      valueChanges: () => {
        return of({});
      }
    })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotographService,
        {provide: AngularFireDatabase, useValue: dbMock}
      ]
    });
  });

  it('should be created', inject([PhotographService], (service: PhotographService) => {
    expect(service).toBeTruthy();
  }));

});
