# RE:Balance

RE:Balance is a financial budgeting and reconciliation application which users can use to keep track of their balances with other users.

This application is actively being worked on.

## Installing packages

```
npm install
```

## Database Setup

A .env file with the following keys will be required:

-   PG_DB_URI: the URI needed to connect to the local PostgreSQL database
-   SCHEMA: set to "dev" so the server knows to use the schema "dev" in the database

### For development:

To create a PostgreSQL database locally, install PostgreSQL and run the pql commands in sql-notes.md.
If you want to use a client to more easily navigate the database, a client like Postico can be installed to access the database with the Elephant SQL credentials.

### For production:

Follow the directions for development.
To make the database accessible through a cloud server, sign up for an Elephant SQL account (free tier available).
You may alternatively provision a cloud database for cloud deployments.

## Development setup

This allows the benefits of compiling and hot-reloading during development.

```
npm run dev
```

## Production setup

This will compile and minify the build for production.

```
npm run build
```
