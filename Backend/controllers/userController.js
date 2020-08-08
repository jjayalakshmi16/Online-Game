const db = require("../models/Database/db");

exports.fetch = async (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.password;
  var query = await db.query(`SELECT * FROM users WHERE email='${email}'`);
  console.log("signin---->", query.rows);
  if (query.rowCount == 0) {
    res.send("Please Register!!!");
  } else {
    if (query.rows[0].password == pass) {
      // console.log("======>", query.rows[0]);
      res.send(query.rows[0]);
    } else {
      res.send("Password Mismatch!");
    }
  }
};

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.password;

  var test = await db.query(`SELECT email from users WHERE email='${email}'`);
  if (test.rowCount != 0) {
    res.send("Already Registered...Please sign in");
  }
  var query = await db.query(
    `INSERT INTO users (name,email,password,balance,isadmin) VALUES ('${name}','${email}','${pass}','${10000}','${0}')`
  );
  // console.log("SIGNUP---->", query.rowCount);
  if (query.rowCount == 1) {
    res.send("success");
  } else res.send("Failed!!!");
};

exports.google = async (req, res, next) => {
  const email = req.body.email;
  var Email = email.split("@");
  var name = Email[0];
  var test = await db.query(`SELECT email from users WHERE email='${email}'`);
  if (test.rowCount != 0) {
    res.send("Already Registered...Please sign in");
  } else {
    var query = await db.query(
      `INSERT INTO users (name,email,balance,isadmin) VALUES ('${name}','${email}','${10000}','${0}')`
    );
    // console.log("SIGNUP---->", query);
    if (query.rowCount == 1) {
      res.send("success");
    } else res.send("Failed!!!");
  }
};
