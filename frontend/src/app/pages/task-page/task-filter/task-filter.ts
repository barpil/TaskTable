import {Component, Inject, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserNameEmail} from '../../../services/data/user';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task, TaskStatus} from '../../../services/data/task';


@Component({
  selector: 'task-filter',
    imports: [
        MatFormField,
        MatLabel,
        MatOption,
        MatSelect,
        ReactiveFormsModule
    ],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css'
})
export class TaskFilter implements OnInit{
  filterTaskForm: FormGroup;

  tasks: Task[] = []
  usersInProject: UserNameEmail[] = []
  filteredUsersOptions: UserNameEmail[] = []

  states: TaskStatus[] = ["TO_DO", "IN_PROGRESS", "DONE"]
  selectedStates: TaskStatus[] = [];
  selectedUsers: UserNameEmail[] = []

  constructor(
    public dialogRef: MatDialogRef<TaskFilter>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFilterInputData,
    private readonly fb: FormBuilder
  ) {
    this.tasks = data.tasks
    this.selectedStates = data.selectedStates;
    this.selectedUsers = data.selectedUsers;

    this.filterTaskForm = this.fb.group({
      states: [this.selectedStates],
      assignedUsers: [this.selectedUsers]
    })
  }


  ngOnInit(): void {
    const allUsersMap = new Map<string, UserNameEmail>();

    this.tasks.flatMap(task => task.assigned_users).forEach(user => {
      if (!allUsersMap.has(user.email)) {
        const une: UserNameEmail = {
          username: user.username,
          email: user.email
        };
        allUsersMap.set(user.email, une);
      }
    });

    this.usersInProject = Array.from(allUsersMap.values());
    this.filteredUsersOptions = [...this.usersInProject];
  }


  filterUsers(value: string): void {
    const filterValue = value.toLowerCase().trim();
    const matchingUsers = this.usersInProject.filter(user =>
      user.username.toLowerCase().includes(filterValue) || user.email.toLowerCase().includes(filterValue)
    );
    const currentlySelectedUsers: UserNameEmail[] = this.filterTaskForm.get('assignedUsers')?.value || [];

    const combinedMap = new Map<string, UserNameEmail>();
    matchingUsers.forEach(user => combinedMap.set(user.email, user));

    currentlySelectedUsers.forEach(user => {
      if (user.email && !combinedMap.has(user.email)) {
        combinedMap.set(user.email, user);
      }
    });

    this.filteredUsersOptions = Array.from(combinedMap.values());
  }

  onSubmit() {
    const resultData: TaskFilterResultData = {
      selectedUsers: this.filterTaskForm.get('assignedUsers')?.value || [],
      selectedStates: this.filterTaskForm.get('states')?.value || []
    };
    this.dialogRef.close(resultData)
  }

  closeModal() {
    this.dialogRef?.close(null);
  }

  compareUsers(user1: UserNameEmail, user2: UserNameEmail): boolean {
    return user1 && user2 ? user1.email === user2.email : user1 === user2;
  }
}

export interface TaskFilterInputData{
  tasks: Task[];
  selectedUsers: UserNameEmail[];
  selectedStates: TaskStatus[];
}

export interface TaskFilterResultData{
  selectedUsers: UserNameEmail[];
  selectedStates: TaskStatus[];
}
