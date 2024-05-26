import { useEffect, useState } from "react";
import auth from "../services/auth";
import { RegisterUser } from "../@types/types";

const Profile = () => {
    const userId = localStorage.getItem("user_id") ?? "no user id";
    const [user, setUser] = useState<RegisterUser>();

    useEffect(() => {
        auth
            .userDetails(userId)
            .then((res) => {
                setUser(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <div>
            <p>
                {user?.name.first}
            </p>
            <p>
                {user?.name.middle}
            </p>
            <p>
                {user?.name.last}
            </p>
            <p>
                {user?.email}
            </p>
            <p>
                {user?.phone}
            </p>
            <p>
                {user?.address.street}
            </p>
            <p>
                {user?.address.city}
            </p>
            <p>
                {user?.address.state}
            </p>
            <p>
                {user?.address.zipcode}
            </p>
            <p>
                {user?.address.country}
            </p>
        </div >
    );
};
export default Profile;