import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModelComponent } from './content-model.component';

describe('ContentModelComponent', () => {
  let component: ContentModelComponent;
  let fixture: ComponentFixture<ContentModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
