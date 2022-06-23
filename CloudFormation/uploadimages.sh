#!/bin/bash

cd src/uploads

 
i=1
for dir in *
do
    
    dir=${dir%*/}
    echo "${dir##*/}"
    tmp="${dir##*/}"
    cd ${dir##*/}

    for filename in *
    do

        tmpArr=(${tmp//_/ })
        #echo ${tmpArr[1]}
        #echo ${filename}
        
        aws s3 cp ${filename} s3://animalimagesbucket/uploads/ --metadata "{\"id\" : \"${tmpArr[1]}\" }"

    done
    ((i=i+1))    


    cd ..





done    