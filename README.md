# Projet 7 - Créez un réseau social d'entreprise "Groupomania"

## Technologies

React, redux, Node.js, Express, MySQL, Sequelize

## Back-end installation

Depuis le dossier "back" du projet, ajoutez un fichier .env suivi de vos informations :

```
DB_USER=root  
DB_PASSWORD=MotDePasseMySQL  
DB_DATABASE=groupomania  
DB_HOST=localhost  
DB_DIALECT=mysql

TOKEN=RANDOM_TOKEN_SECRET  
PORT=3000 
```

Exécutez npm install. Vous pouvez alors exécuter le serveur avec npm start. Le serveur doit fonctionner sur localhost avec le port par défaut 3000. Redémarrez l'ordinateur si le serveur ne se lance pas sur le port 3000.

## Front-end installation

Depuis le dossier "front", ajoutez un fichier .env suivi de l'url de l'API :

REACT_APP_API_URL=http://localhost:3000/

Executez ensuite npm install, suivi de npm start pour lancer le projet. Le projet se lance sur le port 5500.
