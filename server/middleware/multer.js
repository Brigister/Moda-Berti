const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/products')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const storageMulti = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/products/secondary')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/webp") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        /* fileSize: 1024 * 1024 * 2 */
    },
    fileFilter: fileFilter
}).single('image');

const uploadArray = multer({
    storage: storageMulti,
    limits: {
        /* fileSize: 1024 * 1024 * 2 */
    },
    fileFilter: fileFilter
}).array('images', 5);

module.exports = { upload, uploadArray };
/* module.exports = uploadArray; */