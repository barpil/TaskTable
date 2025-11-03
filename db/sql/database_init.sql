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
	description VARCHAR(500)
);

-- Projects table
CREATE TABLE projects(
	project_id SERIAL PRIMARY KEY,
	project_name VARCHAR(100) NOT NULL,
	description VARCHAR(500),
	project_state VARCHAR(11) NOT NULL CHECK (project_state IN ('DONE', 'IN PROGRESS')) DEFAULT 'IN PROGRESS'
);


-- Tasks table
CREATE TABLE tasks(
	task_id BIGSERIAL PRIMARY KEY,
	project_id INTEGER REFERENCES projects (project_id),
	task_name VARCHAR(255) NOT NULL,
	description TEXT,
	task_state VARCHAR(11) NOT NULL CHECK (task_state IN ('TO DO', 'IN PROGRESS', 'DONE')) DEFAULT 'IN PROGRESS'
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
)



