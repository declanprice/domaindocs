#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { DomainDocsStack } from '../lib/domaindocs.stack'

const app = new cdk.App()

new DomainDocsStack(app, 'DomainDocsStack', {})
