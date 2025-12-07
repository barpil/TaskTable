import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private readonly http = inject(HttpClient);

  async createTeamInvitation(teamId: number): Promise<string>{
    const request: CreateInvitationRequest = {team_id: teamId};
    try{
      const response = await firstValueFrom(this.http.post<CreateInvitationResponse>(environment.apiUrl+'/invite', request, {withCredentials: true, observe: "response"}));
      return response.body?.invitation_code ?? "";
    }catch(error){
      return "";
    }
  }

  async resolveTeamInvitation(invitationCode: string): Promise<number | null>{
    try{
      const response = await firstValueFrom(this.http.get<number>(environment.apiUrl+'/invite/'+invitationCode, {withCredentials: true, observe: "response"}));
      return response.body;
    }catch(error){
      return null;
    }
  }
}

interface CreateInvitationRequest{
  team_id: number;
}

interface CreateInvitationResponse{
  invitation_code: string;
}


