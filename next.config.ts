import type { NextConfig } from "next"
import type { Configuration, RuleSetRule } from "webpack"
const path = require("path");

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
    // Ensure config.module.rules exists
    const rules = config.module?.rules as RuleSetRule[] | undefined
    if (!rules) return config

    // Find the rule handling SVGs
    const fileLoaderRule = rules.find(
      (rule) => typeof rule !== "string" && rule.test instanceof RegExp && rule.test.test(".svg")
    ) as RuleSetRule | undefined

    if (fileLoaderRule) {
      rules.push(
        // Reapply existing rule, but only for *.svg?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [/url/] },
          use: ["@svgr/webpack"],
        }
      )

      // Exclude .svg from the original file-loader
      fileLoaderRule.exclude = /\.svg$/i
    }

    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "app/styles")]
  }
}

export default nextConfig