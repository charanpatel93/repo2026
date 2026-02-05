let mysql = require("mysql2");
let express = require("express");
let cors = require("cors");
let multer = require("multer");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let dotenv = require("dotenv");
const path = require("path");

let app = express();
let connection;

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/Profilepics", express.static("Profilepics"));

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

  let sending = `INSERT INTO players
    (firstname,lastname,email,password,age,department,profile)
    VALUES (?,?,?,?,?,?,?)`;

  let values = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    bcrypting,
    req.body.age,
    req.body.department,
    req.file ? req.file.filename : null,
  ];

  connection.query(sending, values, (error) => {
    if (error) {
      return res.json({ status: "failure", msg: "data is not inserted" });
    }
    res.json({ status: "success", msg: "data is inserted" });
  });
});

app.post("/login", upload.none(), async (req, res) => {
  let taking = `SELECT * FROM players WHERE email=?`;

  connection.query(taking, [req.body.email], async (error, taking) => {
    if (error || taking.length === 0) {
      return res.json({ status: "failure", msg: "email is not exist" });
    }

    let comparing = await bcrypt.compare(
      req.body.password,
      taking[0].password
    );

    if (!comparing) {
      return res.json({ status: "unsuccess", msg: "password is wrong" });
    }

    let token = jwt.sign(
      { email: taking[0].email },
      "kalki"
    );

    res.json({
      status: "success",
      msg: "cridentials are correct",
      data: {
        firstname: taking[0].firstname,
        lastname: taking[0].lastname,
        email: taking[0].email,
        age: taking[0].age,
        department: taking[0].department,
        profile: taking[0].profile,
        token: token,
      },
    });
  });
});

app.post("/validate", upload.none(), async (req, res) => {
  try {
    let decripyedData = jwt.verify(req.body.token, "kalki");

    let taking = `SELECT * FROM players WHERE email=?`;
    connection.query(taking, [decripyedData.email], (error, taking) => {
      if (error || taking.length === 0) {
        return res.json({ status: "failure" });
      }

      res.json({
        status: "success",
        data: taking[0],
      });
    });
  } catch {
    res.json({ status: "failure" });
  }
});

app.use(express.static(path.join(__dirname, "client/build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});


app.listen(process.env.PORT || 9595, () => {
  console.log("server started");
});


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

