const User = require('../models/user');

/**
 * 
 * @desc Get all the users
 * @route GET /api/users
 * @acces Public 
 */
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(404).json({
                success: false,
                error: "No user found"
            });
        }
        else return res.status(200).json({
            success: true,
            data: users
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        })
    }
}

/**
 * 
 * @desc Get user by id
 * @route GET /api/users/:id
 * @acces Private 
 */
exports.getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "No user found"
            });
        }
        else return res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        })
    }
}

/**
 * 
 * @desc Delete user based on id
 * @route Delete /api/users/:id
 * @acces Private 
 */
exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        })
    }
}