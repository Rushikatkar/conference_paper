import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import css from "./Login.module.css";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/users/login",
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Login response:", response.data); // Log the response for debugging

            const { data } = response.data; // Destructure the response

            if (!data) {
                throw new Error("Invalid response format");
            }

            const { accessToken, refreshToken, user } = data; // Access data from the response

            console.log("Access Token:", accessToken);
            console.log("Refresh Token:", refreshToken);
            console.log("User:", user);

            // Set cookies with appropriate options
            Cookies.set("accessToken", accessToken, { path: '/', secure: true, sameSite: 'strict' });
            Cookies.set("refreshToken", refreshToken, { path: '/', secure: true, sameSite: 'strict' });

            navigate("/viewpapers");
        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                setError("Invalid email, username, or password."); // Update error message
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    };


    return (
        <>
            <div>
                <form className={css.form} onSubmit={handleSubmit}>
                    <div className={css.leftcomp}>
                        <span className={css.signup}>Log In</span>
                        <input
                            type="email"
                            placeholder="Email address"
                            className={css.forminput}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={css.forminput}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className={css.forgot}>
                            <a href="#">Forgot Password?</a>
                        </span>
                        {error && <p className={css.error}>{error}</p>}
                        <button type="submit" className={css.formsubmit}>
                            Log In
                        </button>
                        <p className={css.signin}>
                            Already have an account? <a href="#">SignUp</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
