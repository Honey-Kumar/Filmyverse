import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { database } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Cards from "./cards";
// import Reviews from './Reviews'

const Detail = () => {
  const { id } = useParams();
  const [title, settitle] = useState();
  const [year, setyear] = useState();
  const [description, setdescription] = useState();
  const [image, setimage] = useState();
  const [rating, setrating] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(database, "movies", id);
      const _data = await getDoc(_doc);
      console.log(_data.data());
      setimage(_data.data().Poster);
      settitle(_data.data().Title);
      setdescription(_data.data().About);
      setrating(_data.data().Rating);
      setyear(_data.data().Year);
      setLoading(false);
    }
    getData();
  }, [id]);

  console.log(title)

  return (
    <>
      <Header />
      <div className="p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
        {loading ? (
          <div className="h-96 flex w-full justify-center items-center">
            <ThreeDots height={30} color="white" />
          </div>
        ) : (
          <>
            <img
              className="h-96 block md:sticky top-24"
              alt={title}
              src={image}
            />

            <div className="md:ml-4 ml-0 w-full md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-400">
                {title} <span className="text-xl">({year})</span>
              </h1>

              <ReactStars
                size={20}
                half={true}
                value={rating}
                edit={false}
              />

              <p className="mt-2 pb-5">{description}</p>

              <div className="flex justify-center m-t-6 border-y-2">
                <Button className="flex">
                  <Link to={`/payment/${id}`}>Book Ticket</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex justify-center border-b-2">
        <span className="text-red-500 text-6xl hover:scale-2.5">
          Similar <span className="text-white text-6xl">Movies</span>
        </span>
      </div>
      <Cards />
      <Footer />
    </>
  );
};

export default Detail;











