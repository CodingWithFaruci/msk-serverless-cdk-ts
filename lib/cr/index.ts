import * as cr from 'aws-cdk-lib/custom-resources';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import {Construct} from "constructs";

export class Trigger extends cr.AwsCustomResource {
    constructor(scope: Construct, id: string, lambda: nodejs.NodejsFunction) {
        super(scope, id, {
            functionName: id,
            role: lambda.role,
            onUpdate: {
                service: 'Lambda',
                action: 'invoke',
                parameters: {
                    FunctionName: lambda.functionName,
                    Qualifier: lambda.currentVersion.version,
                },
                physicalResourceId: cr.PhysicalResourceId.of(`${id}-${lambda.currentVersion.version}`),
            },
            logRetention: 1
        });
        this.node.addDependency(lambda.currentVersion);
    }
}