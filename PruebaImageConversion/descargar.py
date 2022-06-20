'''
import json
import urllib.parse
import boto3

print('Loading function')

s3 = boto3.client('s3')


def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        print("CONTENT TYPE: " + response['ContentType'])
        return response['ContentType']
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e
'''     
import boto3
import os
import sys
import uuid
from urllib.parse import unquote_plus
import matplotlib.pyplot as plt

s3_client = boto3.client('s3')

def scale(im, nR, nC):
    number_rows = len(im)     
    number_columns = len(im[0]) 
    return [[ im[int(number_rows * r / nR)][int(number_columns * c / nC)]  
                 for c in range(nC)] for r in range(nR)]

def lambda_handler(event, context):
  for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = unquote_plus(record['s3']['object']['key'])
        tmpkey = key.replace('/', '')
        download_path = '/tmp/{}{}'.format(uuid.uuid4(), tmpkey)
        upload_path = '/tmp/resized-{}'.format(tmpkey)
        if key == 'perrito.jpg':
            s3_client.download_file(bucket, key, download_path)
            im = plt.imread(download_path)
            res = scale(im, 500, 500)
            plt.imsave(upload_path, res)
            s3_client.upload_file(upload_path, bucket, 'resized-{}'.format(tmpkey))
            print('Image resized and uploaded to S3')
        else :
            print('Image not resized')    
        
