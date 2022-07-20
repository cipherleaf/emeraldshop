# EMERALD SHOP
## A simple shopping app where you can view products and add items to cart.

1. Download and Install MongoDB [<https://www.mongodb.com/docs/manual/installation/>]
2. Download and Install Node.js [<https://nodejs.org/en/download/>]
3. Open Node.js and install Express. [<https://expressjs.com/en/starter/installing.html>]


4. Extract the zip files. This contains our models, routes, clientside folder, app.js and the package.json which define the project.

5. Run the mongoshell or MongoDB Compass to import the collections.

    _First create a database name `emeraldshop`. Then import the two collections which is save as `json` files. `products` and `productcarts`. The json files were included in the zip file._

6. Navigate inside emeraldshop folder

    _Run these commands in the Terminal:_

         cd emeraldshop

5. Start the database/server by running `nodemon` or `node app.js`.

    _Run these commands in the Terminal:_

         node app.js


6. Start the client side by running `ng serve`.

    _Run these commands in the Terminal:_

         cd clientside
         ng serve
