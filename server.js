//the server object listens on port 8080

const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();

const port = 8080;
mongoose.set("strictQuery", false);
app.use(express.json());


const conn_str = `mongodb+srv://siva:plinga123@cluster0.jx2hbof.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(
    conn_str, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log("error in connection");
        } else {
            console.log("mongodb is connected");
        }
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});

