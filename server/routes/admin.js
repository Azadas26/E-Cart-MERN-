var express = require("express");
var router = express.Router();
var admindb = require("../database/adminBase");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("./admin/first-page");
});
router.get("/addpro", (req, res) => {
  res.render("./admin/add-pro");
});
router.post("/addpro", (req, res) => {
  req.body.price = parseInt(req.body.price);
  //console.log(req.body);
  admindb.Add_Admin_products(req.body).then(async (id) => {
    if (req.files.image) {
      var image = req.files.image;
      await image.mv("public/adminpro/" + id + ".jpg", (err, data) => {
        if (err) {
          console.log(err);
        }
      });
    }
    res.redirect("/admin/addpro");
  });
});
router.get("/vieworder", (req, res) => {
  admindb.Get_Orders_and_USers_details().then((pro) => {
    res.render("./admin/view-orders", { pro });
  });
});
router.get("/viewpro", (req, res) => {
  admindb.View_aDDEd_Products().then((pros) => {
    res.render("./admin/products", { user: false, pros });
  });
});

module.exports = router;
