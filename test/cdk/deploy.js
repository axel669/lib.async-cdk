import cdk from "aws-cdk-lib"

import { TestStack } from "./test-stack.js"

import { initStack } from "../../lib/main.js"

const app = new cdk.App()
await initStack(TestStack, app, "nonprod", {})
