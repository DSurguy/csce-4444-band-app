## Application Notes

#### Description
This application serves as a management tool for bands, allowing members to connect with either other, join and create bands, and manage events, set lists and inventory quickly and easily.

#### Prototype Goals
The prototype of this application intends to produce the following basic functionality:

 1. Allow user registration
 2. Allow user login
 3. Allow viewing of main page and bands page
 4. Allow registration of a band
 5. Show bands on bands page and allow selection of existing bands

## Configuration
In order to run this locally, you'll need to set up a mysql installation and create+edit a config.json file at the project root.

config.json has the following structure:
    
    {
        "db": {
            "host": "locahost",
            "user": "root",
            "password": "test",
            "database": "band"
        }
    }

You should modify this file to match your mysql setup.

## Development Quickstart
1. Install nodejs (I prefer the LTS version) https://nodejs.org/en/
2. Install/configure mysql
3. `git clone` or unzip this project
4. Open a terminal or cmd prompt
5. cd to the root of the project (where package.json lives) (if you're not already in it)
6. Modify config.json to match mysql installation
7. `npm install`
8. `node app.js`
9. Visit localhost:8080 in your browser