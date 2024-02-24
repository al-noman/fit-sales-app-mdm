#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FitSalesAppMdmStack } from '../lib/fit-sales-app-mdm-stack';

const app = new cdk.App();
new FitSalesAppMdmStack(app, 'FitSalesAppMdmStack');
