import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRender from "./PageRender";
import Header from "./components/global/Header";
import { Alert } from "./components/alert/Alert";
import { refreshToken } from "./redux/actions/authAction";
import { useDispatch } from "react-redux";
import { getHomeBlogs } from "./redux/actions/blogAction";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshToken());
        // dispatch(getHomeBlogs());
    }, [dispatch]);

    return (
        <div className="container">
            <Router>
                <Alert></Alert>
                <Header></Header>
                <Routes>
                    <Route exact path="/" element={<PageRender></PageRender>} />
                    <Route
                        exact
                        path="/:page"
                        element={<PageRender></PageRender>}
                    />
                    <Route
                        exact
                        path="/:page/:slug"
                        element={<PageRender></PageRender>}
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
