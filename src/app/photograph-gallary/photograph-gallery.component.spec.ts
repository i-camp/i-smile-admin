import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographGalleryComponent } from './photograph-gallery.component';

describe('PhotographGalleryComponent', () => {
  let component: PhotographGalleryComponent;
  let fixture: ComponentFixture<PhotographGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
