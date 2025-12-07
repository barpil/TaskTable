import {Component, inject, OnInit} from '@angular/core';
import {InvitationService} from '../../services/invitation-service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingAnimation} from '../../common-components/loading-animation/loading-animation';

@Component({
  selector: 'invite-page',
  imports: [
    LoadingAnimation
  ],
  templateUrl: './invite-page.html',
  styleUrl: './invite-page.css'
})
export class InvitePage implements OnInit{
  protected loading: boolean = true;
  protected error: boolean = false;
  private readonly invitationService = inject(InvitationService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  ngOnInit(): void{
    this.route.paramMap.subscribe(paramMap => {
      const code = paramMap.get("invitationCode") ?? "";
      this.invitationService.resolveTeamInvitation(code)
        .then(teamId => {
          if(teamId === null) {
            this.loading = false;
            this.error = true;
          } else {
            this.router.navigate(['/teams', teamId]);
          }
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        })
    });
  }

}
