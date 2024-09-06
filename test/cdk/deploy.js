import cdk from "aws-cdk-lib"

import { TestStack } from "./test-stack.js"

const app = new cdk.App()
// await initStack(TestStack, app, "nonprod", {})
await TestStack.create(app, "nonprod", {})
