const express = require("express");
const { authChecker } = require("../middleware/authCheck");
const {
  chatBot,
  generateUserInsights,
  getChatBot,
  getLatestInsights,
  getAllInsights,
} = require("../controller/aiController");

const aiRouter = express.Router();

aiRouter.post("/chatbot", authChecker, chatBot);
aiRouter.post("/insights", authChecker, generateUserInsights);

aiRouter.get("/chatbot/messages", authChecker, getChatBot);
aiRouter.get("/insights/latest", authChecker, getLatestInsights);
aiRouter.get("/insights/all", authChecker, getAllInsights);

module.exports = { aiRouter };
