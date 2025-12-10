import {Component, Inject, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TaskService} from '../../../services/task-service';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Task} from '../../../services/data/task';
import {UserNameEmail} from '../../../services/data/user';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {forkJoin} from 'rxjs';
import {UserDDSelect} from '../../../common-components/user-ddselect/user-ddselect';


@Component({
  selector: 'edit-task-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    UserDDSelect
  ],
  templateUrl: './edit-task-form.html',
  styleUrl: './edit-task-form.css'
})
export class EditTaskForm implements OnInit{
  task: Task;
  projectId: number;

  usersInProject: UserNameEmail[] = [];
  filteredUsers: UserNameEmail[] = [];

  updateTaskForm: FormGroup;
  errorMessage = '';
  private readonly taskService = inject(TaskService);
  private readonly dialogRef = inject(DialogRef);
  constructor(@Inject(DIALOG_DATA) data: any, private readonly fb: FormBuilder, private readonly http: HttpClient) {
    this.task = data.task;
    this.projectId = data.projectId;
    this.updateTaskForm = this.fb.group({
      name: [this.task.name, Validators.required],
      description: [this.task.description],
      assignedUsers: [[...this.task.assigned_users]]
    });
  }

  ngOnInit(){
    this.http.get<UserNameEmail[]>(environment.apiUrl+'/projects/'+this.projectId+'/users', {withCredentials: true}).subscribe({
      next: (data) => {
        this.usersInProject = data;
        this.filteredUsers = data;
      },
      error: () => {
        console.log("Nie udało się dostać listy userów w projekcie.")
      }
    })
  }


  onSubmit(){
    if(this.updateTaskForm.invalid) return;
    this.errorMessage = '';

    const currentAssignedUsers = this.task.assigned_users.map(u => u.email).sort();
    const newAssignedUsers = this.updateTaskForm.value.assignedUsers.map((u: UserNameEmail) => u.email).sort();

    const userAssignationsWereChanged = JSON.stringify(currentAssignedUsers) !== JSON.stringify(newAssignedUsers);

    const nameOrDescriptionWereChanged = !(this.task.name === this.updateTaskForm.value.name && this.task.description === this.updateTaskForm.value.description)
    const requestTable = []

    if(nameOrDescriptionWereChanged){
      let editTaskRequestBody: UpdateTaskRequest = {task_name: this.updateTaskForm.value.name, description: this.updateTaskForm.value.description};
      let editTaskRequest = this.http.put(environment.apiUrl+'/tasks/'+this.task.id, editTaskRequestBody, {withCredentials: true});
      requestTable.push(editTaskRequest);
    }
    if(userAssignationsWereChanged){
      let assignUsersRequestBody = {email_list: this.updateTaskForm.value.assignedUsers.map((u: UserNameEmail) => u.email)}
      let assignUsersRequest = this.http.post(environment.apiUrl+'/tasks/'+this.task.id+'/assignations', assignUsersRequestBody, {withCredentials: true});
      requestTable.push(assignUsersRequest)
    }

    if(requestTable.length === 0) {
      this.closeModal();
      return;
    }

    forkJoin(requestTable).subscribe({
      next: () => {
        this.taskService.loadTasks(this.projectId);
        this.closeModal();
      },
      error: (error) => {
        this.errorMessage = "Błąd updatowania"
        const errorBody = error.error?.toString() ?? 'empty body';
        console.log(`Błąd: ${errorBody} status: ${error.status}`);
      }
    })
  }

  closeModal(){
    this.dialogRef?.close();
  }

  deleteTask(){
    this.taskService.deleteTask(this.task.id).then(result =>{
      if(result){
        this.taskService.loadTasks(this.projectId);
        this.dialogRef?.close();
      }
      }
    );

  }


}

interface UpdateTaskRequest{
  task_name: string;
  description: string;
}
