var promise = require("promise");
var bcrypt = require("bcryptjs");
var objectId = require("mongodb").ObjectId;
var db = require("../connection/connect");
var consts = require("../connection/dbconst");
var schema = require("../connection/databaseSchema");
const { Logger } = require("mongodb/lib/core");

module.exports = {
  Do_signup: (data) => {
    return new promise(async (resolve, reject) => {
      data.password = await bcrypt.hash(data.password, 10);
      // await schema.Schema_For_UserSignup().then((YourModel) => {
      //   const newData = new YourModel(data);
      //   const dataObject = newData.toObject();
      //   console.log(dataObject);

      db.get()
        .collection(consts.user_Base)
        .insertOne(data)
        .then((data) => {
          // console.log(data);
          resolve(data);
        });
    });
    // });
  },
  Do_Login: (data) => {
    return new promise(async (resolve, reject) => {
      await db
        .get()
        .collection(consts.user_Base)
        .findOne({ email: data.email })
        .then(async (email) => {
          if (email) {
            await bcrypt.compare(data.password, email.password).then((pwd) => {
              if (pwd) {
                resolve(email);
                console.log("Login Successs");
              } else {
                resolve(false);
                console.log("Login Faild");
              }
            });
          } else {
            resolve(false);
            console.log("Login Faild");
          }
        });
    });
  },
  View_Admin_added_products: () => {
    return new promise(async (resolve, reject) => {
      var pro = await db.get().collection(consts.admin_Pro).find().toArray();
      resolve(pro);
    });
  },
  Get_A_pRoduct_single_details: (Id) => {
    return new promise(async (resolve, reject) => {
      await db
        .get()
        .collection(consts.admin_Pro)
        .findOne({ _id: objectId(Id) })
        .then((pro) => {
          resolve(pro);
        });
    });
  },
  Do_Cart: (proid, userid) => {
    return new promise(async (resolve, reject) => {
      var state = {
        proId: objectId(proid),
        qut: 1,
      };
      await db
        .get()
        .collection(consts.cart_bade)
        .findOne({ userId: objectId(userid) })
        .then(async (pro) => {
          if (pro) {
            var st = pro.product.findIndex((pro) => pro.proId == proid);
            if (st != -1) {
              //console.log("hi..")
              await db
                .get()
                .collection(consts.cart_bade)
                .updateOne(
                  {
                    "product.proId": objectId(proid),
                    userId: objectId(userid),
                  },
                  {
                    $inc: { "product.$.qut": 1 },
                  }
                )
                .then((data) => {
                  resolve(data);
                });
            } else {
              await db
                .get()
                .collection(consts.cart_bade)
                .updateOne(
                  { userId: objectId(userid) },
                  {
                    $push: {
                      product: state,
                    },
                  }
                )
                .then((data) => {
                  resolve(data);
                });
            }
          } else {
            var details = {
              userId: objectId(userid),
              product: [state],
            };
            db.get()
              .collection(consts.cart_bade)
              .insertOne(details)
              .then((data) => {
                resolve(data);
              });
          }
        });
    });
  },
  View_Carted_products: (userid) => {
    return new promise(async (resolve, reject) => {
      var pro = await db
        .get()
        .collection(consts.cart_bade)
        .aggregate([
          {
            $match: {
              userId: objectId(userid),
            },
          },
          {
            $unwind: "$product",
          },
          {
            $project: {
              proid: "$product.proId",
              qut: "$product.qut",
            },
          },
          {
            $lookup: {
              from: consts.admin_Pro,
              localField: "proid",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              proid: 1,
              qut: 1,
              product: { $arrayElemAt: ["$product", 0] },
            },
          },
        ])
        .toArray();
      resolve(pro);
    });
  },
  Total_price_for_carted_products: (userid) => {
    return new promise(async (resolve, reject) => {
      var total = await db
        .get()
        .collection(consts.cart_bade)
        .aggregate([
          {
            $match: {
              userId: objectId(userid),
            },
          },
          {
            $unwind: "$product",
          },
          {
            $project: {
              proid: "$product.proId",
              qut: "$product.qut",
            },
          },
          {
            $lookup: {
              from: consts.admin_Pro,
              localField: "proid",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              proid: 1,
              qut: 1,
              product: { $arrayElemAt: ["$product", 0] },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: { $multiply: ["$product.price", "$qut"] } },
            },
          },
        ])
        .toArray();
      resolve(total[0]);
    });
  },
  Find_Whicch_User_Is_CaRTed: (userid) => {
    return new promise(async (resolve, reject) => {
      await db
        .get()
        .collection(consts.user_Base)
        .findOne({ _id: objectId(userid) })
        .then((user) => {
          resolve(user);
        });
    });
  },
  Cart_products_for_order: (userid) => {
    return new promise(async (resolve, reject) => {
      await db
        .get()
        .collection(consts.cart_bade)
        .findOne({ userId: objectId(userid) })
        .then((pro) => {
          resolve(pro);
        });
    });
  },
  Place_Order: (data) => {
    return new promise((resolve, reject) => {
      db.get()
        .collection(consts.order_base)
        .insertOne(data)
        .then((res) => {
          resolve(res);
        });
    });
  },
  Remove_product_From_cart_after_place_Order: (userid) => {
    return new promise(async (resolve, reject) => {
      await db
        .get()
        .collection(consts.cart_bade)
        .deleteOne({ userId: objectId(userid) })
        .then((data) => {
          resolve(data);
        });
    });
  },
  Get_Details_From_Orders_collection: (userid) => {
    return new promise(async (resolve, reject) => {
      var pro = await db
        .get()
        .collection(consts.order_base)
        .aggregate([
          {
            $match: {
              "user._id": objectId(userid),
            },
          },
          {
            $unwind: "$products.product",
          },
          {
            $project: {
              user: 1,
              total: "$tatal.total",
              type: 1,
              proid: "$products.product.proId",
              qut: "$products.product.qut",
            },
          },
          {
            $lookup: {
              from: consts.admin_Pro,
              localField: "proid",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              proid: 1,
              qut: 1,
              user: 1,
              total: 1,
              type: 1,
              product: { $arrayElemAt: ["$product", 0] },
            },
          },
        ])
        .toArray();
      resolve(pro);
    });
  },
};
