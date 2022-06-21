import boto3
from PIL import Image
import PIL.Image
import csv
import json
     
table = boto3.resource('dynamodb').Table('husky_shelter')
s3 = boto3.client('s3')
dynamodb = boto3.client('dynamodb', region_name = 'us-east-1')

def update_item(event, context):
    
    body = json.loads(event["body"])
    print(body)
    if 'id' not in body:
        return {
            "statusCode": 400,
            'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
            "body": json.dumps("Missing id")
        }

    keyDict = {'id': body['id']}
    expAttrName = dict()
    expAttrValue = dict()
    conditionExpr = ""
    updateExpression = "SET "

    lastIndex = len(body)
    index = 0
    for key, value in body.items():
        index += 1
        if key != 'id':
            expAttrName["#" + key] = key
            expAttrValue[":" + key] = value
            conditionExpr += ('attribute_exists(#' + key + ')' + (' AND ' if index != lastIndex else ''))
            updateExpression += ("#" + key + " = :" + key + (", " if index != lastIndex else ""))
    try:
        response = table.update_item(
            Key=keyDict,
            UpdateExpression=updateExpression,
            ExpressionAttributeNames=expAttrName,
            ExpressionAttributeValues=expAttrValue,
            ConditionExpression=conditionExpr
        )
    except Exception:
        return {
            "statusCode": 400,
            'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
            "body": "Invalid attributes"
        }

    
    if(response['ResponseMetadata']['HTTPStatusCode'] == 200):
        return {
            'statusCode': 200,
            'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
            'body': json.dumps("Item updated successfully")
        }
    else:
        return {
            'statusCode': 400,
            'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
            'body': json.dumps("Error updating item")
        }


def get_table_items(event, context):
    response = table.scan()
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(response['Items'])
    }

def get_images_by_id(event, context):
    id = event['pathParameters']['id']
    urls= []
    result = s3.list_objects_v2(Bucket='animalimagesbucket',Prefix='folder_'+id+'/')
    if 'Contents' in result:
        for obj in result.get('Contents'):
            print(obj.get('Key'))
            url = s3.generate_presigned_url(
                ClientMethod='get_object',
                Params={
                    'Bucket': 'animalimagesbucket',
                    'Key': obj.get('Key')
                }
            )
            urls.append(url)
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        'body': json.dumps(urls)
    }

def upload_image_by_id(event, context):
    response = s3.generate_presigned_post(
        Bucket='animalimagesbucket',
        Key = 'folder_'+event['pathParameters']['id']+'/'+'test.jpg',
        ExpiresIn = 10
    )
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        'body': json.dumps(response)
    }

def excel_processing_handler(event, context):
    animal_data = []
    region = "us-east-1"
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    print('Bucket: ', bucket, 'Key: ', key)

    csv_file = s3.get_object(Bucket=bucket, Key=key)

    animal_data = csv_file['Body'].read().decode('utf-8-sig').split('\n')
    csv_reader = csv.reader(animal_data, delimiter=',', quotechar='"')

   

    
   
    for row in csv_reader:
        print(row)

        if row: 
            id = row[0]
            name = row[1]
            health = row[2]
            status = row[3]
            location = row[4]
            type = row[5]
            age = row[6]

        

        add_to_dynamo = dynamodb.put_item(

            TableName='husky_shelter',
            Item={

                'id' : {'S': id},
                'name' : {'S': name},
                'health' : {'S': health},
                'status' : {'S': status},
                'location' : {'S': location},
                'type' : {'S': type},
                'age' : {'S': age}
            
            }


    )    


    return {
        'statusCode': 200,
        'body': "Hello World"
    }
def resize_image(image_path, resized_path):
    with Image.open(image_path) as image:
        image.thumbnail((128, 128))
        image.save(resized_path)

def s3_images_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        tmpkey = key.replace('/', '')
        download_path = '/tmp/{}{}'.format("aaaaaaaaaaaaaaaaaaaaaa", tmpkey)
        upload_path = '/tmp/resized-{}'.format(tmpkey)
        if key == 'perrito.jpg':
            s3.download_file(bucket, key, download_path)
            resize_image(download_path, upload_path)
            s3.upload_file(upload_path, bucket, 'resized-{}'.format(tmpkey))
            print('Image resized and uploaded to S3')
        else :
            print('Image not resized')
    return {
        'statusCode': 200,
        'body': "Hello World"
    }
    """

        object_key = record['s3']['object']['key']
        extension = path.splitext(object_key)[1].lower()

        # Grabs the source file
        obj = s3.Object(
            bucket_name='animalimagesbucket',
            key=object_key,
        )
        obj_body = obj.get()['Body'].read()
    
        # Checking the extension and
        # Defining the buffer format
        if extension in ['.jpeg', '.jpg', '.png']:
            format = 'JPEG'

        if object_key == 'perrito.jpg':
            # Image resize
            image = Image.open(BytesIO(obj_body))
            output_size = (1000, 1000)
            image.thumbnail(output_size) # image.thumbnail preserves aspect ratio, does does not exceed specified size, 
            buffer = BytesIO()
            image.save(buffer, format)
            buffer.seek(0)

            # Upload resized image to destination bucket
            obj = s3.Object(
                bucket_name='animalimagesbucket',
                key=f"{object_key}",
            )
            obj.put(Body=buffer)
            print('Image resized and uploaded to S3')
        else :
            print('Image not resized')    

    """
