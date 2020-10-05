const Order = require('../models/order');
const pool = require('../config/database');
const { queryPromise } = require('../utils/mysql-promise-wrapper');


/**
 * @desc get user orders
 * @route get /api/orders/:userId
 * @acces private
 */
exports.getUserOrders = async (req, res) => {
    const { id } = req.params;
    /*     try {
            
            console.log(id);
    
            const orders = await Order.find({ userId: id }).sort({ createdAt: "desc" });
    
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
        } */
    const toBeSelected = "orders.id, orders.status, orders.create_time,order_items.size, products.id, products.name, products.brand, products.collection, products.price, products.image_url"
    const sql = `SELECT ${toBeSelected}
    FROM orders 
    RIGHT JOIN order_items 
        ON orders.id = order_items.order_id
    LEFT JOIN products
        ON order_items.product_id = products.id
    WHERE orders.status != 'cart' AND orders.user_id = ${pool.escape(id)} `;
    console.log(sql);

    const results = await queryPromise(pool, sql);

    if (results.lenght == 0) {
        return res.status(404).json({
            success: false,
            error: "No orders found by given id"
        });
    }
    else return res.status(200).json({
        success: true,
        data: results
    });
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