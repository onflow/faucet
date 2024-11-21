module.exports = function (api) {
  api.assertVersion("^7.12.10")

  const removeDataTestAttributes =
    api.env("production") && !process.env.PRESERVE_DATA_TEST_ATTRIBUTES

  const presets = [
    "next/babel",
    {
      "preset-react": {
        importSource: "theme-ui", // or '@theme-ui/core'
        runtime: "automatic",
        throwIfNamespace: false,
      },
    },
  ]
  const plugins = removeDataTestAttributes
    ? [["react-remove-properties", {properties: ["data-test"]}]]
    : []

  return {
    presets,
    plugins,
  }
}
