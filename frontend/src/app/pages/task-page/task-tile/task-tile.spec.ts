import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTile } from './task-tile';

describe('TaskTile', () => {
  let component: TaskTile;
  let fixture: ComponentFixture<TaskTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
