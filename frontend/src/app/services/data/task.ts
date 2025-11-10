export interface Tasks{
  tasks: Task[];
}


export interface Task {
  id: number;
  name: string;
  description: string;
  state: "TO_DO" | "IN_PROGRESS" | "DONE";
  assigned_users: AssignedUser[];
}

export interface AssignedUser {
  username: string;
  email: string;
}
