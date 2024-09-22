import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListModelComponent } from './check-list-model.component';

describe('CheckListModelComponent', () => {
  let component: CheckListModelComponent;
  let fixture: ComponentFixture<CheckListModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckListModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckListModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
