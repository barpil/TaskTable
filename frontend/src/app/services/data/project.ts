export interface Project {
  id: number;
  name: string;
  description: string;
  state: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
  owner: ProjectOwner;
}

export interface ProjectOwner {
  id: number;
  name: string;
  email: string;
}
