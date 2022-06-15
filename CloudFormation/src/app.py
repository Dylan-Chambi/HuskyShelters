import boto3
import json

table = boto3.resource('dynamodb').Table('husky_shelter')

def update_item(event, context):
    
    body = json.loads(event["body"])
    print(body)
    response = table.update_item(
        Key={
            'id': body['id']
        },
        ExpressionAttributeNames={
            '#age': 'age',
            '#collectionOfImages': 'collectionOfImages',
            '#health': 'health',
            '#location': 'location',
            '#name': 'name',
            '#status': 'status'
        },
        ExpressionAttributeValues={
            ':age': str(body['age']),
            ':collectionOfImages': body['collectionOfImages'],
            ':health': body['health'],
            ':location': body['location'],
            ':name': body['name'],
            ':status': body['status'],
        },
        UpdateExpression='SET #age = :age, #collectionOfImages = :collectionOfImages, #health = :health, #location = :location, #name = :name, #status = :status',
    )
    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
