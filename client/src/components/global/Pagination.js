import React, { useState, useEffect } from "react";
import MaterialPagination from "@mui/material/Pagination";
import { useNavigate, useLocation } from "react-router-dom";

const Pagination = ({ total, callback }) => {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();

    const handlePagination = (e, num) => {
        navigate(`?page=${num}`);
        callback(num);
    };

    useEffect(() => {
        const num = location.search.slice(6) || 1;
        // console.log("slice la gi: ", location.search.slice(6));
        setPage(Number(num));
    }, [location.search]);

    return (
        <div>
            <MaterialPagination
                count={total}
                color="primary"
                page={page}
                onChange={handlePagination}
            />
        </div>
    );
};

export default Pagination;
