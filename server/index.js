const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/auth", require("./src/routes/jwtAuth")); //login and register route

app.use("/dashboard", require("./src/routes/dashboard")); //dashboard route

app.listen(5000, () => {
    console.log("Server is running on port 5000")
});