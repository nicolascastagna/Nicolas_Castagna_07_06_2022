const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
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

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

app.use(bodyParser.json());

// traite les requêtes vers /images
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/posts", postRoutes);
app.use("/auth", usersRoutes);
app.use("/comments", commentsRoutes);
app.use("/like", likesRoutes);
app.use("/profil", profilsRoutes);

module.exports = app;
