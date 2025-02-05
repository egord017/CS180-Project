# HOW TO RUN Backend

## 1. Go to the server directory.

    cd server

## 2. run 'npm ci' (installs the depencies)

    Installs the node_modules dependencies within server/.

## 3. Create an .env file.
   
    See the .env.example and copy the variables and add your own values.
    
    .env uses the dotenv node module, so google that if you have questions regarding this. 

## 4. Start PostgreSQL

    This is a more loaded step, you will probably have to google how to download this and get it working.
    We are going to use postgresql@17.

    If you are on mac, I suggest https://postgresapp.com/. It is super easy and out of the box.

    If you are on windows, I suggest https://www.postgresql.org/ (you will have to do more steps so google this or watch a youtube vid)

    In either installers, you may be asked to input a password during the process. Make sure you dont lose it!

    Create a database, and make sure the database's name, port, username, password, all correlates with the PG variables in your .env file, as it will be using them. :)

## 5. Start server
    node --watch app.js
