# Async CDK
A small library that contains an AsyncStack to use with the AWS CDK, but allow
for a stack to use async calls to be constructed. Inspired by wanting to use
esbuild/rollup plugins to compile code, but you can't with the sync interfaces.

## Installation
```bash
pnpm add @axel669/async-cdk
```

## Usage

### AsyncStack
The AsyncStack was kept very minimal so that switching to an async cdk would be
simple and quick. Stacks can inherit from AsyncStack instead of the standard
cdk stack (AsyncStack inherits from that already), and only need to write a
build function that does the same work you would normally do in the constructor.
This combined with the static create method that takes the same signature as
the normal constructor is all that's needed.

_A static appName can be delcared in a custom stack, and the create function
will treat it as a prefix to use across all instantiated stacks, allowing for
the second argument to create to act like an environment name instead._

> custom-stack.js
```js
import { AsyncStack } from "@axel669/async-cdk"

export class CustomStack extends AsyncStack {
    static appName = "cdk-app"
    // The second and third arguments from create are passed to the build function
    async build(env, props) {
        // init cdk stack, use some async functions
    }
}
```

> deploy.js
```js
import cdk from "aws-cdk-lib"

import { TestStack } from "./test-stack.js"

const app = new cdk.App()

// This will create 2 stacks with the stack IDs "cdk-app-dev" and "cdk-app-prod"
await TestStack.create(app, "dev", {})
await TestStack.create(app, "prod", {})
```
