// import React, { useEffect, useState } from "react";
// import ReactStars from "react-stars";
// import { useParams } from "react-router-dom";
// import { database } from "../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { ThreeDots } from "react-loader-spinner";
// import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";
// import Cards from "./cards";
// import { useCallback } from "react";
// import useRazorpay from "react-razorpay";
// import { ToastContainer, toast } from 'react-toastify'
// <script src="https://checkout.razorpay.com/v1/checkout.js"></script>


// const Payment = () => {
//   const { id } = useParams();
//   const [title, settitle] = useState();
//   const [year, setyear] = useState();
//   const [description, setdescription] = useState();
//   const [image, setimage] = useState();
//   const [rating, setrating] = useState();

//   const [loading, setLoading] = useState(false);

//   // Razorpay integration

//   const action = (() => {
//     console.log("Buy Now")



//   const initializeRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";

//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };

//       document.body.appendChild(script);
//     });
//   };

//   //
//   const options = {
//     "key": 'rzp_test_yatp0pCPIUkHEI',
//     "amount": 1200,
//     "currency": 'INR',
//     "name": "filmyverse.com",
//     "description": "Deals in Ecommerce and Shopy goodies",
//     "image": '' ,
//     "order_id": id,
//     "handler": function (response) {
//       toast(response.razorpay_payment_id);
//       toast(response.razorpay_order_id);
//       toast(response.razorpay_signature);
//     },
//     "prefill": {
//       "name": '',
//       "email": ''
//     }
//   }
//   initializeRazorpay()
//   const rzp = new window.Razorpay(options)
//   rzp.open()

// })


// useEffect(() => {
//   async function getData() {
//     setLoading(true);
//     const _doc = doc(database, "movies", id);
//     const _data = await getDoc(_doc);
//     console.log(_data.data());
//     setimage(_data.data().Poster);
//     settitle(_data.data().Title);
//     setdescription(_data.data().About);
//     setrating(_data.data().Rating);
//     setyear(_data.data().Year);
//     setLoading(false);
//   }
//   getData();
// }, [id]);

// console.log(title)

// return (
//   <>
//     <Header />
//     <div className="p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
//       {loading ? (
//         <div className="h-96 flex w-full justify-center items-center">
//           <ThreeDots height={30} color="white" />
//         </div>
//       ) : (
//         <>
//           <img
//             className="h-96 block md:sticky top-24"
//             alt={title}
//             src={image}
//           />

//           <div className="md:ml-4 ml-0 w-full md:w-1/2">
//             <h1 className="text-3xl font-bold text-gray-400">
//               {title} <span className="text-xl">({year})</span>
//             </h1>

//             <ReactStars
//               size={20}
//               half={true}
//               value={rating}
//               edit={false}
//             />

//             <p className="mt-2 pb-5">{description}</p>

//             <div className="flex justify-center m-t-6 border-y-2">
//               <Button className="flex" onClick={action}>
//                 <Link to={`/payment/${id}`}>Pay Now</Link>
//               </Button>
//             </div>
//             <div className="flex justify-center p-20">
//               <h1 className="text-3xl font-bold text-gray-400 m-20">
//                 Powered by <span className="text-xl text-red-400">filmyverse movies</span>
//               </h1>
//             </div>
//           </div>
//         </>
//       )}
//     </div>

//     <Footer />
//   </>
// );
// };

// export default Payment;



import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useNavigate, useParams } from "react-router-dom";
import { collectionSubscription, database } from "../firebase/firebase";
import { addDoc, doc, getDoc } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import { Button } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useCallback } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { PaymentSlicerAction } from "../store/PaymentSlicer";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeuser = useSelector(state => state.User);
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setprice] = useState('');
  const [loading, setLoading] = useState(false);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const loaded = await initializeRazorpay();
    if (!loaded) {
      toast.error("Failed to load Razorpay script");
      return;
    }

    const options = {
      key: 'rzp_test_yatp0pCPIUkHEI',
      amount: Number(price),
      currency: 'INR',
      name: 'filmyverse.com',
      description: 'Movie Tickets Booking Platform',
      image: '',
      order_id: '',
      handler: async function (response) {
        console.log('Response is ', response);
        const newreceipt = await addDoc(collectionSubscription, {
          UserId: activeuser.uid,
          Date: new Date().toLocaleString('en-GB', {
            timeZone: 'Asia/Kolkata',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }).replace(/(\d+)(st|nd|rd|th)/, '$1') + ' UTC+5:30',
          Method: '',
          Amount: Number(price),
          RefrenceNumber: response.razorpay_payment_id
        });
        console.log(newreceipt);
        dispatch(PaymentSlicerAction.savereceipt({
          refrencenumber: response.razorpay_payment_id,
          amount: Number(price),
          status: '',
          method: '',
          datetime: new Date().toLocaleString('en-GB', {
            timeZone: 'Asia/Kolkata',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }).replace(/(\d+)(st|nd|rd|th)/, '$1') + ' UTC+5:30'
        }));
        toast.success("Payment Successful! with Payment ID", response.razorpay_payment_id);
        navigate('/payment/success');
      },
      prefill: {
        name: activeuser.uid,
        email: activeuser.email
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const _doc = doc(database, "movies", id);
        const _data = await getDoc(_doc);
        const data = _data.data();
        if (data) {
          setImage(data.Poster);
          setTitle(data.Title);
          setDescription(data.About);
          setRating(data.Rating);
          setYear(data.Year);
          setprice(data.Price)
        }
      } catch (error) {
        toast.error("Failed to fetch movie data", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

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
              <p className="mt-2 pb-5">₹{price}</p>

              <div className="flex justify-center mt-6 border-y-2">
                <Button className="flex" onClick={handlePayment}>
                  Pay Now ₹{price}
                </Button>
              </div>
              <div className="flex justify-center p-20">
                <h1 className="text-3xl font-bold text-gray-400 m-20">
                  Powered by <span className="text-xl text-red-400">filmyverse movies</span>
                </h1>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
};

export default Payment;

