#!/bin/sh

cd ~/code/amphtml/dist
gulp build && gulp dist
cd ~/laterpay/amp-prototype
cp -r ~/code/amphtml/dist .
rm -rf dist/*.map
rm -rf dist/**/*.map
