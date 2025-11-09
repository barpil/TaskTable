import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTile } from './team-tile';

describe('TeamTile', () => {
  let component: TeamTile;
  let fixture: ComponentFixture<TeamTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamTile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
