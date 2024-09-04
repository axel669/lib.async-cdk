import { rollup } from "rollup"
import { Stack } from "aws-cdk-lib"
import lambda from "aws-cdk-lib/aws-lambda"
import fs from "node:fs/promises"
import path from "node:path"
import os from "node:os"

/** @import { RollupFileOptions } from "rollup" */
/** @import { Constrct } from "constructs" */
/** @import { StackProps } from "aws-cdk-lib" */

/**
@param {RollupFileOptions} config
@return {lambda.AssetCode}
*/
export const rollupCode = async (config) => {
    const dir = await fs.mkdtemp(
        path.resolve(
            os.tmpdir(),
            "rollup-compile"
        )
    )
    console.log("bundling", config.input)
    console.log("    into", dir)

    const bundle = await rollup(config)
    await bundle.write({
        format: "esm",
        file: path.resolve(dir, "index.js")
    })

    return lambda.Code.fromAsset(dir)
}

export class AsyncStack extends Stack {
    constructor(scope, env, props) {
        super(scope, env, props)
    }

    /**
    @param {string} env
    @param {Stackprops} props
    @return {Promise<null>}
    */
    async build(env, props) {
        throw new Error("Stacks using AsyncStack have to override the build function.")
    }
}

/**
@param {AsyncStack} Stack
@param {Constrct} scope
@param {string} env
@param {StackProps} props
@return {Promise<null>}
*/
export const initStack = async (Stack, scope, env, props) => {
    const stack = new Stack(scope, `${Stack.appName}-${env}`, props)
    await stack.build(env, props)
}
