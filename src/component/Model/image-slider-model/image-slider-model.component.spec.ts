import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSliderModelComponent } from './image-slider-model.component';

describe('ImageSliderModelComponent', () => {
  let component: ImageSliderModelComponent;
  let fixture: ComponentFixture<ImageSliderModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSliderModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageSliderModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
