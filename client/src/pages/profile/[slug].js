import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OtherInfo from "../../components/profile/OtherInfo";
import UserBlogs from "../../components/profile/UserBlogs";
import UserInfo from "../../components/profile/UserInfo";

const Profile = () => {
    const { slug } = useParams();
    const { auth } = useSelector((state) => state);

    return (
        <div>
            <h2>Profile</h2>
            <div>
                {auth.user?._id === slug ? (
                    <UserInfo></UserInfo>
                ) : (
                    <OtherInfo></OtherInfo>
                )}
            </div>

            <div>
                <UserBlogs></UserBlogs>
            </div>
        </div>
    );
};

export default Profile;
