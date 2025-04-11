const express = require("express");
const multer = require("multer");
// const upload= multer({dest: 'uploads/'})
const app = express();
const path = require("path");

// app.use(express.urlencoded({extended: true}))
app.use(express.json());

const storage = multer.diskStorage({
  // 1. destination 2. filename
  destination: "uploadss/",
  filename: function (req, file, cb) {
    // console.log()
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100000,
  },
}).single("image");

app.post("/imageUpload", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: err.message,
      });
    } else if (err) {
      return res.status(400).json({
        message: err.message,
        success: false,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "please send file",
        success: false,
      });
    }
    res.status(200).json({
        success: true,
        message: "File uploaded successfully!",
        file: req.file,
      });
 
});


});

app.listen(3000, () => {
  console.log("server started successfully");
});
