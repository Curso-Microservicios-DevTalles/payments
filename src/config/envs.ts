import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  STRIPE_SECRET: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
  STRIPE_ENDPOINT_SECRET: string;
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().uri().required(),
    STRIPE_CANCEL_URL: joi.string().uri().required(),
    STRIPE_ENDPOINT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  PORT: process.env.PORT,
  STRIPE_SECRET: process.env.STRIPE_SECRET,
  STRIPE_SUCCESS_URL: process.env.STRIPE_SUCCESS_URL,
  STRIPE_CANCEL_URL: process.env.STRIPE_CANCEL_URL,
  STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  stripeSecret: envVars.STRIPE_SECRET,
  stripeSuccessUrl: envVars.STRIPE_SUCCESS_URL,
  stripeCancelUrl: envVars.STRIPE_CANCEL_URL,
  stripeEndpointSecret: envVars.STRIPE_ENDPOINT_SECRET,
};
