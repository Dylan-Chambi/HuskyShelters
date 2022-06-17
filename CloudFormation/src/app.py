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
            "body": "Invalid attributes"
        }

    
    if(response['ResponseMetadata']['HTTPStatusCode'] == 200):
        return {
            'statusCode': 200,
            'body': json.dumps("Item updated successfully")
        }
    else:
        return {
            'statusCode': 400,
            'body': json.dumps("Error updating item")
        }




def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': "Hello World"
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
            images = row[5]
            type = row[6]
            age = row[7]


        add_to_dynamo = dynamodb.put_item(

            TableName='husky_shelter',
            Item={

                'id' : {'S': id},
                'name' : {'S': name},
                'health' : {'S': health},
                'status' : {'S': status},
                'location' : {'S': location},
                'images' : {'S': images},
                'type' : {'S': type},
                'age' : {'S': age}
            
            }


    )    


    return {
        'statusCode': 200,
        'body': "Hello World"
    }





