import React, { useState, useNavigate, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import sweetalert from "sweetalert";
import { addDoc } from "firebase/firestore";
import { collectionmovies } from "../firebase/firebase";

const Addform = () => {
  const [loading, setloading] = useState(false);
  // const navigate = useNavigate();
  let [data, setdata] = useState({
    Title: " ",
    Movie: " ",
    Rating: " ",
    Year: " ",
    Poster: " ",
    About: " ",
    Price: " "
  });

  const dataget = async () => {
    setloading(true);
    try {
      await addDoc(collectionmovies, data);
      setdata({
        Title: " ",
        Movie: " ",
        Rating: " ",
        Year: " ",
        Poster: " ",
        About: " ",
        Price: " "
      });
      sweetalert({
        title: "Successful",
        icon: "success",
        message: "Congratulations! Movie Added Successfully",
      });
    } catch (error) {
      sweetalert({
        title: error,
        icon: "fail",
        message: "Opps! Something wents wrong",
      });
    }
    setloading(false);
  };
  return (
    <>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-4xl font-medium title-font mb-4 text-blue-600">
              Add Movies
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base border-b-2 p-2">
              Add Your Favourite Movies Now!
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={data.Title}
                    onChange={(e) =>
                      setdata({ ...data, Title: e.target.value })
                    }
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-white">
                    Movie
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.Movie}
                    onChange={(e) =>
                      setdata({ ...data, Movie: e.target.value })
                    }
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-white">
                    Rating
                  </label>
                  <input
                    min={1}
                    max={5}
                    type="number"
                    id="name"
                    name="name"
                    value={data.Rating}
                    onChange={(e) =>
                      setdata({ ...data, Rating: e.target.value })
                    }
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-white">
                    Year
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={data.Year}
                    onChange={(e) => setdata({ ...data, Year: e.target.value })}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-white">
                    Poster
                  </label>
                  <input
                    type="url"
                    id="name"
                    name="name"
                    value={data.Poster}
                    onChange={(e) =>
                      setdata({ ...data, Poster: e.target.value })
                    }
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-white">
                    Ticket Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={data.Price}
                    onChange={(e) =>
                      setdata({ ...data, Price: e.target.value })
                    }
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-white">
                    About Movie
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={data.About}
                    onChange={(e) =>
                      setdata({ ...data, About: e.target.value })
                    }
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-500 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={dataget}
                  class="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  {loading == true ? <ColorRing height={25} /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Addform;
