const express = require("express");
const db = require("../dbConfig.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        // `SELECT * FROM "accounts";`
        // Since we already have Knex set up, we just need to use the 
            //db variable to connect it
        const accounts = await db.select("*").from("accounts");

        res.json(accounts);
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        // `SELECT "*" FROM "accounts" WHERE "id" = <some value>;`
        // "Select everything from accounts where the ID is equal to 
            // the params.id and get the first item."
        const account = await db("accounts").where("id", req.params.id).first()
        res.json(account)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        // `INSERT INTO "accounts" ("name", "budget") VALUES (<name>, <budget>);`
        //1. Create a payload object variable
        const payload = {
            // Set the value of name to req.body.name
            name: req.body.name,
            // Set the value of budget to req.body.budget
            budget: req.body.budget
        }
        
        // 2. Call await and insert the payload into accounts
        const [id] = await db("accounts").insert(payload)
        const account = await db("accounts").where("id", id).first()

        // 3. Return it to the response
        res.json(account)
    } catch (error) {
        next(error)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        //1. Create a payload object variable
        const payload = {
            // Set the value of name to req.body.name
            name: req.body.name,
            // Set the value of budget to req.body.budget
            budget: req.body.budget
        }

        // 2. Call await and update the payload into accounts
        // `UPDATE "accounts" SET "name" = ? AND "budget" = ? WHERE "id" = ?;`
        await db("accounts").where("id", req.params.id).update(payload)
        const updatedAccount = await db("accounts").where("id", req.params.id).first()

        // 3. Return it to the response
        res.json(updatedAccount)

    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        // 1. Call await
        // `DELETE FROM "accounts" WHERE "id" = ?;`
        await db("accounts").where("id", req.params.id).del()

        // 2. Return it to the response
        res.json(204).end()
    } catch (error) {
        next(error)
    }
})


module.exports = router;