
/** GLOBAL VARIABLES */

const mysql = require('mysql')
const express = require("express")
const bp = require("body-parser")
const path = require("path")

const app = express()
app.use(bp.urlencoded({extended: true}))

const PORT = 8080
const HOST = '0.0.0.0'

var database = "db"
var table = "tb"

var buttonPushes = 0

var connection

/** FUNCTIONS */

function connect(){
    connection = mysql.createConnection({
        host: 'mysql',
        port: 3306,
        user: 'root',
        password: 'admin',
        database: 'db'
    })
    connection.connect(function(err) {
        if (err) {
            console.error("Error connecting: " + err.stack)
            connection.destroy()
            setTimeout(connect, 3000)
        }
        else {
            console.log("connected as id " + connection.threadId)
        }
    })
}

app.put('/sendButtonPush', (req, res) => {
    buttonPushes++
    connection.query("UPDATE " + database + "." + table + " SET pushes=" + buttonPushes + ";", (err, result) => {
        if (err) {
            console.error("Error inserting: ", err)
            res.send(400)
        } else {
            console.log("Insertion successful")
            res.send(null)
        }
    })
})

app.get('/getButtonPushes', (req, res) => {
    var statement = "SELECT * FROM " + table + ";"
    connection.query(statement, (err, result) => {
        if (err) {
            console.error(err)
            res.sendStatus(400)
        } else {
            res.send(result)
        }
    })
})

/** RUNNING CODE */

connect()
app.use("/", express.static(path.join(__dirname, ".")))
app.listen(PORT, HOST)
console.log("Up and running...")