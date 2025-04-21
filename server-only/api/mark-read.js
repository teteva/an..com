// server-only/api/mark-read.js
const fs = require("fs");
const path = require("path");

const readPath = path.join(__dirname, "../read.json");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.writeHead(405).end();

  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    const { slug } = JSON.parse(body || "{}");
    if (!slug) return res.writeHead(400).end("Missing slug");

    const data = JSON.parse(fs.readFileSync(readPath, "utf-8"));
    if (!data.read.includes(slug)) {
      data.read.push(slug);
      fs.writeFileSync(readPath, JSON.stringify(data, null, 2));
    }

    res.writeHead(200).end("OK");
  });
};
