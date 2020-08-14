const Cart = require('../models/cart');

/**
 * @desc get a cart based on userId
 * @router GET /api/cart/:id
 * @access ?
 */
exports.getUserCart = async (req, res,) => {
    console.log(req.params.id);

    try {
        const cart = await Cart.findOne({ userId: req.params.id });

        if (!cart) {
            return res.status(404).json({
                succes: false,
                error: "No cart found by given id"
            });
        }
        else {
            res.status(200).json({
                succes: true,
                data: cart
            });
        }
    } catch (err) {
        res.status(500).json({
            succes: false,
            error: err
        });
    }
}

/**
 * @desc insert product in a cart
 * @router POST /api/cart
 * @access Public
 */
exports.insertProduct = async (req, res, next) => {
    console.log(req.body)
    try {
        const { userId, productId, name, price, imageUrl, size, quantity } = req.body;

        let cart = await Cart.findOne({ userId });
        console.log(size);

        if (!cart) {
            const cartData = {
                userId,
                products: [{
                    productId,
                    name,
                    price,
                    imageUrl,
                    size,
                    quantity
                }]
            }
            const newCart = await Cart.create(cartData);

            return res.status(201).json({
                succes: true,
                /*  message: "Non hai un carello. eccoti quello nuovo", */
                data: newCart
            })
        }

        else {
            const productData = {
                productId,
                name,
                price,
                imageUrl,
                size,
                quantity
            }
            cart.products.push(productData);
            cart = await cart.save();

            return res.status(200).json({
                succes: true,
                data: cart,
            });

        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            succes: false,
            error: err.message
        });


    }
}

/**
 * @desc Delete a product from user cart
 * @router patch /api/cart
 * @access Public
 */
exports.removeFromCart = async (req, res,) => {
    try {
        //itemId = id dell'entry del cart da rimuovere
        const { userId, itemId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                succes: false,
                error: "No cart found by given id"
            });
        }
        else {
            const cartIndex = await cart.products.findIndex(product => product._id == itemId);
            console.log(itemId)
            console.log(cartIndex);
            if (cartIndex > -1) {
                cart.products.splice(cartIndex, 1);

                cart = await cart.save();

                res.status(200).json({
                    succes: true,
                    data: itemId
                });
            }
            else res.status(404).json({
                succes: false,
                data: "No product found by given id"
            });
        }
    } catch (err) {
        res.status(500).json({
            succes: false,
            error: err.message
        });
    }
}

/**
 * @desc Delete user cart
 * @router delete /api/cart/:id
 * @access Private
 */
exports.deleteUserCart = async (req, res,) => {
    try {
        const { id } = req.params

        const deleted = await Cart.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                succes: false,
                err: "No product found by given id"
            });
        }
        return res.status(200).json({
            succes: true,
            data: deleted.product
        })
    } catch (err) {
        res.status(500).json({
            succes: false,
            err: err.message
        });
    }
}










/* else {
    const itemIndex = await card.products.findIndex(product =>)
    const productIndex = await cart.products.findIndex(product => product.productId == productId);
    const sizeIndex = await cart.products[productIndex].sizes.findIndex(size => size.size == sizes[0].size)
    if (productIndex > -1 && sizeIndex > -1) {
        //se ce la taglia
        console.log(sizes[0].size)

         if (sizeIndex > -1) {
cart.products[productIndex].sizes[sizeIndex].quantity = sizes[0].quantity
/}
  else
      //se non c'è la taglia
      cart.products[productIndex].sizes.push({
          size: sizes[0].size,
          quantity: sizes[0].quantity
      });
cart = await cart.save();
return res.status(200).json({
    succes: true,
    data: cart,
});
    } */