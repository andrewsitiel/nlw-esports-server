# nlw-esports-server
Back-end of NLW ESports project.
# NLW ESports server

Back-End of an application for connect players for multiplayer games developed with Express, ORM Prisma and SQLite as SGBD.

## Techs

- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io)
- [SQLite](https://www.sqlite.org/index.html)

## Routes

### /games

The games route supports *get* and *post* methods:

- ```get```: */games*
- ```get```: */games/:id/ads*
- ```post```: */games/:id/ads*

### /ads

The ads routes supports *get* method:

- ```get```: */ads/:id/discord*

## How to use

 After install all dependencies (with ```npm install```), just run ```npm run dev``` in terminal for initialize the server. The standart port is 3000 but is changeable in server.js archive.
