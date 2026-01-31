const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/chat", require("./routes/chat.routes"));
app.use("/api/survey", require("./routes/survey.routes"));
app.use("/api/recommendation", require("./routes/recommendation.routes"));
app.use("/api/risk", require("./routes/risk.routes"));
app.use("/api/auth", require("./routes/auth.routes"));


app.get("/", (req, res) => {
    res.send("InsureGuide Backend Running");
});

module.exports = app;
