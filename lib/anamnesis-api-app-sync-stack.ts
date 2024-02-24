import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import {FieldLogLevel} from 'aws-cdk-lib/aws-appsync';
import * as path from "node:path";

export class AnamnesisApiAppSyncStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, 'api', {
      name: 'Anamnesis',
      definition: appsync.Definition.fromFile(path.resolve('./schemas/anamnesis.graphql')),
      logConfig: {
        fieldLogLevel: FieldLogLevel.ERROR
      }
    });

    const httpDs = api.addHttpDataSource(
      'MdmRestApiDs',
      'https://pbg0gav767.execute-api.eu-central-1.amazonaws.com',
      {
        name: 'MdmRestApiEndpoint',
        description: 'from appsync to MDM rest api endpoint',
      },
    );

    httpDs.createResolver('QueryGetAnamnesisResolver', {
      typeName: 'Query',
      fieldName: 'getAnamnesis',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(path.resolve('./request-templates/anamnesis.vtl')),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(path.resolve('./response-templates/anamnesis.vtl')),
    });
  }
}
