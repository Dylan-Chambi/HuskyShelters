import json
import csv
import boto3

s3 = boto3.client('s3')
dynamodb = boto3.client('dynamodb', region_name = 'us-east-1')


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

    animal_data = csv_file['Body'].read().decode('utf-8').split('\n')
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


        add_to_dynamo = dynamodb.put_item(

            TableName='husky_shelter',
            Item={

                'id' : {'S': id},
                'name' : {'S': name},
                'health' : {'S': health},
                'status' : {'S': status},
                'location' : {'S': location},
                'images' : {'S': images},
                'type' : {'S': type}
            
            }


    )    


    return {
        'statusCode': 200,
        'body': "Hello World"
    }





