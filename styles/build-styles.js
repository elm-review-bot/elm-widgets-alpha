const fs = require("fs");
const postcss = require("postcss");
const postcssNested = require("postcss-nested");
const postcssAutoprefixer = require("autoprefixer");
const postcssCssnano = require("cssnano");

const source = fs.readFileSync("./styles/styles.pcss");

postcss([postcssNested, postcssAutoprefixer, postcssCssnano])
  .process(source, {
    from: "./styles/styles.pcss",
    to: "./src/ElmWidgets/Styles.elm",
  })
  .then((result) => {
    fs.writeFileSync(
      "./src/ElmWidgets/Styles.elm",
      `module ElmWidgets.Styles exposing (..)

import Html as H exposing (Html)

globalStyles : Html msg
globalStyles =
    H.node "style"
        []
        [ H.text """${result.content}""" ]`
    );
  });
