import Blogs from "../models/blogModel.js";

const Pagination = (req) => {
    let page = Number(req.query.page) * 1 || 1;
    let limit = Number(req.query.limit) * 1 || 6;
    let skip = (page - 1) * limit;

    return { page, limit, skip };
};

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
        const { limit, skip } = Pagination(req);
        try {
            const Data = await Blogs.aggregate([
                {
                    $facet: {
                        totalData: [
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
                                        { $project: { password: 0 } },
                                    ],
                                    as: "user",
                                },
                            },
                            // array -> object
                            { $unwind: "$user" },
                            // Sorting
                            { $sort: { createdAt: -1 } },
                            { $skip: skip },
                            { $limit: limit },
                        ],
                        totalCount: [
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
                                        { $project: { password: 0 } },
                                    ],
                                    as: "user",
                                },
                            },
                            { $count: "count" },
                        ],
                    },
                },
                {
                    $project: {
                        count: { $arrayElemAt: ["$totalCount.count", 0] },
                        totalData: 1,
                    },
                },
            ]);

            const blogs = Data[0].totalData;
            const count = Data[0].count;

            // Pagination
            let total = 0;
            if (count % limit === 0) {
                total = count / limit;
            } else {
                total = Math.floor(count / limit) + 1;
            }

            res.json({ blogs, total });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
};

export default blogCtrl;
