#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MskServerlessCdkTsStack } from '../lib/msk-serverless-cdk-ts-stack';
import {config} from "./config";

const app = new cdk.App();
new MskServerlessCdkTsStack(app, 'msk-serverless-cdk-ts-stack', config);