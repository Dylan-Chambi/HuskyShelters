#!/bin/bash

OPTIONS=nibdwu
LONGOPTS=name,install,build,deploy,website,upload

! PARSED=$(getopt --options=$OPTIONS --longoptions=$LONGOPTS --name "$0" -- "$@")

n=0 i=0 p=0 b=0 d=0 w=0 u=0

# CF_FILE="/tmp/cf_file.txt"
DEPLOYMENTS_BUCKET="camibucketdeloyment" #CHANGE TO YOUR OWN BUCKET
PACKAGED_TEMPLATE="packaged-template.yaml"
declare -a arr

case "$1" in
-n | --name)
  n=1
  shift
  ;;
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

-w | --website)
  w=1
  shift
  ;;

--)
  shift
  break
  ;;
*) ;;

esac

function readValues {

  while IFS= read -r line; do
    arr+=("$line")
  done < env.txt


}

if [[ $n -eq 1 ]]; then
  echo "Please enter the name of the bucket where the website will be stored"
  read WEBSITENAME
  echo "Please enter the name of the bucket where the .csv databases will be stored"
  read DATABASENAME
  echo "Please enter the name of the bucket where the animal images will be stored"
  read ANIMALIMAGENAME
  cd CloudFormation
  rm -r env.txt
  touch env.txt
  echo $WEBSITENAME >> env.txt
  echo $DATABASENAME >> env.txt
  echo $ANIMALIMAGENAME >> env.txt
  echo $ANIMALIMAGENAME >> ./src/env.txt

  readValues



  cd ..
  
fi

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
  echo "Please, enter your deployments bucket"
  read DEPLOYMENTS_BUCKET
  echo "Building template"
  cd ./CloudFormation
  aws cloudformation package \
  --template-file template.yaml \
  --s3-bucket $DEPLOYMENTS_BUCKET \
  --output-template-file $PACKAGED_TEMPLATE
  cd ..

fi

if [[ $d -eq 1 ]]; then
  cd ./CloudFormation
  readValues
  echo ${arr[0]}
  echo ${arr[1]}
  echo ${arr[2]}
  aws cloudformation deploy \
  --no-fail-on-empty-changeset \
  --template-file $PACKAGED_TEMPLATE \
  --parameter-overrides WebsiteAdoptionBucketName=${arr[0]} AnimalDataBucketName=${arr[1]} AnimalImagesBucketName=${arr[2]} \
  --stack-name husky-shelter-stack \
  --capabilities CAPABILITY_NAMED_IAM
  cd ..
fi

if [[ $w -eq 1 ]]; then
  echo "Creating .env file"
  id=$(aws apigateway get-rest-apis --query 'items[?name==`"husky-shelters-api"`].[id]' --output text)
  region=$(aws configure get region --output text)
  url="https://$id.execute-api.$region.amazonaws.com/aws/"
  getImages="${url}get-images/"
  getTableItems="${url}get-table-items"
  updateItem="${url}update-item"
  uploadImage="${url}upload-image/"
  cd ./Website
  touch .env
  echo REACT_APP_GET_TABLE_ITEMS = $getTableItems >> .env
  echo REACT_APP_GET_IMAGES_BY_ID = $getImages >> .env
  echo REACT_APP_POST_UPDATE_ITEM = $updateItem >> .env
  echo REACT_APP_GET_UPLOAD_IMAGE_BY_ID = $uploadImage >> .env

  cd ..

  

  echo "Building website"
  cd ./Website
  rm -r buiild
  npm run build
  cd ..
  

  
fi


if [[ $u -eq 1 ]]; then
  cd ./CloudFormation
  readValues
  while [ true ]; do
    echo "Please, enter the name of the database to upload"
    read database
    if [ -f "./data/$database" ]; then

      echo "Uploading database"
      aws s3 cp ./data/$database s3://${arr[1]}/
      tmpArrDb=(${database//_/ })
      dbIdTmp=${tmpArrDb[1]}
      dbIdArrTmp=(${dbIdTmp//./ })
      dbId=${dbIdArrTmp[0]}
      echo "Database id: $dbId"


      echo "Uploading images"
      cd ./uploads
      i=1

      folderChange="database_$dbId"

      cd $folderChange
      
      for dir in *; do
        dir=${dir%*/}
        echo "${dir##*/}"
        tmp="${dir##*/}"
        cd ${dir##*/}

      for filename in *; do
        tmpArr=(${tmp//_/ })
        #echo ${tmpArr[1]}
        #echo ${filename}
        aws s3 cp ${filename} s3://${arr[2]}/uploads/ --metadata "{\"id\" : \"${tmpArr[1]}\" }"
      done
      ((i = i + 1))
      cd ..
    done
    cd ..

    else
      echo "Database not found"
    fi

    echo "Do you want to upload another database? (y/n)"
    read answer
    if [ "$answer" != "y" ]; then
      break
    fi

    cd ..

  done  

  cd ..
  echo "Uploading website"
  pwd
  cd ../Website
  aws s3 cp ./build s3://${arr[0]}/ --recursive
  cd ..
fi