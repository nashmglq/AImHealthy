// const { PrismaClient } = require("@prisma/client");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const createJournal = async (req, res) => {
  try {
    const { date, title, content } = req.body;
    if (!date) return res.status(400).json({ error: "Date is required." });

    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) return res.status(400).json({ error: "Invalid date format." });

    await prisma.journal.upsert({
      where: { userId_date: { userId: req.user.id, date: selectedDate } },
      update: { title, content },
      create: { userId: req.user.id, date: selectedDate, title, content },
    });

    return res.status(200).json({ success: "Journal saved." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

const getJournalByDate = async (req, res) => {
  try {
    const { date } = req.params;
    if (!date) return res.status(400).json({ error: "Date is required." });

    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) return res.status(400).json({ error: "Invalid date format." });

    const journal = await prisma.journal.findFirst({
      where: { userId: req.user.id, date: selectedDate },
    });

    if (!journal) return res.status(404).json({ error: "No journal found for this date." });

    return res.status(200).json({ success: journal });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

const listJournals = async (req, res) => {
  try {
    const journals = await prisma.journal.findMany({
      where: { userId: req.user.id },
      orderBy: { date: "desc" },
      select: { id: true, title: true, content: true, date: true },
    });
    return res.status(200).json({ success: journals });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  createJournal,
  getJournalByDate,
  listJournals,
};
