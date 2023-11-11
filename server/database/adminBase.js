var promise = require('promise')
var bcrypt = require('bcryptjs')
var objectId = require('mongodb').ObjectId;
var db = require('../connection/connect')
var consts = require('../connection/dbconst')
var schema = require('../connection/databaseSchema')

module.exports=
{
    Add_Admin_products : (data)=>
    {
        return new promise((resolve,reject)=>
        {
            schema.Schema_For_Admin_Products().then((AdminModel)=>
            {
                const newData = new AdminModel(data);
                const dataObject = newData.toObject();
                
                db.get().collection(consts.admin_Pro).insertOne(dataObject).then((info)=>
                {
                   // console.log(data);
                    resolve(info.ops[0]._id)
                })
            })
        })
    },
    Get_Orders_and_USers_details : ()=>
    {
        return new promise(async(resolve,reject)=>
        {
            var pro = await db.get().collection(consts.order_base).aggregate([
                {
                        $unwind: "$products.product"
                },
                {
                    $project:
                    {
                        user:1,
                        total:"$tatal.total",
                        type:1,
                        proid: "$products.product.proId",
                        qut: "$products.product.qut"
                    }
                },
                {
                    $lookup:
                    {
                        from: consts.admin_Pro,
                        localField: "proid",
                        foreignField: "_id",
                        as: 'product'
                    }
                },
                {
                    $project:
                    {
                        proid: 1, qut: 1,
                        user:1,
                        total:1,
                        type:1,
                        product: { $arrayElemAt: ["$product", 0] },
                    }
                },
            ]).toArray()
            resolve(pro);
        })
    },
    View_aDDEd_Products : ()=>
    {
        return new promise(async(resolve,reject)=>
        {
            var pro = await db.get().collection(consts.admin_Pro).find().toArray()
            resolve(pro)
        })
    
    }
}