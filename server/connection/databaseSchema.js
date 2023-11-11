const mongoose = require("mongoose");
var promise = require("promise");
const { Schema } = mongoose;
module.exports = {
  Schema_For_UserSignup: () => {
    return new promise((resolve, reject) => {
      const yourSchema = new Schema({
        // Define your schema fields here
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        // Add other fields as needed
      });

      // Create a Mongoose model
      const YourModel = mongoose.model("YourModel", yourSchema);

      resolve(YourModel);
    });
  },
  Schema_For_Admin_Products: ()=>
  {
    return new promise((resolve,reject)=>
    {
      const AdminSchema = new Schema({
        // Define your schema fields here
        pname: {
          type: String,
          required: true,
        },
        discription: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      });

      // Create a Mongoose model
      const AdminModel = mongoose.model("AdminModel", AdminSchema);

      resolve(AdminModel);
    })
  }
};
