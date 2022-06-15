import boto3
import json

table = boto3.resource('dynamodb').Table('husky_shelter')

def update_item(event, context):
    
    body = json.loads(event["body"])
    print(body)
    
    table.update_item(
        Key={'id': body["id"]},
        AttributeUpdates={
            "age": body["age"],
            "collectionOfImages": body["collectionOfImages"],
            "health": body["health"],
            "location": body["location"],
            "name": body["name"],
            "status": body["status"]
        },
    )
    

    return {
        'statusCode': 200,
        'body': "API test"
    }
