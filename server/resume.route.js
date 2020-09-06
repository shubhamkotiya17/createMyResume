const express = require('express'),
multer = require('multer'),
router = express.Router();

const DIR='./public';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
      }
});

// multer validation
let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });

  router.post('/img', upload.single('avatar'), (req, res)=>{
    console.log('req === ', req, " host ", req.get('host'));
    const url = req.protocol + '://' + req.get('host');
    res.status(201).json({
        message: "Resume data added successfully !",
        userCreated: {
          avatar: url + '/public/' + req.file.filename
        }
      })
  });

  module.exports = router;
