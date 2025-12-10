import {Component, Inject, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {ProjectService} from '../../../services/project-service';

@Component({
  selector: 'create-team-dialog',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-project-dialog.html',
  styleUrl: './create-project-dialog.css'
})
export class CreateProjectDialog {
  private teamId: number = -1;
  createProjectForm: FormGroup;
  projectService: ProjectService = inject(ProjectService);
  private readonly dialogRef = inject(DialogRef);
  constructor(private readonly fb: FormBuilder, @Inject(DIALOG_DATA) data: {teamId: number}){
    this.teamId = data.teamId;
    this.createProjectForm = this.fb.group({
      name: ["", Validators.required],
      description: [],
    })

  }

  async onSubmit(){
    let result = await this.projectService.createProject(this.teamId, this.createProjectForm.get('name')!.value, this.createProjectForm.get('description')!.value)
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


