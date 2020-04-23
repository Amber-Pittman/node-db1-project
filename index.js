const express = require("express");
const accountsRouter = require("./data/seeds/accountsRouter");

const db = require("./data/dbConfig");

const server = require("./api/server.js");

const PORT = process.env.PORT || 5000;

server.use(express.json())
server.use("/accounts", accountsRouter)



server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});

