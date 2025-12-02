import {User} from './user';

export interface Tasks{
  tasks: Task[];
}

export type TaskStatus = "TO_DO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id: number;
  name: string;
  description: string;

  state: TaskStatus;
  assigned_users: User[];
}



