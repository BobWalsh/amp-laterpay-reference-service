#!/bin/bash

addsandbox(name) {
  cd $name
  for i in $(seq 1 5) ; do
  sed -i .bak 's/        "localeMessages"/        "sandbox": true,\
          "localeMessages"/g' article$i.html
  done
  cd ..
}

addsandbox('.')
addsandbox('business')
addsandbox('sports')
addsandbox('culture')
addsandbox('politics')

exit 0

getdir(name) {
  cd $name
  curl -O https://ampexample.laterpay.net/$name/index.html
  for i in $(seq 1 5) ; do
    curl -O https://ampexample.laterpay.net/$name/article$i.html
  done
  cd ..
}

getdir('business')
getdir('sports')
getdir('culture')
getdir('politics')