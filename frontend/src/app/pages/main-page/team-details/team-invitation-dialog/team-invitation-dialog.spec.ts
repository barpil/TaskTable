import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInvitationDialog } from './team-invitation-dialog';

describe('TeamInvitationDialog', () => {
  let component: TeamInvitationDialog;
  let fixture: ComponentFixture<TeamInvitationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamInvitationDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamInvitationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
