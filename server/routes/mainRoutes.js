const express = require("express");

const { authChecker } = require("../middleware/authCheck");
const { createJournal, getJournalByDate, listJournals } = require("../controller/mainController");

const mainRouter = express.Router();

mainRouter.post("/create", authChecker, createJournal);
mainRouter.get("/:date", authChecker, getJournalByDate)
mainRouter.get("/", authChecker, listJournals)

module.exports = { mainRouter };