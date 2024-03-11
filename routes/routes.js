const express = require("express");
const router = express.Router();
const User = require("../models/Schema");
const multer = require("multer");
const fs = require("fs");

router.get("", async (req, res) => {
  users = await User.find().exec();
  res.render("index", { title: "Home Page", users: users });
});
router.get("/add", (req, res) => {
  res.render("add_users", { title: "Add User" });
});

router.get("/edit", (req, res) => {});
// image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

// Edit User route

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  user = await User.findById({ _id: id });
  res.render("edit_user", { user: user, title: "Update User" });
});

var upload = multer({
  storage: storage,
}).single("image");

router.post("/add", upload, async (req, res) => {
  await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  });
  req.session.message = {
    type: "success",
    message: "User Added Successfully!",
  };
  res.redirect("/");
});

// update User route
router.post("/update/:id", upload, async (req, res) => {
  const { id } = req.params;
  let new_image = "";
  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync("./uploads/" + req.body.old_image);
    } catch (err) {
      console.log(err);
    }
  } else {
    new_image = req.body.old_image;
  }
  //   console.log(id);
  const result = await User.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: new_image,
  }).exec();
  //   console.log(result);
  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  await User.findByIdAndDelete(id);
  res.redirect("/");
});

module.exports = router;
