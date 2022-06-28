# Proyecto Final Certificación AWS - Husky Shelters

## Integrantes del grupo:

- Dylan Chambi Frontanilla
- Camila Alejandra Grandy Camacho
- Joseph Anthony Meneses Salguero
- Marcos Andres Simon Agreda

## Requisitos de Software:

- AWS CLI
- Versión de Python 3.7 (Recomendado 3.7.10)
- Node.JS
- Git

## Requisitos de Hardware:
- Instancia EC2 Amazon Linux 2 (Mínimo t3.small)


## Instalación:

- Clonar el presente repositorio con el comando: ``` git clone https://github.com/Dylan-Chambi/HuskyShelters.git ```
- Crear un ambiente de Python 3, con el siguiente comando: ``` python3 -m venv py3 ```
- Activar dicho ambiente de Python 3, con el siguiente comando: ``` source py3/bin/activate ```
- Entrar a la carpeta del repositorio con el comando: ``` cd HuskyShelters ```
- Ejecutar el comando de instalación ``` ./deploy.sh -i ``` y espere a su terminación  
- Ejecutar el comando de build ``` ./deploy.sh -b ```, se le solicitará un bucket en el cual se guardará el resultado del build.
- Ejecutar el comando de deploy ``` ./deploy.sh -d ```, y espere a su terminación.
- Ejecutar el comando de creación de website ``` ./deploy.sh -w ```, y espere a su terminación.
- Ejecutar el comando de subida de datos ``` ./deploy.sh -u ```, se le solicitará que especifique un archivo .csv existente en la carpeta ```HuskyShelters/CloudFormation/data ``` Ej: animalAdoptionData_2.csv
