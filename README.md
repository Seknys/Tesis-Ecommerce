# UpWorld E-ccomerce

<p align="center"><img width='200px' height='200px' src="https://firebasestorage.googleapis.com/v0/b/ecommerce-tesis.appspot.com/o/Junk%2FLogoT.png?alt=media&token=2857c39b-afd2-4bea-8a3a-569634c8a6ba"></p>

[Upworld](https://ecommerce-epn.web.app/home) es un ecommerce web para la venta de productos computacionales. Este es el repositorio que almacena el codigo del componente Front-End.

El sismtema web maneja 3 roles de usuario principales:
- Cliente
- Administrador
- Analista


## Descarga e instalacion

### Descargar las  siguientes herramientas antes de empezar: 
- [NodeJs](https://nodejs.org/en/).
    Descargar y ejecutar el archivo de instalacion. Para verificar la correcta instalacion de node ejecutar el siguiente comando en la terminal.
    ```sh
    node -v
    ```
- Editor de codigo (Recomendado: [VisualStudio Code](https://code.visualstudio.com/download)) Seguir los pasos de instalacion del respectivo programa a instalar.
- [Git](https://git-scm.com/downloads) 

### Clonar el repositorio
Abrir una nueva terminal y ejecutar el siguiente comando

```sh
git clone https://github.com/Seknys/Tesis-Ecommerce.git 
```

### Preparar el proyecto
En el mismo terminal donde ejecuto el comando anterior 
```sh
cd Tesis-Ecommerce
```
Abrir el codigo en el editor descargado anteriormente, en el caso de VisualStudio Code ejecutar el siguiente comando 
```sh
code .
```
Instalar los paquetes 
```sh
npm install
```
### Añadir claves de acceso
El proyecto usa diferentes servicios y Apis para ejecutarse correctamente. Crear y generar las respectivas credenciales en cada servicio
- Firebase ([Crear Proyecto](https://cloud.google.com/firestore/docs/client/get-firebase)) ([Genrar credenciales](https://support.google.com/firebase/answer/9326094?hl=en))
- PayPal ([Crear cuenta](https://developer.paypal.com/home/)) ([Generar credenciales](https://developer.paypal.com/api/rest/))
- i18nexus ([Crear cuenta](https://i18nexus.com/)) ([Tutorial React](https://i18nexus.com/react-tutorial/))

Despues de generar todas las credenciales correspondientes cree un nuevo archivo en el root del proyecto con el nombre  ``` .env.development ``` y añadir el siguiente contenido

```sh
REACT_APP_FIREBASE_API_KEY ='Your firebase api key'
REACT_APP_FIREBASE_AUTH_DOMAIN = 'Your firebase auth domain'
REACT_APP_FIREBASE_PROJECT_ID = 'Your firebase project id'
REACT_APP_FIREBASE_STORAGE_BUCKET = 'Your firebase storage bucket'
REACT_APP_FIREBASE_MESSAGIN_SENDER_ID = 'Your firebase messagin senderid'
REACT_APP_FIREBASE_APP_ID = 'Your firebase app id'
REACT_APP_FIREBASE_MEASUREMENTID = 'Your firebase measurement id'

REACT_APP_PAYPAL_SANDBOX_CLIENT = 'Your paypal sandbox client'
REACT_APP_PAYPAL_LIVE_CLIENT = 'Your paypal live client'

REACT_APP_I18NEXT_API_KEY = 'Your i18next api key'
```

### Ejecutar el proyecto
En la terminal  ejecutar el comando.
``` sh
npm start
```

Si todos los pasos se siguieron correctamente el proyecto se ejecutara en el puerto ``` 3000 ``` del localhost

