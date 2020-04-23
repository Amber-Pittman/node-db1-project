const express = require("express");
const accountsRouter = require("../data/seeds/accountsRouter");

const db = require("../data/dbConfig");

const server = express();

server.use(express.json());
server.use("/accounts", accountsRouter)

module.exports = server;
