import Users from "../models/userModel.js";

const userCtrl = {
    updateUser: async (req, res) => {
        if (!req.user)
            return res.status(400).json({ msg: "Invalid Authentication" });

        try {
            const { avatar, name } = req.body;

            await Users.findOneAndUpdate(
                { _id: req.user._id },
                { avatar, name }
            );
            res.json({ msg: "Update Success!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

export default userCtrl;
