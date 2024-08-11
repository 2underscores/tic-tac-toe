#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FrontendStack } from '../infra/frontend.stack';

const app = new cdk.App();
/* https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION };
//Hardcode as cert for cf distribution must be in us-east-1. Should make it two stacks, but whatever
// const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-1' };
console.log(`Deploying to account ${env.account} and region ${env.region}`);
console.log(process.env);
new FrontendStack(app, 'FrontendStack', {
  env: env,
});