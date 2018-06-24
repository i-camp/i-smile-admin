import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPhotoComponent } from './featured-photo.component';

describe('FeaturedPhotoComponent', () => {
  let component: FeaturedPhotoComponent;
  let fixture: ComponentFixture<FeaturedPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
