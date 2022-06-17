import boto3
import json

table = boto3.resource('dynamodb').Table('husky_shelter')

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
