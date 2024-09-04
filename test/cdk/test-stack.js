import { AsyncStack, rollupCode } from "../../lib/main.js"

import lambda from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"

export class TestStack extends AsyncStack {
    static appName = "cdk-test"
    async build(env, props) {
        new NodejsFunction(
            this,
            "test-func",
            {
                functionName: "test-func",
                memorySize: 128,
                runtime: lambda.Runtime.NODEJS_20_X,
                handler: "index.handler",
                code: await rollupCode({
                    input: "src/main.js"
                })
            }
        )
    }
}
