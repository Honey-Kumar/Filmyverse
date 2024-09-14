import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { Authentication } from "../firebase/firebase";
import swal from "sweetalert";
import {
    FaUser,
    FaBell,
    FaSearch,
    FaGifts,
    FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoPersonAdd } from "react-icons/io5";
import { UserActions } from "../store/UserSlicer";


const Navbar = () => {
    const activeuser = useSelector(state => state.User);
    const dispatch = useDispatch();
    //console.log('in navbar active user ', activeuser);
    const [navshow, setnavshow] = useState(false);
    //logout function
    const handlelogout = () => {
        dispatch(UserActions.cleardata());
        signOut(Authentication)
            .then(() => {
                navigate("/login");
                swal({
                    title: "Sign Out Successfull",
                    text: "You Have Sign Out From Filmyverse",
                    icon: "success",
                });
            })
            .catch((e) => {
                swal({
                    title: "Error Occured !",
                    text: e,
                    icon: "failed",
                });
            });
    }


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 100) {
                navshow === true ? setnavshow(false) : setnavshow(true);
            } else {
                setnavshow(false);
            }
        });
    }, []);
    const navigate = useNavigate();
    const Linklist = [
        { name: "Home", anchor: "/" },
        { name: "TV Shows", anchor: "/tv" },
        { name: "Movies", anchor: "/movies" },
        { name: "Latest", anchor: "/" },
        { name: "My List", anchor: "/mymovies" },
    ];
    const iconlist = [
        { icon: <FaUser className="text-xl text-red-600" />, link: "/profile" },
        {
            icon: <FaSearch className="text-xl" />,
            link: "/search",
        },
        { icon: "KIDS", link: "/kids" },
        { icon: "DVD", link: "" },
        { icon: <FaGifts className="text-xl" />, link: "/offers" },
        { icon: <FaBell className="text-xl" />, link: " " },
        {
            icon: activeuser.uid === '' ? (
                <IoPersonAdd className="text-xl" />
            ) : (
                <FaSignOutAlt
                    onClick={handlelogout}
                    className="text-xl text-red-600"
                />
            ),
            link: activeuser.uid === '' ? "/signup" : "",
        },
    ];

    return (
        <div
            className={`z-10 flex max-sm:flex-col max-lg:flex-col max-sm:bg-black max-md:flex-col justify-between max-sm:justify-center items-center pl-2 pr-8 pt-4 sticky ${navshow === true ? `bg-slate-900` : ""
                }`}
        >
            <div className="flex max-sm:flex-col max-md:flex-col max-lg:flex-col">
                <Link to="/" className="max-sm:text-center max-md:text-center max-lg:text-center">
                    <span className="text-red-500 text-4xl hover:scale-2.5 m-8 pb-2">
                        Filmy <span className="text-white text-4xl">Verse</span>
                    </span>
                </Link>
                <div className="flex items-center max-sm:justify-between pl-0">
                    <ul className="flex gap-4 text-l font-bold flex-wrap">
                        {Linklist.map(({ name, anchor, index }) => {
                            return (
                                <li key={index}>
                                    <Link to={anchor}>{name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div>
                <ul className="flex gap-4 items-center text-l font-bold flex-wrap">
                    {iconlist.map(({ icon, link, key }) => {
                        return (
                            <li>
                                <Link key={key} to={link}>{icon}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
export default Navbar;
