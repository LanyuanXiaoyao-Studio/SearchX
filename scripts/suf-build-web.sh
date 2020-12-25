#!/bin/bash

function readJson {
  UNAME=`uname`
  if [[ "$UNAME" == 'Linux' ]]; then
    SED_EXTENDED='-r'
  elif [[ "$UNAME" == 'Darwin' ]]; then
    SED_EXTENDED='-E'
  fi;

  VALUE=`grep -m 1 "\"${2}\"" ${1} | sed ${SED_EXTENDED} 's/^ *//;s/.*: *"//;s/",?//'`

  if [ ! "$VALUE" ]; then
    echo "Error: Cannot find \"${2}\" in ${1}" >&2;
    exit 1;
  else
    echo $VALUE ;
  fi;
}

version=`readJson package.json version`

docker build -t lanyuanxiaoyao/searchx .
echo 'lanyuanxiaoyao/searchx'
docker tag lanyuanxiaoyao/searchx lanyuanxiaoyao/searchx:$version
echo 'lanyuanxiaoyao/searchx':$version

docker push lanyuanxiaoyao/searchx
docker push lanyuanxiaoyao/searchx:$version

docker rmi lanyuanxiaoyao/searchx
docker rmi lanyuanxiaoyao/searchx:$version
