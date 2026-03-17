import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: process.env.GATSBY_GRAPHQL_ENDPOINT ?? "http://localhost:8000/___graphql",
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: false,
  generates: {
    "src/graphql/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        avoidOptionals: false,
        enumsAsTypes: true,
        dedupeFragments: true,
        scalars: {
          Date: "string",
          JSON: "unknown",
        },
      },
    },
  },
}

export default config

