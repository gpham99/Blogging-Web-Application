import Blogs from "../models/blogModel.js";

const blogCtrl = {
    createBlog: async (req, res) => {
        console.log(req.user, req.body);
        if (!req.user)
            return res.status(400).json({ msg: "Invalid Authentication." });
        try {
            const { title, content, description, thumbnail } = req.body;

            const newBlog = new Blogs({
                user: req.user._id,
                title: title.toLowerCase(),
                content,
                description,
                thumbnail,
            });

            await newBlog.save();
            res.json({ newBlog });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    getHomeBlogs: async (req, res) => {
        try {
            const blogs = await Blogs.aggregate([
                // User
                {
                    $lookup: {
                        from: "users",
                        let: { user_id: "$user" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$_id", "$$user_id"],
                                    },
                                },
                            },
                            {
                                $project: {
                                    password: 0,
                                },
                            },
                        ],
                        as: "user",
                    },
                },

                // array -> object
                { $unwind: "$user" },
                { $sort: { createdAt: -1 } },
            ]);
            res.json(blogs);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
};

export default blogCtrl;
