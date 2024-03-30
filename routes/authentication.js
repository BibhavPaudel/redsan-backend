import express from "express";
import userModel from "../model/userModel.js";
import couponsModel from "../model/CouponModel.js";
import dotenv from "dotenv";
dotenv.config();
import db from "../db/conn.js";
import dbcoupon from "../db/conncoupon.js";
import CouponModel from "../model/CouponModel.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("welcome to the root app");
});
router.get("/temp", (req, res) => {
  res.send("welcome to the login app");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  const { fullname, phone, department, coupons } = req.body; //object destructuring
  if (!fullname || !phone || !department) {
    return res.send("One or more field missing");
  }

  //find already used numbers
  userModel
    .findOne({ phone: phone })
    .then((dbUser) => {
      if (dbUser) {
        return res.status(500).json({ error: "User already exists" });
      }

      const user = new userModel({ fullname, phone, department, coupons });

      user
        .save()
        .then(() => {
          res
            .status(200)
            .json({ result: "User Registered sucesfully", status: "200" });
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get("/uim1", async (req, res) => {
  let collection = await db.collection("truser");
  let results = await collection.find({ team_id: 1 }).toArray();
  res.send(results).status(200);
});

router.get("/spin", async (req, res) => {
  let collection = await dbcoupon.collection("tempcoupons");
  let results = await collection.find().toArray();
  res.send(results).status(200);
  console.log(results);
});

router.get("/trlogin/:id", async (req, res) => {
  let teamid = Number(req.params.id);
  console.log(teamid);
  let query = { team_id: teamid };
  let collection = await db.collection("truser");
  let results = await collection.findOne(query);
  res.send(results).status(200);
  console.log(results);
});

// router.get("/spin", async (req, res) => {
//   let collection = await dbcoupon.collection("coupons");
//   let results = await CouponModel.find().populate("winner");
//   res.send(results).status(200);

// });

router.get("/login", async (req, res) => {
  let collection = await db.collection("usermodels");

  let results = await userModel.find().populate("coupons");
  res.send(results).status(200);
});

export default router;
