import "./src/styles/global.css"

const React = require("react")
const { AppProviders } = require("./src/providers/AppProviders")

exports.wrapRootElement = ({ element }) => {
  return React.createElement(AppProviders, null, element)
}
