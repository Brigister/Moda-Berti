const Order = require('../models/order')


/**
 * @desc get user orders
 * @route get /api/orders/:userId
 * @acces private
 */
exports.getUserOrders = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const orders = await Order.find({ userId: id });
        /*  console.log(pippo); */

        if (!orders) {
            return res.status(404).json({
                success: false,
                data: "No order found"
            });
        }
        return res.status(200).json({
            success: true,
            data: orders
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            err: err.message
        });
    }
}

exports.postOrder = async (req, res) => {
    console.log(req.body)
    try {
        const order = await Order.create(req.body);

        return res.status(201).json({
            success: true,
            data: order
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params
        const toBeDeleted = await Order.findByIdAndDelete({ _id: id });

        if (!toBeDeleted) {
            return res.status(404).json({
                success: false,
                data: "No order by given id"
            })
        }
        return res.status(200).json({
            success: true,
            data: id
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            err: err.message
        })
    }
}