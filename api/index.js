const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const coachesRoute = require("./routes/coaches");
const contactRoute = require("./routes/contact");
const app = express();
app.use(cors());
app.set("view engine", "ejs");

dotenv.config();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.BUCKET_SECRET_KEY,
  accessKeyId: process.env.BUCKET_ACCESS_KEY,
  region: process.env.BUCKET_REGION,
});
const BUCKET = process.env.BUCKET_NAME;
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.post("/upload", upload.array("file", 2), async function (req, res, next) {
  // console.log(req.files[0].location, req.files[1].location);
  res.send(req.files);
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to MONGO_DB");
  } catch (error) {
    throw error;
  }
};

//middlewares
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/coaches", coachesRoute);
app.use("/api/contact", contactRoute);

app.listen(5000, () => {
  connect();
  console.log("Serwer działa");
});
