import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSortDialog } from './team-sort-dialog';

describe('TeamSortDialog', () => {
  let component: TeamSortDialog;
  let fixture: ComponentFixture<TeamSortDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamSortDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamSortDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
