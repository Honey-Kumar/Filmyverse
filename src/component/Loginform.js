import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import swal from "sweetalert";
import { Authentication } from "../firebase/firebase";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { UserActions } from '../store/UserSlicer'


const Loginforms = () => {
    const dispatch = useDispatch();
    const [logindata, setlogindata] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const checklogin = async (event) => {
        event.preventDefault();
        const { email, password } = logindata;

        await signInWithEmailAndPassword(Authentication, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                console.log('User Id is ', user.uid);

                dispatch(UserActions.savedata({ uid: user.uid, email, password }));

                swal({
                    title: "Hurry ! Log In Successfull",
                    icon: "success",
                });
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                swal({
                    title: "User Not Found " + " " + errorCode,
                    text: "Needs To Sign Up",
                    icon: "error",
                });
            });
    };

    return (
        <>
            <Navbar />
            <div className="h-auto bg-slate-950 p-12 ">
                <div className="pb-12">
                    <h1 className="text-4xl font-bold">Sign In</h1>
                    <form className="flex flex-col gap-4 mt-6">
                        <input
                            type="email"
                            placeholder="Email or Phone Number"
                            className="w-full p-4 rounded bg-slate-900"
                            onChange={(e) => {
                                setlogindata({
                                    ...logindata,
                                    email: e.target.value,
                                });
                            }}
                        />
                        <input
                            type={`password`}
                            placeholder="Password"
                            className="w-full p-4 rounded bg-slate-900"
                            onChange={(e) => {
                                setlogindata({
                                    ...logindata,
                                    password: e.target.value,
                                });
                            }}
                        />
                        <button
                            onClick={checklogin}
                            className="pl-5 pr-5 mt-6 rounded h-12 max-sm:h-15 bg-red-600 font-bold "
                        >
                            Sign In
                        </button>
                    </form>
                    <ul className="flex justify-between m-3">
                        <li>
                            <input type="checkbox" id="remember" />
                            <label for="remember">Remember me</label>
                        </li>
                        <li>Need Help?</li>
                    </ul>
                </div>

                <div className="pb-10">
                    <div className="pb-5">
                        New to Filmyverse?{" "}
                        <Link to="/signup" className="font-bold">
                            Sign up now
                        </Link>
                        .
                    </div>
                    <span>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                        <Link to="" className="text-blue-600">
                            Learn more
                        </Link>
                        .
                    </span>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Loginforms;
