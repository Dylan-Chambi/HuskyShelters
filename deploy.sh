#!/bin/bash

OPTIONS=ibdu
LONGOPTS=install,build,deploy,upload

! PARSED=$(getopt --options=$OPTIONS --longoptions=$LONGOPTS --name "$0" -- "$@")

i=0 p=0 b=0 d=0 u=0

# CF_FILE="/tmp/cf_file.txt"
DEPLOYMENTS_BUCKET="camibucketdeloyment" #CHANGE TO YOUR OWN BUCKET
PACKAGED_TEMPLATE="packaged-template.yaml"

case "$1" in
-i | --install)
  i=1
  shift
  ;;
-r | --remove)
  r=1
  shift
  ;;
-b | --build)
  b=1
  shift
  ;;
-d | --deploy)
  d=1
  shift
  ;;
-u | --upload)
  u=1
  shift
  ;;
--)
  shift
  break
  ;;
*) ;;

esac

if [[ $i -eq 1 ]]; then
  echo "Python dependencies installation"
  cd CloudFormation
  rm -r build
  pip install -r requirements.txt -t build
  cp -r src/app.py build

  echo "Node JS dependencies installation"
  cd ../Website
  rm -r node_modules
  npm i
  cd ..
fi

if [[ $b -eq 1 ]]; then
  echo "Building template"
  cd ./CloudFormation
  aws cloudformation package \
  --template-file template.yaml \
  --s3-bucket $DEPLOYMENTS_BUCKET \
  --output-template-file $PACKAGED_TEMPLATE
  
  echo "Building website"
  cd ../Website
  rm -r buiild
  npm run build
  cd ..
fi

if [[ $d -eq 1 ]]; then
  cd ./CloudFormation
  aws cloudformation deploy \
  --no-fail-on-empty-changeset \
  --template-file $PACKAGED_TEMPLATE \
  --stack-name husky-shelter-stack \
  --capabilities CAPABILITY_NAMED_IAM
  cd ..
fi

if [[ $u -eq 1 ]]; then
  cd ./CloudFormation
  echo "Uploading database"
  aws s3 cp ./data/animalAdoptionData.csv s3://animaldatabucket346253/

  echo "Uploading images"
  cd ./uploads
  i=1
  for dir in *; do
    dir=${dir%*/}
    echo "${dir##*/}"
    tmp="${dir##*/}"
    cd ${dir##*/}

    for filename in *; do
      tmpArr=(${tmp//_/ })
      #echo ${tmpArr[1]}
      #echo ${filename}
      aws s3 cp ${filename} s3://animalimagesbucket/uploads/ --metadata "{\"id\" : \"${tmpArr[1]}\" }"
    done
    ((i = i + 1))
    cd ..
  done
  cd ..

  echo "Uploading website"
  cd ../Website
  aws s3 cp ./build s3://websiteadoptionbucket/ --recursive
  cd ..
fi