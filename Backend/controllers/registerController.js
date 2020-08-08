const db = require("../models/Database/db");

exports.fetch = async (req, res, next) => {
  const id = req.body.id;
  var query = await db.query(
    `SELECT registration.id,uid,mid,total,amount,users.name FROM registration join users on users.id=uid and mid='${id}'`
  );
  if (query.rowCount == 0) {
    res.send("no data");
  } else {
    res.send(query.rows);
  }
};

exports.check = async (req, res, next) => {
  const id = req.body.id;
  const mid = req.body.mid;
  var query = await db.query(
    `SELECT * FROM registration where mid='${mid}' and uid='${id}'`
  );

  if (query.rowCount == 0) {
    res.send("no data");
  } else {
    res.send(query.rows);
  }
};
exports.cancel = async (req, res) => {
  const uid = req.body.uid;
  const mid = req.body.mid;
  const amt = req.body.amt;
  const seats = req.body.seats;

  var query = await db.query(
    `UPDATE users SET balance='${amt}' where id='${uid}'`
  );

  var q = await db.query(
    `UPDATE matches SET available='${seats}' WHERE id='${mid}'`
  );

  var r = await db.query(
    `DELETE FROM registration WHERE uid='${uid}' and mid='${mid}'`
  );

  res.send("success");
};

exports.add = async (req, res, next) => {
  const uid = req.body.uid;
  const mid = req.body.mid;
  const data = req.body.data;
  const fee = req.body.fee;
  const total = req.body.total;
  const remaining = req.body.remaining;
  var balance = await db.query(`SELECT balance from users where id='${uid}'`);
  data.map(async (d) => {
    var q = await db.query(
      `INSERT INTO registration (uid,mid,total,amount) VALUES ('${uid}','${mid}','${d}','${fee}')`
    );
  });
  var bal = balance.rows[0].balance - total;
  var q = await db.query(`UPDATE users SET balance='${bal}' where id='${uid}'`);
  var u = remaining - data.length;
  var query = await db.query(
    `UPDATE matches SET available='${u}' where id='${mid}'`
  );
  var t = await db.query(`SELECT balance from users where id='${uid}'`);
  res.send(t.rows[0]);
};
