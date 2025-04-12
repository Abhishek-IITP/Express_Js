const cloudinary= require('cloudinary').v2;

async function cloudinaryConfig() {
  try {
    await cloudinary.config(
        {
            cloud_name: "dag2sttzw",
            api_key: "384151751457187",
            api_secret:"RLrxPgqCarYtfmssfKHgpkNUXkc"
        }
    )
    
    console.log("Cloudinary Config Successfull")
  } catch (error) {
    console.log("error occur while config cloundinary")
    console.log(error.message)
    
  }
}

module.exports = cloudinaryConfig