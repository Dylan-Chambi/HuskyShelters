import re
import boto3
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