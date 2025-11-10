import {Component, Inject, inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {TaskService} from '../../../services/task-service';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'add-task-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-task-form.html',
  styleUrl: './add-task-form.css'
})
export class AddTaskForm {
  projectId: number;
  addTaskForm: FormGroup;
  errorMessage = '';
  private readonly taskService = inject(TaskService);
  private readonly dialogRef = inject(DialogRef, {optional: true});
  constructor(@Inject(DIALOG_DATA) data: any, private readonly fb: FormBuilder, private readonly http: HttpClient) {
    this.projectId = data.projectId;
    this.addTaskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(){
    if(this.addTaskForm.invalid) return;
    this.errorMessage = '';
    let request: AddTaskRequest = {task_name: this.addTaskForm.value.name, description: this.addTaskForm.value.description}
    this.http.post(environment.apiUrl+'/tasks/'+this.projectId, request, {withCredentials: true}).subscribe({
      next: () => {
        this.taskService.loadTasks(this.projectId);
        this.closeModal();
      },
      error: (error) => {
        this.errorMessage = "Błąd dodawania"
        console.log((error.body?.toString() ?? 'empty body')+' status: '+error.status)
      }
    })
  }

  closeModal(){
    this.dialogRef?.close();
  }
}

interface AddTaskRequest{
  task_name: string,
  description: string
}
