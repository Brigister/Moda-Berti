const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

/**
 * @desc signup
 * @route POST /api/auth/signup
 * @acces Public 
 */
exports.signup = async (req, res, next) => {
    const { email, password, name, surname } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(409).json({
                success: false,
                error: 'Email already exists in our Database'
            })
        }
        else {
            const hash = await bcrypt.hash(password, 10);
            const userData = {
                email: email,
                password: hash,
                name: name,
                surname: surname
            }
            const newUser = await User.create(userData);

            return res.status(200).json({
                success: true,
                data: newUser
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        })
    }
}

/**
 * 
 * @desc Login an user
 * @route Post /api/auth/login
 * @acces Public 
 */
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "No user found"
            });
        }
        else {
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({
                    success: false,
                    error: "Wrong data"
                })
            }
            else {
                const payload = {
                    id: user._id,
                    isAdmin: user.isAdmin
                };

                const token = await jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                })

                return res.status(200).json({
                    success: true,
                    token: token
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        })
    }
}

/**
 * 
 * @desc Edit user password
 * @route Patch /api/auth/editPassword
 * @acces Private 
 */
exports.editPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { password, newPassword } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "No user found"
            });
        }
        else {
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({
                    success: false,
                    error: "Wrong password"
                })
            }
            else {
                const hash = await bcrypt.hash(newPassword, 10);

                await User.update({ password: hash });

                return res.status(200).json({
                    success: true,
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        })
    }
}