const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {

    } catch (error) {
        error(next)
    }
})