const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Public Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/shortener", require("./routes/api/shortener"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/pages", require("./routes/api/pages"));
app.use("/api/contact_us", require("./routes/api/contact_us"));
app.use("/api/channel", require("./routes/api/channel"));
app.use("/api/client/v1", require("./routes/api/client"));

// Private Routes
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
