const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    SERVER_PORT: Joi.number().required(),
    DB: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
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
  db: {
    db: envVars.DB,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
  },
  someExternalApi: {
    someExternalApiClientId: envVars.SOME_EXTERNAL_API_CLIENT_ID,
    someExternalApiSecret: envVars.SOME_EXTERNAL_API_CLIENT_SECRET,
  },
};
