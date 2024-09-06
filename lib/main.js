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
    static appName = null
    /**
    @param {Constrct} scope
    @param {string} env
    @param {StackProps} props
    @return {Promise<null>}
    */
    static async create(scope, env, props) {
        const stackID = (this.appName === null) ? env : `${this.appName}-${env}`
        const stack = new this(scope, stackID, props)
        await stack.build(env, props)
    }

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
