const express = require("express");

const { authChecker } = require("../middleware/authCheck");
const { createJournal, getJournalByDate } = require("../controller/mainController");

const mainRouter = express.Router();

mainRouter.post("/create", authChecker, createJournal);
mainRouter.get("/:date", authChecker, getJournalByDate)

module.exports = { mainRouter };