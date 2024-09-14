import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Cards from "./cards";
const Header = () => {
  return (
    <>
      <div className=" flex justify-between p-2.5 border-b-2 m-2.5 cursor-pointer">
        <Link to="/">
          <span className="text-red-500 text-4xl hover:scale-2.5">
            Filmy <span className="text-white text-4xl">Verse</span>
          </span>
        </Link>
        <div className="p-2">
          <span className="p-2">
            <Button>
              <Link to="/signup" className="text-red-500">
                {" "}
                Register <AddIcon />
              </Link>
            </Button>
          </span>
          <span className="p-2">
            <Button>
              <Link to="/login" className="text-red-500">
                {" "}
                Log in <AddIcon />
              </Link>
            </Button>
          </span>
          <span className="p-2">
            <Button>
              <Link to="/profile" className="text-red-500">
                {" "}
                Profile
              </Link>
            </Button>
          </span>
          <span className="p-2">
            <Button>
              <Link to="/add" className="text-red-500">
                {" "}
                Add New <AddIcon />
              </Link>
            </Button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
