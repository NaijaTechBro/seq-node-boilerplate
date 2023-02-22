# RESTful API Node Server with Sequelize Boilerplate

A boilerplate/starter project using sequelize as the ORM

## Quick Start
First install all dependencies

```bash 
npm i
```

Add .env to the root of the project with these default params

```bash
SERVER_PORT=9001
NODE_ENV=development

#DB INFO
DB_HOST=localhost
DB_PORT=49153
DB_USER=postgres
DB_PASSWORD=postgrespw

SOME_EXTERNAL_API_CLIENT_ID=jiansali39020239jsdn
SOME_EXTERNAL_API_CLIENT_SECRET=dkai49242n5nasdlsadf904290545jklasn
```

Then run using 

```bash
npm run dev
```

#### Running In Production

PM2 package is highly recommended and a command in this package.json

```bash
npm start
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment variables](#Environment variables)


## Features

- **Input Validation**: Using express-validation. Joi is at the heart of it.
- **Sequelize ORM**: Using sequlize ORM for database connectivity
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Error handling**: centralized error handling mechanism
- **Testing**: unit and integration tests using [Jest](https://jestjs.io) and [Supertest](https://github.com/ladjs/supertest)
- **TBD**: Ongoing planning

## Commands

Running locally:

```bash
npm run dev
```

Running in production:
```bash
npm start
```

## Environment variables

Environmental vars are declared in the .env file.

Make them available in /src/config/config.js

Do not use proccess.env to call environmental variables!

```javascript
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    SERVER_PORT: Joi.number().default(9001),
    SOME_EXTERNAL_API_CLIENT_ID: Joi.string(),
    SOME_EXTERNAL_API_CLIENT_SECRET: Joi.string(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  serverPort: envVars.SERVER_PORT,
  someExternalApi: {
    someExternalApiClientId: envVars.SOME_EXTERNAL_API_CLIENT_ID,
    someExternalApiSecret: envVars.SOME_EXTERNAL_API_CLIENT_SECRET,
  },
};
```