# API Poêle Intelligente
<h5>Node JS - ORM Sequelize(MySql)</h5>
<p>API retournant les informations nécéssaires pour les fronts du projet</p>
<h2>Installer le projet </h2>
<p>=> git clone pour récupérer le projet</p>
<p>=> npm install pour installer les dépendances</p>
<p>=> npm run start pour lancer le serveur</p>
<p>  Si vous n'êtes pas sur linux, enlever l'appel à 'init-db' 
dans package.json=> scripts => start avant de lancer la commande et créer la base "smart_pan" à la main
<br>Si vous êtes sur Linux remplacer "maxime" par votre utilisateur mysql dans ce même fichier </p>
<p>=> dans config.json, remplacer username et password par vos identifiants mysql</p>
<p>Passer ensuite les ficheirs database et fixtures dans votre db</p>


<p>Exemple de CRUD fait avec les posts (voir post.controller.js)  </p>

<h3>à faire :</h3>
<p>Voir vo==comment generer les models des tables existantes</p>
<p>implémenter la base SQL depuis le script du MCD et regénerer les models</p> 
<p>Faire les CRUDS pour chaque table selon besoin des fronts</p>