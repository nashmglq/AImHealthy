// const { PrismaClient } = require("@prisma/client");
const { PrismaClient } = require("../generated/prisma");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const chatBot = async (req, res) => {
  const userId = req.user.id;
  const { userMessage } = req.body;
  if (!userMessage)
    return res.status(400).json({ error: "Message is required" });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { journals: { orderBy: { date: "desc" } } },
  });
  if (!user) return res.status(404).json({ error: "User not found" });

  const lowerMsg = userMessage.toLowerCase();
  const requestOlder =
    lowerMsg.includes("earlier") ||
    lowerMsg.includes("older") ||
    lowerMsg.includes("previous");

  const journalLimit = requestOlder ? 20 : 10;
  const journals = user.journals.slice(0, journalLimit);
  const journalContext =
    journals
      .map((j) => `Title: ${j.title || "No title"}\nContent: ${j.content}`)
      .join("\n\n") || "No journal entries yet.";

  const previousChats = await prisma.chatbotMessage.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  const chatHistory =
    previousChats
      .map((m) => `${m.role === "user" ? "User" : "Gemi"}: ${m.message}`)
      .join("\n") || "No previous messages.";

  await prisma.chatbotMessage.create({
    data: {
      userId,
      message: userMessage,
      role: "user",
    },
  });

  const prompt = `
Hey! You're an AI buddy here to support mental, emotional, and physical well-being. 
Give helpful, positive advice and insights safely, and keep it casual—like a friend talking to another friend. 
Never suggest anything that could be unsafe or harmful.

User profile: ${user.name || user.email}

Recent journal entries:
${journalContext}

Recent chats:
${chatHistory}

User just said:
${userMessage}

Instructions:
- Focus on giving useful insights, tips, or encouragement for health, mood, hobbies, or daily routines.
- Only use information from the journal, chats, or profile to stay safe and relevant.
- If the question is outside your scope or could be unsafe, reply: "I'm here to help with your journal, physical, and mental well-being. I cannot answer that question."
- Keep your tone friendly, casual, and supportive—like a buddy giving advice.
- Don't say anything about "base on our chats and your journal".
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const botMessage = response.text();

    await prisma.chatbotMessage.create({
      data: {
        userId,
        message: botMessage,
        role: "assistant",
      },
    });

    return res.status(200).json({ success: botMessage });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate AI response" });
  }
};

const generateUserInsights = async (req, res) => {
  const userId = req.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      journals: { orderBy: { date: "desc" } },
      chatbots: { orderBy: { createdAt: "asc" }, take: 20 },
    },
  });

  if (!user) return res.status(404).json({ error: "User not found" });
  if (!user.journals.length)
    return res.status(200).json({ message: "No journal entries yet." });

  const journalContext = user.journals
    .map((j) => `Title: ${j.title || "No title"}\nContent: ${j.content}`)
    .join("\n\n");

  const firstDate = user.journals[user.journals.length - 1].date;
  const lastDate = user.journals[0].date;
  const timeRangeDays = Math.ceil(
    (new Date(lastDate) - new Date(firstDate)) / (1000 * 60 * 60 * 24)
  );

  const chatHistory =
    user.chatbots
      .map((m) => `${m.role === "user" ? "You" : "AI"}: ${m.message}`)
      .join("\n") || "No previous chats.";

  const prompt = `
Hey! You're an AI buddy here to support mental, emotional, and physical well-being.
Give helpful, positive advice and insights in **bullet points**. Keep it casual—like a friend talking to another friend.
Never suggest anything unsafe or harmful.

Recent journal entries from the last ${timeRangeDays} days:
${journalContext}

Recent chats:
${chatHistory}

Instructions:
- Focus on health, mood, hobbies, daily routines, and personal growth.
- Highlight trends, improvements, or areas to try next.
- Present all insights in bullet points.
- Keep it casual, supportive, and easy to read.
- Don't mention name, email, or say "based on your journal".
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const insightText = response.text();

    await prisma.insight.create({
      data: { userId, content: insightText },
    });

    return res.status(200).json({ success: insightText });
  } catch (err) {
    return res.status(500).json({ error: "Failed to generate insights" });
  }
};


const getChatBot = async (req, res) => {
  const userId = req.user.id;

  const messages = await prisma.chatbotMessage.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return res.status(200).json({ success: messages });
};

const getLatestInsights = async (req, res) => {
  const userId = req.user.id;

  const latestInsight = await prisma.insight.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!latestInsight)
    return res.status(400).json({ error: "No insights found." });

  return res.status(200).json({ success: latestInsight });
};

const getAllInsights = async (req, res) => {
  const userId = req.user.id;

  const insights = await prisma.insight.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!insights.length)
    return res.status(400).json({ error: "No insights found." });

  return res.status(200).json({ success: insights });
};


module.exports = { chatBot, generateUserInsights , getChatBot ,getLatestInsights, getAllInsights};
