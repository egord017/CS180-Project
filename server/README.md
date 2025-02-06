# HOW TO RUN Backend

## 0. node
    Download node.js


## 1. Go to the server directory.

    cd server

## 2. run 'npm ci' (installs the depencies)

    Installs the node_modules dependencies within server/.


## 3. Start PostgreSQL

    This is a more loaded step, you will probably have to google how to download this and get it working.

    We are going to use postgresql@17.

    you can use this tutorial as reference:
    https://www.youtube.com/watch?v=fZQI7nBu32M (its kind of a weird video tbh but its good enough)

    If you are on mac, I suggest https://postgresapp.com/. It is super easy and out of the box.

    In either installers, you may be asked to input a password during the process. Make sure you dont lose it!


    Create your local database
    __________________________
    1. Open CMD and type 'psql -U postgres'

    2. copy and paste 'CREATE DATABASE writersblock;' into CMD to create the SQL database
    you can use '\l' to view all of your current databases then '\c databaseName' to jump into a database

    3. db.js generates an example database once you run the server. It only needs to have access to an .env file (see next step) and a DB server already set to our desired database, which you just created.

## 3. Create an .env file.
   
    See the .env.example and copy the variables and add your own values.
    
    .env uses the dotenv node module, so google that if you have questions regarding this. .env is not tracked on git, because it contains sensitive data you do not want to share.

## 5. Start server
To run the server, type 'nodemon index' in your IDE console (make sure youre in the server directory). 
    If you made code changes and want to rerun the server, hit control-s in index.js and nodemon will restart the server

    You can also use node --watch index.js if your node is on a newer version.

