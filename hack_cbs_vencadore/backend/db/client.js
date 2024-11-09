const { PrismaClient } = require("@prisma/client");

const pClient = new PrismaClient();

module.exports = pClient;
