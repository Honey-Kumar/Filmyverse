import React, { useState } from "react";
import axios from "axios";
import { API_KEY, API_URL, request } from "../store/Requestdata";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import swal from "sweetalert";
import ComboMovie from "./ComboMovie";
import MediaCard from "./MediaCard";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

const Search = () => {
    let [searchtext, setsearchtext] = useState("");
    let [searchdata, setsearchdata] = useState([]);
    let Search = async () => {
        const fetchdata = await axios.get(
            `${API_URL}${`/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${searchtext}&include_adult=false`}`
        );
        setdata(fetchdata);
    };
    const setdata = (getdata) => {
        try {
            if (getdata.data.results.length > 0) {
                setsearchdata(getdata.data.results);
                console.log(getdata);
                console.log(searchdata);
            } else {
                swal({
                    title: "No Result Found",
                    text: "No Search Result is Found in our Database",
                    icon: "error",
                });
            }
        } catch (error) {
            swal({
                title: "Error Occured",
                text: error,
                icon: "error",
            });
        }
    };
    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full flex flex-col p-5 gap-3 mt-4">
                <input
                    list="searchlist"
                    className="bg-slate-700 p-5"
                    type="text"
                    placeholder="Search your Favourite Movies"
                    value={searchtext}
                    onChange={(e) => {
                        setsearchtext(e.target.value);
                        console.log(searchtext);
                    }}
                />
                <datalist id="searchlist">
                    <option>Horror Movies</option>
                    <option>Romance</option>
                    <option>News</option>
                    <option>Animation</option>
                    <option>Actions Movie</option>
                    <option>Comedy</option>
                    <option>Drama</option>
                    <option>Mystery</option>
                    <option>Documentries</option>
                    <option>Trending</option>
                </datalist>
                <button
                    onClick={Search}
                    className="flex gap-1 items-center justify-center p-4 rounded bg-red-600 "
                >
                    Search <FaSearch />
                </button>

                <Container>
                    <h2 className="text-4xl max-sm:text-2xl font-bold">
                        {`${searchtext}`}
                    </h2>
                    <div className="flex gap-8 overflow-x-scroll rounded scroll-smooth pt-5 scrollable-div ">
                        {searchdata?.map((e) =>
                            e.backdrop_path || e.poster_path ? (
                                <Link to={`/movieinformation/${e.id}`}>
                                    <MediaCard
                                        poster_path={e.poster_path}
                                        backdrop_path={e.backdrop_path}
                                        name={e.name}
                                        original_name={e.original_name}
                                        title={e.title}
                                        overview={e.overview}
                                    />
                                </Link>
                            ) : (
                                ""
                            )
                        )}
                    </div>
                </Container>
                <ComboMovie
                    fetchurl={`${API_URL}${request.Trending}`}
                    heading="Trending Movies"
                />
                <ComboMovie
                    fetchurl={`${API_URL}${request.NetflixOriginal}`}
                    heading="Netflix Original Series"
                />
                <ComboMovie
                    fetchurl={`${API_URL}${request.Toprated}`}
                    heading="Top Rated Series"
                />
                <ComboMovie
                    fetchurl={`${API_URL}${request.TopActions}`}
                    heading="Action Movies "
                />
            </div>
            <Footer />
        </div>
    );
};

export const Container = styled.div`
  padding-top: 1rem;
  .image {
    width: 1500px;
    height: 300px;
  }
    /* Hide scrollbar */
  .scrollable-div {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollable-div::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`;
export default Search;
