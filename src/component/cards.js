import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getDocs } from "firebase/firestore";
import { collectionmovies } from "../firebase/firebase";
import { ThreeDots } from "react-loader-spinner";
import sweetalert from "sweetalert";

const Cards = () => {
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    let getingdoc = async () => {
      setloader(true);
      try {
        const newdata = await getDocs(collectionmovies);
        const fetchedData = [];
        newdata.forEach((doc) => {
          // setdata((prv) => [...prv, { ...doc.data(), id: doc.id }]);
          // console.log(doc.id);
          if (!fetchedData.find(item => item.id === doc.id)) {
            fetchedData.push({ ...doc.data(), id: doc.id });
          }
        });
        setdata(fetchedData);
        sweetalert({
          title: "Loading Successfull",
          icon: "success",
        });
        console.log(newdata);
      } catch (error) {
        sweetalert({
          title: error,
          icon: "failed",
        });
      }
      setloader(false);
    };
    getingdoc();
  }, []);
  return (
    <>
      <div className=" p-5 flex flex-wrap items-center justify-around m-5">
        {loader === true ? (
          <div className="w-full h-full flex items-center justify-center">
            <ThreeDots />
          </div>
        ) : (
          data.map((e, index) => {
            return (
              <Link to={`/detail/${e.id}`}>
                <div
                  key={index}
                  className="card text-flex-start hover:translate-y-1 m-2 shadow-white transition-all ease-in-out"
                >
                  <img
                    className="w-auto h-72 md:h-45 md:w-auto flex m-auto shadow-white"
                    src={e.Poster}
                    alt="Little Mermade"
                  />
                  <div className="m-auto p-1">
                    <div className="text-xl p-t-5">
                      <span className="text-blue-500">Name: </span>
                      {e.Title}
                    </div>
                    <div className="text-xl p-t-5 flex flex-center">
                      <span className="text-blue-500">Rating:</span>
                      <ReactStars value={e.Rating} edit={false} size={18} />
                    </div>
                    <div className="text-xl p-t-5">
                      <span className=" text-blue-500">Movie: </span>
                      {e.Movie}
                    </div>
                    <div className="text-xl p-t-5 m-b-4">
                      <span className="text-blue-500">Year: </span>
                      {e.Year}
                    </div>
                    <div className="text-xl p-t-5 m-b-4">
                      <span className="text-blue-500">Ticket: </span>
                      ₹{e.Price}
                    </div>
                    <div className="flex justify-center m-t-5 border-y-2">
                      <Button className="flex">
                        <Link to={`/payment`}>Book Ticket</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Cards;
