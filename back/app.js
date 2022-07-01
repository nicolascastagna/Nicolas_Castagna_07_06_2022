const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// extrait le corps JSON
app.use(express.json());

const helmet = require("helmet");
const db = require("./models");

// imports routes
const postRoutes = require("./routes/posts");
const usersRoutes = require("./routes/user");
const commentsRoutes = require("./routes/comments");
const likesRoutes = require("./routes/likes");
const profilsRoutes = require("./routes/profils");

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port : ${process.env.PORT}`);
  });
});

app.use((req, res, next) => {
  // accéder à l'API depuis n'importe quelle origine
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

app.use(bodyParser.json());

// Routes
app.use("/posts", postRoutes);
app.use("/auth", usersRoutes);
app.use("/comments", commentsRoutes);
app.use("/like", likesRoutes);
app.use("/profil", profilsRoutes);

module.exports = app;
