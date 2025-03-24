import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
    const {user, updateUser, clearUaer } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect (() => {
        if (user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info", error);
                if (isMounted) {
                    clearUaer();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        };
    }, [updateUser, clearUaer, navigate] );
};