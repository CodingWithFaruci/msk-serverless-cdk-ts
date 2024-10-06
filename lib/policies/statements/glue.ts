import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export class GlueStatement extends iam.PolicyStatement {
    constructor(registryName:string) {
        super({
            actions: [
                "glue:GetSchema",
                "glue:GetSchemaVersion",
                "glue:GetSchemaVersionsDiff",
                "glue:ListSchemas",
                "glue:ListSchemaVersions",
            ],
            resources: [
                `arn:aws:glue:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:schema/${registryName}/*`,
                `arn:aws:glue:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:registry/${registryName}`
            ],
        });
    }
}

export class GlueAdminStatement extends iam.PolicyStatement {
    constructor(registryName:string) {
        super({
            actions: [
                "glue:*Schema*",
                "glue:GetTags",
                "glue:TagResource",
                "glue:UntagResource"
            ],
            resources: [
                `arn:aws:glue:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:schema/${registryName}/*`,
                `arn:aws:glue:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:registry/${registryName}`
            ],
        });
    }
}