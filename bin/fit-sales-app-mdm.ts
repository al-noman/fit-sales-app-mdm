#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AnamnesisApiAppSyncStack } from '../lib/anamnesis-api-app-sync-stack';

const app = new cdk.App();
new AnamnesisApiAppSyncStack(app, 'FitSalesAppMdmStack');
