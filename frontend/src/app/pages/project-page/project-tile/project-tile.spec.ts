import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTile } from './project-tile';

describe('ProjectTile', () => {
  let component: ProjectTile;
  let fixture: ComponentFixture<ProjectTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
