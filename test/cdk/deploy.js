import cdk from "aws-cdk-lib"

import { TestStack } from "./test-stack.js"

const app = new cdk.App()
await TestStack.create(app, "dev", {})
await TestStack.create(app, "prod", {})
