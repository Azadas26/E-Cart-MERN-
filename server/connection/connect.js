var promise = require('promise')
var mongoClient  = require('mongodb').MongoClient

var state =
{
    db : null
}

module.exports=
{
    DbConnection : ()=>
    {
       return new promise((resolve,reject)=>
       {
        var dbname = "Fullstack";
        mongoClient.connect("mongodb://127.0.0.1:27017",{useNewUrlParser: true, useUnifiedTopology: true},(err,data)=>
        {
            if(err)
            {
                reject("Database connection Error",err)
            }
            else
            {
                state.db = data.db(dbname);
                resolve("Database Connection successfulll")
            }
        })
       })
    },
    get : ()=>
    {
        return state.db;
    }
}