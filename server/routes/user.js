var express = require("express");
var router = express.Router();
var userdb = require("../database/userBase");

var verfyUserLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};
/* GET home page. */
router.get("/", function (req, res, next) {
  userdb.View_Admin_added_products().then((pro) => {
    if (req.session.user) {
      res.render("./user/first-page", {
        userhd: true,
        pro,
        user: req.session.user,
      });
    } else {
      res.render("./user/first-page", { userhd: true, pro });
    }
  });
});
router.get("/signup", (req, res) => {
  res.render("./user/signup-page", { userhd: true });
});
router.post("/signup", (req, res) => {
  userdb.Do_signup(req.body).then((data) => {
    res.redirect("/login");
  });
});
router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    if (req.session.logerr) {
      res.render("./user/login-page", {
        userhd: true,
        logerr: "Invalid Username or Password",
      });
      req.session.logerr = false;
    } else {
      res.render("./user/login-page", { userhd: true });
    }
  }
});
router.post("/login", (req, res) => {
  userdb.Do_Login(req.body).then((info) => {
    if (info) {
      req.session.user = info;
      req.session.user.status = true;
      res.redirect("/");
    } else {
      req.session.logerr = true;
      res.redirect("/login");
    }
  });
});
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
});
router.get("/prodetails", verfyUserLogin, (req, res) => {
  userdb.Get_A_pRoduct_single_details(req.query.id).then((pro) => {
    res.render("./user/pro-details", {
      userhd: true,
      pro,
      user: req.session.user,
    });
  });
});
router.get("/cart", (req, res) => {
  userdb.Do_Cart(req.query.id, req.session.user._id).then((data) => {
    res.redirect("/");
  });
});
router.get("/viewcart", verfyUserLogin, (req, res) => {
  userdb.View_Carted_products(req.session.user._id).then((pro) => {
    userdb
      .Total_price_for_carted_products(req.session.user._id)
      .then((total) => {
        res.render("./user/cart-page", {
          userhd: true,
          pro,
          user: req.session.user,
          total,
        });
      });
  });
});
router.post("/placeorder", verfyUserLogin, (req, res) => {
  userdb.Find_Whicch_User_Is_CaRTed(req.session.user._id).then((user) => {
    userdb.Cart_products_for_order(req.session.user._id).then((pro) => {
      userdb
        .Total_price_for_carted_products(req.session.user._id)
        .then((total) => {
          var state = {
            user: user,
            products: pro,
            total: total,
            type : req.body.del ==  'cod' ? "placed" : "pending"
          };
          userdb.Place_Order(state).then((info) => {
            userdb
              .Remove_product_From_cart_after_place_Order(req.session.user._id)
              .then((del) => {
                res.redirect("/viewcart");
              });
          });
        });
    });
  });
});
router.get('/vieworders',verfyUserLogin,(req,res)=>
{
    userdb. Get_Details_From_Orders_collection(req.session.user._id).then((pro)=>
    {
      res.render('./user/view-orders',{ userhd: true,pro,user: req.session.user})
    })
})


module.exports = router;
