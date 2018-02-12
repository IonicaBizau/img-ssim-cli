#!/usr/bin/env node
"use strict";

const Tilda = require("tilda")
    , imgSsimCli = require("..")
    , imgSSIM = require("img-ssim")

new Tilda(`${__dirname}/../package.json`, {
    args: [
        {
            name: "first_image"
          , desc: "The first image source."
        }
      , {
            name: "second_image"
          , desc: "The second image source."
        }
    ],
    options: [
        {
            name: "resize"
          , opts: ["r", "resize"]
          , desc: "Whether to resize the images to be the same size. Default: not enabled (meaning, the images should have the same number of pixels)"
          , type: Boolean
          , default: false
        }
      , {
            name: "no-size-check"
          , opts: ["n", "no-size-check"]
          , desc: "Whether to bypass the size check and comparing the images which do *not* have identic sizes. Not enabled by default."
          , type: Boolean
          , default: false
        }
      , {
            name: "window-size"
          , opts: ["s", "window-size"]
          , desc: "The images are divided in regions of 8 x 8 pixels, by default. Use this option to provide a different size of the square."
          , type: Number
          , default: 8
        }
    ]
}).main(action => {
    imgSSIM(
        action.args.first_image
      , action.args.second_image
      , {
            resize: action.options.resize.value
          , enforceSameSize: !action.options.n.value
          , windowSize: action.options.s.value
        }
      , (err, similarity) => {
          if (err) console.error(err)
          else console.log(similarity)
        }
    )
})
