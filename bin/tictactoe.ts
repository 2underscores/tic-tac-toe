#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FrontendStack } from '../infra/frontend.stack';

const app = new cdk.App();
/* https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION };
console.log(`Deploying to account ${env.account} and region ${env.region}`);
new FrontendStack(app, 'FrontendStack', {
  env: env,
});