const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './images/');
  },
  filename: function(req, file, cb) {
    cb(null,  file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer({ 
    storage: diskStorage,
    limits: {
        fileSize: 1024 * 1024 * 50
    },
    fileFilter: fileFilter })
    .single('image');

const multistorage = multer({ 
  storage: diskStorage,
  limits: {
      fileSize: 1024 * 1024 * 50
  },
  fileFilter: fileFilter })
  .any('images[]');

module.exports = {storage,multistorage};