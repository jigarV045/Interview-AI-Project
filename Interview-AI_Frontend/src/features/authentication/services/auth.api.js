import axios from "axios";
import { useNavigate } from "react-router";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
})

export async function register({username, email, password}) {
    try {
        const res =await api.post("/api/auth/register", {
            username, email, password
        })
        if (!res.data) {
            navigate("/register")
        }
        return res.data;
    } catch (error) {
        alert("Failed to register");
        console.error("Failed to register");
    }
}

export async function login ({email, password}) {
    try {
        const res = await api.post("/api/auth/login", {
            email, password
        })

        if (!res.data) {
            navigate("/login")
        }

        return res.data;
    } catch (error) {
        alert("Invalid Credentials")
        console.error("Failed to login");
    }
}

export async function logout() {
    try {
        const res = await api.get("/api/auth/logout");

        return res.data;
    } catch (error) {
        alert("Failed to Logout")
        console.error("Failed to Logout");
    }
}

export async function getMe() {
    try {
        const res = await api.get("/api/auth/get-me");
        return res.data;
    } catch (error) {
        console.error("Failed to Fetch details");
        
    }
}