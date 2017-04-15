# Test 

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

## Technology Stack
LEARN SOME STUFF!

#### Front-End
All the pages are served from the server and rendered from [handlebars](http://handlebarsjs.com/) templates. These templates are basically html, but support the ability to inherit from layouts. Our base layout is called base.hbs, and it lives in `views/layouts`. The rest of the templates all support a single page and live in `/views`.

We are using [Bootstrap 4](https://v4-alpha.getbootstrap.com/) to help style the application. While it's a little overused, it's going to save us a ton of time trying to make everything look presentable.

Each page is served as as standalone route from the server, and they all inherit from Page, PageCtrl and PageView classes, which mostly just insure that they store their base elements and the controllers and viewers initialize properly. If you want/need to override the init on the controller for your page, just make sure that it returns a [promise](https://api.jquery.com/category/deferred-object/). We're using [jQuery 3.x](http://jquery.com/) to support rapid development of DOM manipulation and promises in the front-end.

All scripts, images, css, anything that needs to be requested and served directly lives in the `/static` folder, and expressjs is serving them directly.

#### Back-End
Our backend runs in [nodejs](https://nodejs.org/en/), and targets nodesjs v6+, which is the current LTS (Long-Time Support) version.

We're using [express 4](https://expressjs.com/) to serve all our pages and API. Our main pages are all defined as individual `.get` routes, and most of the API is defined as GET, PUT, POST, DELETE routes that start with `/api/`.

We're using a few plugins for express/node to support the following functionality so that we didn't have to homebrew it:

 - sessions (express-session)
 - session storage (express-mysql-session)
 - mysql (mysql)
 - handlebars template rendering (express-hbs)


Our business logic is roughly organized into logical Services. These services support a logical chunk of the app entirely and are how the API routes communicate with our mysql database. These services live in `/server`.

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