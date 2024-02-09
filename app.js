const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const USER = require("./models/User");
const DB = process.env.CONNECTION_MONGODB;

const app = express();
app.use(express.json());
mongoose.connect(DB).then(() => console.log("base de donnes connecté"));
//------get all users------//
app.get("/AllUSERS", async (rep, res) => {
  await USER.find({}).then((data) => {
    res.status(200).json(data);
  });
});
//-----post user----//
app.post("/Add_user", (req, res) => {
  let new_user = new USER(req.body);
  new_user.save().then(() => {
    res
      .status(200)
      .json("user added")
      .catch((err) => {
        res.status(400).json({ err });
      });
  });
});
//--------update user----//
app.put("/edit_user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    await USER.findByIdAndUpdate(id, updates);
  } catch (e) {
    res.json({ error: e });
  }
});
//--------delete user-----//
app.delete("/delet_user/:id", async (req, res) => {
  const id = req.params.id;
  await USER.findOneAndDelete(id);
  res.json({ msg: "deleted" });
});

const port = 5000;
app.listen(port, () => console.log("server en march"));
