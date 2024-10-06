import * as cdk from 'aws-cdk-lib';

type Worker = {
    topic: string;
    entry: string;
    environment?: Record<string, string>
}

export interface MskServerlessCdkTsStackProps extends cdk.StackProps {
    boostrapServer: string;
    registryName: string;
    producers: Worker[];
    consumers: Worker[];
}