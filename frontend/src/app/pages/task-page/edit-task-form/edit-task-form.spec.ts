import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskForm } from './edit-task-form';

describe('EditTaskForm', () => {
  let component: EditTaskForm;
  let fixture: ComponentFixture<EditTaskForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaskForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
