import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    generateActiveToken,
    generateAccessToken,
    generateRefreshToken,
} from "../config/generateToken.js";
import sendEmail from "../config/sendMail.js";
import { validateEmail } from "../middleware/valid.js";

const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
    register: async (req, res) => {
        try {
            const { name, account, password } = req.body;

            const user = await Users.findOne({ account });

            if (user)
                return res.status(400).json({ msg: "Email already exists." });

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = { name, account, password: passwordHash };

            const active_token = generateActiveToken({ newUser });
            const url = `${CLIENT_URL}/active/${active_token}`;

            if (validateEmail(account)) {
                sendEmail(account, url, "Verify your email address.");
                return res.json({
                    msg: "Success! Please check your email address.",
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },

    activeAccount: async (req, res) => {
        try {
            const { active_token } = req.body;

            const decoded = jwt.verify(
                active_token,
                `${process.env.ACTIVE_TOKEN_SECRET}`
            );

            const { newUser } = decoded;

            if (!newUser) {
                return res.status(400).json({ msg: "Invalid authentication." });
            }

            const user = new Users(newUser);

            await user.save();

            res.json({ msg: "Account has been activated!" });
        } catch (err) {
            let errMsg;
            if (err.code === 11000) {
                errMsg = Object.keys(err.keyValue)[0] + " already exists";
            } else {
                console.log(err);
            }
            return res.status(500).json({ msg: errMsg });
        }
    },
    login: async (req, res) => {
        try {
            const { account, password } = req.body;

            const user = await Users.findOne({ account });

            if (!user)
                return res
                    .status(400)
                    .json({ msg: "This account does not exist." });

            // The line below is for when the user exists
            loginUser(user, password, res);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", {
                path: `/api/refresh_token`,
            });
            return res.json({ msg: "Logged out successfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    refreshToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            console.log(req.cookies);
            if (!rf_token) {
                return res.status(400).json({ msg: "Please log in." });
            }

            const decoded = jwt.verify(
                rf_token,
                `${process.env.REFRESH_TOKEN_SECRET}`
            );
            console.log(decoded);

            if (!decoded.id) {
                return res.status(400).json({ msg: "Please log in." });
            }

            const user = await Users.findById(decoded.id).select("-password");
            if (!user) {
                return res
                    .status(400)
                    .json({ msg: "This account does not exist." });
            }

            const access_token = generateAccessToken({ id: user._id });

            res.json({ access_token });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

const loginUser = async (user, password, res) => {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password" });
    }
    const access_token = generateAccessToken({ id: user._id });
    const refresh_token = generateRefreshToken({ id: user._id });

    // We have to clear the cookie later - it's like a k-v store
    res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000, // this is equivalent to 30 days
    });

    res.json({
        msg: "Login success",
        access_token,
        user: { ...user._doc, password: "" },
    });
};

export default authCtrl;
