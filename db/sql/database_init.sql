\c tasktablemtab
-- Users table
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Teams table
CREATE TABLE teams (
	team_id SERIAL PRIMARY KEY,
	team_name VARCHAR(100) NOT NULL,
	description VARCHAR(500),
    owner_id INTEGER REFERENCES users (id)
);

-- Projects table
CREATE TABLE projects(
	project_id SERIAL PRIMARY KEY,
	project_name VARCHAR(100) NOT NULL,
	description VARCHAR(500),
    owner_id INTEGER REFERENCES users (id),
	project_state VARCHAR(11) NOT NULL CHECK (project_state IN ('DONE', 'IN_PROGRESS')) DEFAULT 'IN_PROGRESS'
);


-- Tasks table
CREATE TABLE tasks(
	task_id BIGSERIAL PRIMARY KEY,
	project_id INTEGER REFERENCES projects (project_id),
	task_name VARCHAR(255) NOT NULL,
	description TEXT,
	task_state VARCHAR(11) NOT NULL CHECK (task_state IN ('TO_DO', 'IN_PROGRESS', 'DONE')) DEFAULT 'IN_PROGRESS'
 );

-- Users in teams joining table
CREATE TABLE team_members(
	user_id INTEGER REFERENCES users (id),
	team_id INTEGER REFERENCES teams (team_id),
	join_date TIMESTAMP NOT NULL DEFAULT NOW(),
	PRIMARY KEY (user_id, team_id)
);

-- Teams taking part in projects joining table
CREATE TABLE project_participant_teams(
	team_id INTEGER REFERENCES teams (team_id),
	project_id INTEGER REFERENCES projects (project_id),
	PRIMARY KEY (team_id, project_id)
);


-- To who are tasks assigned joining table
CREATE TABLE task_assignations(
	task_id BIGINT REFERENCES tasks (task_id),
	user_id INTEGER REFERENCES users (id),
	assigned_date TIMESTAMP NOT NULL DEFAULT NOW(),
	PRIMARY KEY (task_id, user_id)
);

-- Team invitations
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE team_invitations(
                                 id BIGSERIAL PRIMARY KEY,
                                 invitation_code UUID NOT NULL DEFAULT gen_random_uuid(),
                                 team_id SERIAL UNIQUE REFERENCES teams(team_id),
                                 expiration_time TIMESTAMP NOT NULL DEFAULT (NOW()+ INTERVAL '1 day')
);

-- Dodanie indexów dla szybszego wyszukiwania rekordów (bo wtedy )
CREATE INDEX idx_team_invitations_invitation_code ON team_invitations(invitation_code);
CREATE INDEX idx_team_invitations_team_id ON team_invitations(team_id);
CREATE INDEX idx_team_invitations_expiration_time ON team_invitations(expiration_time);



