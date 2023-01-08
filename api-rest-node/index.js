const { connection } = require("./database/connection");
const express = require('express');
const cors = require('cors');
const routes = require('./routes/article');

//Database connection
connection();

//Node server creation
const app = express();
const port = 7777;

//Configure cors
app.use(cors());

//Transform body to js object
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Create routes
app.use("/api", routes);

//Create server
app.listen(port, () =>{
    console.log("Server started on port: " + port);
});