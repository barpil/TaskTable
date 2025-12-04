import {Component, inject, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserDDSelect} from '../../../common-components/user-ddselect/user-ddselect';
import {UserNameEmail} from '../../../services/data/user';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {Team} from '../../../services/data/team';
import {TeamService} from '../../../services/team-service';

@Component({
  selector: 'app-create-team-dialog',
  imports: [
    ReactiveFormsModule,
    UserDDSelect
  ],
  templateUrl: './create-team-dialog.html',
  styleUrl: './create-team-dialog.css'
})
export class CreateTeamDialog {
  createTeamForm: FormGroup;
  teamService: TeamService = inject(TeamService);
  private readonly dialogRef = inject(DialogRef);
  constructor(private readonly fb: FormBuilder){

    this.createTeamForm = this.fb.group({
      name: ["", Validators.required],
      description: [],
    })

  }

  async onSubmit(){
    let result = await this.teamService.createTeam(this.createTeamForm.get('name')!.value, this.createTeamForm.get('description')!.value)
    if(result){
      this.closeModal();
    }else{
      alert("Failed to create specified team.")
    }
  }

  closeModal(){
    this.dialogRef.close();
  }
}


