const newsLetterRouter = require("express").Router();
const { subscribe, unsubscribe } = require("../controllers/newsletterController");


newsLetterRouter.post("/", subscribe);
newsLetterRouter.delete("/:id", unsubscribe)

module.exports = newsLetterRouter;