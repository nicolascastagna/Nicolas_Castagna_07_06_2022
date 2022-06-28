const express = require("express");
const app = express();
const helmet = require("helmet");
const db = require("./models");

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// Routes

const postRouter = require("./routes/posts");
app.use("/api/posts", postRouter);
const usersRouter = require("./routes/users");
app.use("/api/auth", usersRouter);
const commentsRouter = require("./routes/comments");
app.use("/api/comments", commentsRouter);
const likeRouter = require("./routes/likes");
app.use("/api/like", likeRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

// extrait le corps JSON
app.use(express.json());

app.use((req, res, next) => {
  // accéder à l'API depuis n'importe quelle origine et envoies requêtes avec les méthodes get...
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
