---- Base app schema

-- User
CREATE TYPE user_typ AS ENUM ('Sys', 'User');
-- noinspection SqlResolve @ routine/"gen_random_uuid"
CREATE TABLE "user" (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY (START WITH 1000) PRIMARY KEY,

  username varchar(128) NOT NULL UNIQUE,
  typ user_typ NOT NULL DEFAULT 'User',

  -- Auth
  pwd varchar(256),
  pwd_salt uuid NOT NULL DEFAULT gen_random_uuid(),
  token_salt uuid NOT NULL DEFAULT gen_random_uuid(),

  -- Timestamps
  cid bigint NOT NULL,
  ctime timestamp with time zone NOT NULL,
  mid bigint NOT NULL,
  mtime timestamp with time zone NOT NULL  
);

-- Group
CREATE TABLE usergroup (
  -- PK
  id BIGINT GENERATED BY DEFAULT AS IDENTITY (START WITH 1000) PRIMARY KEY,

  -- Properties
  owner_id BIGINT NOT NULL,
  name varchar(256) NOT NULL,

  -- Timestamps
  cid bigint NOT NULL,
  ctime timestamp with time zone NOT NULL,
  mid bigint NOT NULL,
  mtime timestamp with time zone NOT NULL  
);

-- GroupMember
CREATE TABLE groupmember (
  -- PK
  id BIGINT GENERATED BY DEFAULT AS IDENTITY (START WITH 1000) PRIMARY KEY,

  -- Properties
  usergroup_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  user_role INT NOT NULL,

  -- Timestamps
  cid bigint NOT NULL,
  ctime timestamp with time zone NOT NULL,
  mid bigint NOT NULL,
  mtime timestamp with time zone NOT NULL  
);

-- Project
CREATE TABLE project (
  -- PK
  id BIGINT GENERATED BY DEFAULT AS IDENTITY (START WITH 1000) PRIMARY KEY,

  -- Properties
  owner_id BIGINT NOT NULL,
  group_id BIGINT NOT NULL,
  name varchar(256) NOT NULL,

  -- Timestamps
  cid bigint NOT NULL,
  ctime timestamp with time zone NOT NULL,
  mid bigint NOT NULL,
  mtime timestamp with time zone NOT NULL  
);

-- Task
CREATE TABLE task (
  -- PK
  id BIGINT GENERATED BY DEFAULT AS IDENTITY (START WITH 1000) PRIMARY KEY,

  -- FK
  project_id BIGINT NOT NULL,
  -- FK can be null
  task_id BIGINT NULL,
  
  -- Properties
  title varchar(256) NOT NULL,
  done bool NOT NULL DEFAULT false,

  -- Timestamps
  cid bigint NOT NULL,
  ctime timestamp with time zone NOT NULL,
  mid bigint NOT NULL,
  mtime timestamp with time zone NOT NULL  
);

-- TaskRecord
CREATE TABLE taskprogress (
  -- PK
  id BIGINT GENERATED BY DEFAULT AS IDENTITY (START WITH 1000) PRIMARY KEY,

  -- FK
  task_id BIGINT NOT NULL,

  -- Properties
  progress INT NOT NULL,

  -- Timestamps
  cid BIGINT NOT NULL,
  ctime TIMESTAMP with time zone NOT NULL,
  mid BIGINT NOT NULL,
  mtime TIMESTAMP with time zone NOT NULL
);

-- TaskProgress
CREATE TABLE timerecord (
  -- PK
  id BIGINT GENERATED BY DEFAULT AS IDENTITY (START WITH 1000) PRIMARY KEY,

  -- FK 
  -- Might add Later
  -- project_id BIGINT NULL,
  --task_id BIGINT NULL,

  -- Properties
  place varchar(256) NOT NULL,
  start_time TIMESTAMP with time zone NOT NULL,
  stop_time TIMESTAMP with time zone NOT NULL,

  -- Timestamps
  cid BIGINT NOT NULL,
  ctime TIMESTAMP with time zone NOT NULL,
  mid BIGINT NOT NULL,
  mtime TIMESTAMP with time zone NOT NULL
);

-- TaskProgress
CREATE TABLE tasktime (
  -- PK
  id BIGINT GENERATED BY DEFAULT AS IDENTITY (START WITH 1000) PRIMARY KEY,

  -- FK
  task_id BIGINT NOT NULL,

  -- Properties
  comment varchar(512) NOT NULL,
  start_time TIMESTAMP with time zone NOT NULL,
  stop_time TIMESTAMP with time zone NOT NULL,

  -- Timestamps
  cid BIGINT NOT NULL,
  ctime TIMESTAMP with time zone NOT NULL,
  mid BIGINT NOT NULL,
  mtime TIMESTAMP with time zone NOT NULL
);

ALTER TABLE groupmember ADD CONSTRAINT fk_usergroup
  FOREIGN KEY (usergroup_id) REFERENCES usergroup(id)
  ON DELETE CASCADE;

ALTER TABLE task ADD CONSTRAINT fk_project
  FOREIGN KEY (project_id) REFERENCES project(id)
  ON DELETE CASCADE;

ALTER TABLE taskprogress ADD CONSTRAINT fk_task
    FOREIGN KEY (task_id) REFERENCES task(id)
        ON DELETE CASCADE;

ALTER TABLE tasktime ADD CONSTRAINT fk_task
    FOREIGN KEY (task_id) REFERENCES task(id)
        ON DELETE CASCADE;
