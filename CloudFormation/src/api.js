const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const uploadBucket = 'animalimagesbucket' 
const URL_EXPIRATION_SECONDS = 30000    // Specify how long the pre-signed URL will be valid for

// Main Lambda entry point
exports.upload_image_by_id = async (event) => {
  return await getUploadURL(event)
}

const getUploadURL = async function(event) {
  const randomID = parseInt(Math.random() * 10000000)
  const Key = `${randomID}.jpeg` // Random filename we will use when uploading files

  // Get signed URL from S3
  const s3Params = {
    Bucket: uploadBucket,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/jpeg'
  }
  
  return new Promise((resolve, reject) => {
    // Get signed URL
    let uploadURL = s3.getSignedUrl('putObject', s3Params)
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      },
      "body": JSON.stringify({
          "uploadURL": uploadURL,
          "filename": Key
      })
    })
  })
}