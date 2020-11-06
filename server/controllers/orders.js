const pool = require('../config/database');
const { queryPromise } = require('../utils/mysql-promise-wrapper');


/**
 * @desc get user orders
 * @route get /api/orders/:userId
 * @acces private
 */
exports.getUserOrders = async (req, res) => {
    const { userId } = req.userData;

    const sql = `CALL order_details(?)`
    try {
        const results = await queryPromise(pool, sql, userId);
        console.log(results[0][0].orders);
        /*  if (!results[0]) {
                 return res.status(404).json({
                     success: false,
                     error: "No orders found by given id"
                 });
             }
             else { */
        const parsed = JSON.parse(results[0][0].orders);
        console.log('parsed', parsed)
        return res.status(200).json({
            success: true,
            data: parsed
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error
        });
    }
}

exports.getPendingOrders = async (req, res) => {

    const { status } = req.query;
    const sql = "SELECT * FROM orders WHERE orders.status = ?";
    try {
        const result = await queryPromise(pool, sql, status);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        });
    }
}

exports.postOrder = async (id) => {
    console.log("chiamata");
    const sql = `UPDATE orders SET status='pending' WHERE user_id = ?`;

    try {
        const result = await queryPromise(pool, sql, id);
        console.log(result);
        return result;
        /* return res.status(200).json({
            success: true,
            data: result
        }); */
    } catch (error) {
        console.log(error);
        /*  res.status(500).json({
             success: false,
             error
         }); */
    }

}

exports.manageOrder = async (req, res) => {
    const { id } = req.params
    const sql = `UPDATE orders SET ? WHERE id= ?`;
    try {
        const result = await queryPromise(pool, sql, [req.body, id]);

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}
exports.deleteOrder = async (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM orders WHERE orders.id = ?`
    await queryPromise(pool, sql, id).catch(error => {
        return res.status(500).json({
            success: false,
            error
        })
    })
    return res.status(200).json({
        success: true,
        data: id
    })
}