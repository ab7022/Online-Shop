const multer = require("multer");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
  destination: "product-data/images",
  filename: function (req, file, cb) {
    cb(null, uuid() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  imageUploadMiddleware: upload.single("image"),
};
