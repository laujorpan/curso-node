En este proyecto primero hemos instalado como dependencia de desarrollo la libreria nodemon para que nos coja "en caliente" los cambios.
    npm install nodemon --save-dev

Para ello cambiamos el script de arranque en package.json por:
    "start": "nodemon --watch bin --watch public --watch routes  --watch views  --watch app.js ./bin/www"

Además incluimos cookies con la siguiente librería
    npm install --save cookie-session