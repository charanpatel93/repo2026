let mysql = require("mysql2");
let express = require("express");
let cors = require("cors");
let multer = require("multer");
let jwt = require("jsonwebtoken");
let app = express();
let bcrypt = require("bcrypt");
let dotenv = require("dotenv");
dotenv.config();
let connection;
app.use(cors());
app.use(express.json());
app.use("/Profilepics", express.static("Profilepics"));
const path=require("path");

app.use(express.static(path.join(__dirname, "client/build")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Profilepics");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
app.post("/signup", upload.single("profile"), async (req, res) => {
  let bcrypting = await bcrypt.hash(req.body.password, 10);
  req.body.password = bcrypting;
  let sending = `INSERT INTO players (firstname,lastname,email,
    password,age,department,profile)
    VALUES(?,?,?,?,?,?,?)`;

  let values = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.password,
    req.body.age,
    req.body.department,
    req.file.filename,
  ];

  connection.query(sending, values, (error) => {
    if (error) {
      res.json({ status: "failure", msg: "data is not inserted" });
    } else {
      res.json({ status: "success", msg: "data is inserted" });
    }
  });
});
app.post("/validate", upload.none(), async (req, res) => {
  let decripyedData = jwt.verify(req.body.token, "kalki");
  let taking = `SELECT * FROM players WHERE
    email='${decripyedData.email}'`;
  connection.query(taking, async (error, taking) => {
    let comparing = await bcrypt.compare(decripyedData.password,taking[0].password);
    if (error) {
      res.json({ status: "failure", msg: "somthing went wrong" });
    } else {
      if (taking.length > 0) {
        if (comparing === true) {
          let membersData = {
          firstname: taking[0].firstname,
            lastname: taking[0].lastname,
            email: taking[0].email,
            age: taking[0].age,
            department: taking[0].department,
            profile: taking[0].profile,
          };
          res.json({
            status: "success",
            msg: "cridentials are correct",
            data: membersData,
          });
        } else {
          res.json({ status: "unsuccess", msg: "password is wrong" });
        }
      } else {
        res.json({ status: "failure", msg: "email is not exist" });
      }
    }
  });
});

app.post("/login", upload.none(), async (req, res) => {
  let taking = `SELECT * FROM players WHERE
    email='${req.body.email}'`;
  let token = jwt.sign(
    { email: req.body.email, password: req.body.password },
    "kalki",
  );
  connection.query(taking, async (error, taking) => {
    let comparing = await bcrypt.compare(req.body.password,taking[0].password);
    if (error) {
      res.json({ status: "failure", msg: "somthing went wrong" });
    } else {
      if (taking.length > 0) {
        if (comparing === true) {
          let membersData = {
            firstname: taking[0].firstname,
            lastname: taking[0].lastname,
            email: taking[0].email,
            age: taking[0].age,
            department: taking[0].department,
            profile: taking[0].profile,
            token: token,
          };
          res.json({
            status: "success",
            msg: "cridentials are correct",
            data: membersData,
          });
        } else {
          res.json({ status: "unsuccess", msg: "password is wrong" });
        }
      } else {
        res.json({ status: "failure", msg: "email is not exist" });
      }
    }
  });
});

app.listen(process.env.PORT || 9595, () => {
  console.log("server started");
});
let connectTodata = () => {
  connection = mysql.createConnection({
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  });

  connection.connect((error) => {
    if (error) {
      console.log("database is not connected");
    } else {
      console.log("database is connected");
    }
  });
};
connectTodata();
