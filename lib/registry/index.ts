import * as glue from 'aws-cdk-lib/aws-glue';
import {Construct} from "constructs";

export class MskRegistry extends glue.CfnRegistry {
    constructor(scope: Construct, id: string) {
        super(scope, id, {
            name: id,
            description: "MSK Serverless Schema Registry",
        });
    }
}