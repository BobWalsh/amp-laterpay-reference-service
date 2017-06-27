#!/bin/bash

name=$1

cd $name
curl -O https://ampexample.laterpay.net/$name/index.html
for i in $(seq 1 5) ; do
  curl -O https://ampexample.laterpay.net/$name/article$i.html
done
cd ..
