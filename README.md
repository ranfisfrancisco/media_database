# Media Entry Database

Website for data entry on media a user has seen or experienced.

# Deployment

Currently hosted at https://my-media-database.herokuapp.com/

## Description

Files include front-end client and back-end server connected to an SQL database.

## Getting Started

### Dependencies

npm (node package manager)

### Installing

Run npm install in the root directory.
```
npm install
```

### Setup

The SQL code inside the database_setup folder can be run inside an SQL database to create the schema and tables necessary.

Environment variables must be set to connect to the database as well as other things.

### Executing program locally

1. Run npm run build from inside the client directory.
```
cd client && npm run build
```

2. Run npm run start from inside the server directory.
```
cd ../server && npm run start
```

3. Access site from web browser
localhost:8080

## Acknowledgments

Project built off of framework of another project; see commit history.