const db = require("../models/Database/db");

exports.fetch = async (req, res, next) => {
  var query = await db.query(`SELECT * FROM matches`);
  if (query.rowCount == 0) {
    res.send("no data");
  } else {
    res.send(query.rows);
  }
};
exports.get = async (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  var query = await db.query(`SELECT * FROM matches where id='${id}'`);
  // console.log(query.rows, id);
  if (query.rowCount == 0) {
    res.send("no data");
  } else {
    res.send(query.rows);
  }
};

exports.add = async (req, res, next) => {
  const name = req.body.data.Name;
  const desc = req.body.data.Desc;
  const location = req.body.data.Location;
  const fee = req.body.data.Fee;
  const seats = req.body.data.Seats;
  const platform = req.body.data.Platform;
  const date = req.body.data.date;
  const time = req.body.data.time;
  const last = req.body.data.last;

  var query = await db.query(
    `INSERT INTO matches (name, description, location, date, "time", entry, seats, platform, lastdate,available) VALUES ('${name}','${desc}','${location}','${date}','${time}','${fee}','${seats}','${platform}','${last}','${seats}')`
  );
  if (query.rowCount == 1) {
    res.send("success");
  } else res.send("Failed!!!");
};
