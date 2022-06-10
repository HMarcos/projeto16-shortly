CREATE TABLE users (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TYPE "statusType" AS ENUM ('active', 'inactive');

CREATE TABLE sessions (
    id serial PRIMARY KEY,
    "userId" integer REFERENCES users("id"),
    token uuid NOT NULL UNIQUE,
    status "statusType" NOT NULL DEFAULT 'active',
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE links (
    id serial PRIMARY KEY,
    "userId" integer REFERENCES users("id"),
    url text NOT NULL,
    "shortUrl" text NOT NULL UNIQUE,
    visits bigint NOT NULL DEFAULT 0,
    "createdAt" timestamp NOT NULL DEFAULT NOW()
);

