import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSortDialog } from './project-sort-dialog';

describe('ProjectSortDialog', () => {
  let component: ProjectSortDialog;
  let fixture: ComponentFixture<ProjectSortDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSortDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSortDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
