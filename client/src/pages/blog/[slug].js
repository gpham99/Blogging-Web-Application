import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAPI } from "../../utils/FetchData";
import Loading from "../../components/global/Loading";
import { showErrMsg } from "../../components/alert/Alert";
import DisplayBlog from "../../components/blog/DisplayBlog";

const DetailBlog = () => {
    const id = useParams().slug;
    const [blog, setBlog] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getAPI(`blog/${id}`)
            .then((res) => {
                setBlog(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response.data.msg);
                setLoading(false);
            });

        return () => setBlog(undefined);
    }, [id]);

    if (loading) return <Loading></Loading>;
    return (
        <div>
            {error && showErrMsg(error)}

            {blog && <DisplayBlog blog={blog}></DisplayBlog>}
        </div>
    );
};

export default DetailBlog;
