import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add from "./component/add";
import Homepage from "./component/Homepage";
import Payment from "./component/payment";
import Moviedetails from "./component/Moviedetails";
import Signupform from "./component/Signup";
import Loginforms from "./component/Loginform";
import UserProfile from "./component/Profile";
import Frontpage from "./component/Frontpage";
import ForoFor from "./component/Forfor";
import Kids from "./component/kids";
import Movies from "./component/Specialmovies";
import Search from "./component/Search";
import TvShows from "./component/TvShows";
import MovieInfomation from "./component/Movieinformation";
import MyList from "./component/Mylist";
import SignUp from "./component/SignupPage";
import Login from "./component/LoginPage";
import PaymentsuccessPage from "./component/PaymentsuccessPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/mymovies" element={<Homepage />} />
          <Route path="/add" element={<Add />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/detail/:id" element={<Moviedetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Loginforms />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/*" element={<ForoFor />} />
          <Route path="/kids" element={<Kids />} />
          <Route extact path="/movies" element={<Movies />} />
          <Route extact path="/search" element={<Search />} />
          <Route extact path="/tv" element={<TvShows />} /> <Route
            extact
            path="/movieinformation/:id"
            element={<MovieInfomation />}
          />
          <Route extact path="/mylist" element={<MyList />} />
          <Route extact path="/payment/success" element={<PaymentsuccessPage />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
