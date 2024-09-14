import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import Footer from "./Footer";
import Navbar from "./Navbar";
import UserImage from '../assets/user.jpeg'
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { database } from "../firebase/firebase";

const UserProfile = () => {
    const [userdetails, setuserdetails] = useState({
        Id: '',
        Name: '',
        Email: '',
        Address: '',
        City: '',
        Country: '',
        Plan: '',
        Status: '',
        Period: ''
    });
    const activeuser = useSelector(state => state.User);
    console.log('active user is ', activeuser);

    useEffect(() => {
        setuserdetails({
            Id: activeuser.uid,
            Name: activeuser.name,
            Email: activeuser.email,
            Address: '',
            City: '',
            Country: '',
            Plan: '',
            Status: '',
            Period: ''
        });
    }, [activeuser]);

    const [edit, setedit] = useState(false);
    const handleedit = () => {
        edit ? setedit(false) : setedit(true);
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setuserdetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const handleSave = async () => {

        try {
            const updatedData = {
                Name: userdetails.Name || "",
                Email: userdetails.Email || "",
                Address: userdetails.Address || "",
                City: userdetails.City || "",
                Country: userdetails.Country || "",
                Plan: userdetails.Plan || "",
                Status: userdetails.Status || "",
                Period: userdetails.Period || ""
            };

            const userDocRef = doc(database, "Users", activeuser.uid);
            const result = await updateDoc(userDocRef, updatedData);
            console.log(result);
            alert("User details updated successfully!");
            setedit(false);
        } catch (error) {
            console.error("Error updating user details:", error);
            alert("Failed to update user details.");
        }
    }

    return (
        <>
            <Navbar />
            <div className="w-auto rounded bg-slate-600 p-5 max-sm:p-2 mb-10 mt-10 ml-5 mr-5 flex flex-col flex-wrap max-sm:flex-col items-center justify-center">
                <h1 className="text-5xl max-sm:text-2xl font-bold pb-3 pr-8">User Details</h1>
                <img
                    className="rounded-full w-56 h-56"
                    src={UserImage}
                    alt="User Profile"
                />
                <ul className="relative flex justify-between flex-col max-sm:justify-center w-1/2 max-sm:w-full max-md:w-full text-xl font-bold pt-5 border-2 m-4 p-4 max-sm:m-0 max-md:m-0 rounded-xl ">
                    <div className="text-pretty truncate">
                        <li className="flex justify-between">
                            <span className="text-red-600">UserId</span>
                            <span>{`${userdetails.Id}`}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-red-600">Name</span>
                            {
                                edit ? <input type="text" name="Name" className="text-black border-0 focus:outline-none w-1/2 rounded-lg m-2 p-1" value={userdetails.Name} onChange={handleInputChange} /> : <span>{`${userdetails.Name}`}</span>
                            }
                        </li>
                        <li className="flex justify-between">
                            <span className="text-red-600">Email</span>{" "}
                            {
                                edit ? <input type="text" name="Email" className="text-black border-0 focus:outline-none w-1/2 rounded-lg m-2 p-1" value={userdetails.Email} onChange={handleInputChange} /> : <span>{`${userdetails.Email}`}</span>
                            }                        </li>
                        <li className="flex justify-between">
                            <span className="text-red-600">Address</span>{" "}
                            {
                                edit ? <input type="text" name="Address" className="text-black border-0 focus:outline-none w-1/2 rounded-lg m-2 p-1" value={userdetails.Address} onChange={handleInputChange} /> : <span>{`${userdetails.Address}`}</span>
                            }                        </li>
                        <li className="flex justify-between">
                            <span className="text-red-600">City</span>{" "}
                            {
                                edit ? <input type="text" name="City" className="text-black border-0 focus:outline-none w-1/2 rounded-lg m-2 p-1" value={userdetails.City} onChange={handleInputChange} /> : <span>{`${userdetails.City}`}</span>
                            }                        </li>
                    </div>
                    <div>
                        <li className="flex justify-between">
                            <span className="text-red-600">Country</span>{" "}
                            {
                                edit ? <input type="text" name="Country" className="text-black border-0 focus:outline-none w-1/2 rounded-lg m-2 p-1" value={userdetails.Country} onChange={handleInputChange} /> : <span>{`${userdetails.Country}`}</span>
                            }                        </li>
                        <li className="flex justify-between">
                            <span className="text-red-600">Plan</span>{" "}
                            {
                                edit ? <select className="text-black border-0 focus:outline-none w-50 rounded-lg m-2 p-1 w-1/2" name="Plan" value={userdetails.Plan} onChange={handleInputChange}>
                                    <option>199</option>
                                    <option>299</option>
                                    <option>499</option>
                                    <option>999</option>
                                </select> : <span>{`${userdetails.Plan}`}</span>
                            }                        </li>
                        <li className="flex justify-between">
                            <span className="text-red-600">Status</span>{" "}
                            <span>{`${userdetails.Status}`}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-red-600">Subscription Period </span>
                            {
                                edit ? <input type="date" name="Period" className="text-black border-0 focus:outline-none w-1/2 rounded-lg m-2 p-1" value={userdetails.Period} onChange={handleInputChange} /> : <span>{`${userdetails.Period}`}</span>
                            }                        </li>
                    </div>
                    <span className="absolute -right-4 -top-4 text-red-500 p-4 bg-blue-500 opacity-70 rounded-lg " onClick={handleedit}><FaPencilAlt size={30} /></span>
                    <button className={`${!edit && `hidden`} bg-lime-900 p-2 rounded-lg w-1/2 mx-auto mt-4`} onClick={handleSave}>Save</button>
                </ul>
            </div >
            <Footer />
        </>
    );
};

export default UserProfile;
