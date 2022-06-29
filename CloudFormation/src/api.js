const AWS = require('aws-sdk')
const fs = require('fs')
const s3 = new AWS.S3()
const URL_EXPIRATION_SECONDS = 30000

exports.upload_image_by_id = async (event) => {
  return await getUploadURL(event)
}

const getUploadURL = async function (event) {
  const id = event.pathParameters.id
  const randomID = Math.floor(Math.random() * 1000000)
  const Key = `uploads/${randomID}.jpeg`


  const uploadBucket = fs.readFileSync('./env.txt',
    { encoding: 'utf8', flag: 'r' });


  const s3Params = {
    Metadata: { id: id },
    Bucket: uploadBucket,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/jpeg',
  }

  return new Promise((resolve, reject) => {
    let uploadURL = s3.getSignedUrl('putObject', s3Params)
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": {
        "Access-Control-Allow-Origin": "",
        "Access-Control-Allow-Headers": "",
        "Access-Control-Allow-Methods": "*"

      },
      "body": JSON.stringify({
        "uploadURL": uploadURL,
        "filename": Key
      })
    })
  })
}