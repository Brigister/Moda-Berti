const fs = require('fs');
const Product = require('../models/product');
const upload = require('../middleware/multer');

/**
 * 
 * @desc Get all the products
 * @route GET /api/products
 * @acces Public 
 */
exports.getProducts = async (req, res, next) => {

    try {
        const products = await Product.find();
        console.log(products);

        return res.status(200).json({
            success: true,
            data: products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}

exports.getProduct = async (req, res, next) => {

    try {
        const product = await Product.findById(req.params.id);

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}
/**
 * 
 * @desc Post a product
 * @route Post /api/products
 * @acces Private 
 */
exports.postProduct = async (req, res, next) => {

    try {
        upload(req, res, async (err) => {
            console.log(req.body);
            console.log(req.file);
            if (err) {
                return res.status(500).json({
                    success: false,
                    data: {}
                })
            }
            else {
                const { name, brand, price, quantity, sizes } = req.body
                const data = {
                    name,
                    brand,
                    imageUrl: req.file.path.replace("\\", "/"),
                    price,

                }
                const product = await Product.create(data);

                product.sizes.forEach(size => {
                    product.sizes.push(size);
                    product.save;

                });

                return res.status(201).json({
                    success: true,
                    data: product
                })
            }

        })

    } catch (err) {
        return res.send(err);
    }
}

/**
 * 
 * @desc Delet a product
 * @route Delete /api/products/:id
 * @acces Private 
 */
exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'No product found'
            });
        }
        fs.unlinkSync(product.imageUrl);
        await product.remove();

        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        return res.send(err);
    }
}

/**
 * 
 * @desc Edit a product
 * @route Edit /api/products/:id
 * @acces Private 
 */
exports.editProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        let product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'No product found'
            });
        }

        let edited = await product.updateOne(req.body);

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        return res.send(err);
    }
}


//per mettere una nuova taglia serve fare una query con $push

/*const schema = Schema({ nums: [Number] });
const Model = mongoose.model('Test', schema);

const doc = await Model.create({ nums: [3, 4] });
doc.nums.push(5); // Add 5 to the end of the array
await doc.save();

// You can also pass an object with `$each` as the
// first parameter to use MongoDB's `$position`
doc.nums.push({
  $each: [1, 2],
  $position: 0
});
doc.nums; // [1, 2, 3, 4, 5] */