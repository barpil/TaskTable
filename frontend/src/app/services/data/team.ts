export interface GetTeamsResponse{
  teams: UsersTeams[];
}

export interface UsersTeams{
  team: Team;
  join_date: Date;
}

export interface Team {
  team_id: number;
  name: string;
  description: string;
  owner: string;
}
