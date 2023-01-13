import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token)
            return res.status(400).json({ msg: "Invalid authentication." });

        const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        if (!decoded)
            return res.status(400).json({ msg: "Invalid authentication." });

        const user = await Users.findOne({ _id: decoded.id });
        if (!user) return res.status(400).json({ msg: "User does not exist." });
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export default auth;
