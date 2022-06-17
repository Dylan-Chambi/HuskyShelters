'''from skimage.transform import resize
import matplotlib.pyplot as plt

im = plt.imread('PruebaImageConversion\perrito.jpg')
res = resize(im, (50, 50))
plt.imshow(res)
plt.show()
'''

'''
import cv2
import numpy as np

img1 = cv2.imread('PruebaImageConversion\perrito.jpg')
res1 = cv2.resize(img1, dsize=(50, 50), interpolation = cv2.INTER_CUBIC)

cv2.imshow('perrito.jpg', res1)
cv2.waitKey(0)
cv2.destroyAllWindows()
'''

import boto3
from botocore.client import Config
import matplotlib.pyplot as plt

BUCKET_NAME = 'pruebaimageconversion'

def scale(im, nR, nC):
    number_rows = len(im)     
    number_columns = len(im[0]) 
    return [[ im[int(number_rows * r / nR)][int(number_columns * c / nC)]  
                 for c in range(nC)] for r in range(nR)]

im = plt.imread('PruebaImageConversion\perrito.jpg')
res = scale(im, 500, 500)

'''plt.imshow(res)
plt.show()
'''
'''im2 = plt.imread('PruebaImageConversion\perrito.jpg')
res2 = scale(im2, 50, 50)

plt.imshow(res2)
plt.show()'''

s3 = boto3.resource('s3')
data = open(res, 'rb')

s3.Bucket(BUCKET_NAME).put_object(Key='perrito.jpg', Body=data)

print("Imagen subida correctamente")