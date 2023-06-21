import "./Order.css";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Aos from "aos";
import { auth } from "../../firebase-config";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  collection, query, where,
} from "firebase/firestore";
import { uid } from "uid";
import { db } from "../../firebase-config";
import { AiFillCloseCircle } from 'react-icons/ai'

import Terms from "../Terms/Terms";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { sendEmailNotification } from "./sendEmailNotification";


const Order = () => {
  const { state: item } = useLocation();
  const [user, loading] = useAuthState(auth);
  const [FromDate, setFromDate] = useState("");
  const [ReturnDate, setReturnDate] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  //check how many people on the group
  const [amount, setAmount] = useState(1);
  const [names, setNames] = useState([]);
  
  const [Reservations, setReservations] = useState([]);
  const [datePairs, setDatePairs] = useState([]);

  const FromDateRef = useRef(); 
  const ReturnDateRef = useRef(); 

  const [active, setActive] = useState("TermsBar");
  const showTerms = () => {
    setNumClicks(numClicks + 1);
    setActive("TermsBar activeTermsbar");
  };
  //function to remove addbar
  const removeTerms = () => {
    setNumClicks(0);
    setActive("TermsBar");
  };

  //function that get the mau
  const handleSelectChange = (event) => {
    const amount = parseInt(event.target.value);
    setAmount(amount);

    // Generate an array of names for the selected amount, minus one
    const newNames = Array.from({ length: amount - 1 }, (_, i) => names[i + 1] || '');
    
    // Keep the existing name for the first member
    const firstMemberName = names[0] || '';
    
    // Update the names state to include the generated names
    setNames([firstMemberName, ...newNames]);
  };

  const handleNameChange = (index, event) => {
    const newNames = [...names];
    newNames[index] = event.target.value;
    setNames(newNames);
  };


  const getUidForEmail = async (email) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    } else {
      const userDoc = querySnapshot.docs[0];
      return userDoc.id;
    }
  };
  
  const getUidsForNames = async (emails) => {
    const uids = [];
    for (const email of emails) {
      const uid = await getUidForEmail(email);
      if (uid) {
        uids.push(uid);
      } else {
        console.error("User with email ${email} not found.");
      }
    }
    return uids;
  };
  const uidlist = getUidsForNames(names);
  const [numClicks, setNumClicks] = useState(0);

  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }

  function handleCheckboxClick() {
    if (numClicks === 0) {
      showTerms();
    } else if (numClicks === 1) {
      removeTerms();
    }
  }

  useEffect(() => {  
    FromDateRef.current=FromDate;
    ReturnDateRef.current=ReturnDate;
    Aos.init({ duration: 4000 });
    fetchItems();



  }, [user,Reservations,FromDate,ReturnDate,item]);


  const fetchItems = async () => {
    console.log(item.uuid);
    const q = query(collection(db, "reservations"), 
                    where("Itemid", "==", item.uuid),
                    where("Status", "==", "Accept"));
    const data = await getDocs(q);
    const reservations = data.docs.map((doc) => doc.data());
    setReservations(reservations);
  
    const fetchedDatePairs = reservations.map((reservation) => ({
      fromDate: new Date(reservation.FromDate),
      returnDate: new Date(reservation.ReturnDate),
    }));
    setDatePairs(fetchedDatePairs);
    
  }
  

  let navigate = useNavigate();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const handleSubmit = async () => {
    if (isChecked === false) {
      alert("Please accept the terms and conditions");
      return;
    }
  
    const uids = await getUidsForNames(names);
    uids.unshift(user.uid); // Add the logged-in user's UID to the beginning of the list
  
    for (const userUid of uids) {
      const getuser = doc(db, "users", userUid);
      const data = await getDoc(getuser);
      var userData = data.data();
  
      const getitem = doc(db, "items", item.uuid);
  
      var itemWithoutreservations = Object.assign({}, item);
      delete itemWithoutreservations.reservations;
  
      var ruid = uid();
  
      await setDoc(doc(db, "reservations", ruid), {
        FirstName: userData.FirstName,
        LastName: userData.LastName,
        Userid: userUid,
        Itemid: item.uuid,
        FromDate: FromDateRef.current,
        ReturnDate: ReturnDateRef.current,
        Status: "Pending",
        timeStamp: serverTimestamp(),
      });
  
      await updateDoc(getitem, {
        reservations: [
          ...item.reservations,
          {
            FirstName: userData.FirstName,
            LastName: userData.LastName,
            ruid: ruid,
          },
        ],
      });
  
      await updateDoc(getuser, {
        reservations: [...userData.reservations, ruid],
      });
    }
    sendEmailNotification();
    await sleep(1000);
    navigate("/Myorders");
  };


  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  };
  

  const handleFromDateChange = (date) => {
    const timeZoneOffset = date.getTimezoneOffset() * 60000; // Time zone offset in milliseconds
    const adjustedDate = new Date(date.getTime() - timeZoneOffset); // Adjust the date to the local time zone
    const formattedDate = adjustedDate.toISOString().slice(0, 10);
    setFromDate(formattedDate);
  };

  const handleReturnDateChange = (date) => {
    const timeZoneOffset = date.getTimezoneOffset() * 60000; // Time zone offset in milliseconds
    const adjustedDate = new Date(date.getTime() - timeZoneOffset); // Adjust the date to the local time zone
    const formattedDate = adjustedDate.toISOString().slice(0, 10);
    setReturnDate(formattedDate);
  };


  const disabledDates = datePairs.flatMap(({ fromDate, returnDate }) =>
  getDatesInRange(fromDate, returnDate)
);


  return (
    <section id="main" className="main section container">
      <div className="secTitle">
        <h3 className="title">Order item now</h3>
      </div>

      <div className="secContent grid">
        <div className="imageDiv">
          <img src={item.ImageUrl} alt="" />
        </div>

        <div className="cardInfo">
          <h4 className="Title"> {item.ItemType}</h4>
          
          <br></br>
          <div className="Sirel">
            <p>Serial: {item.Serial}</p>
          </div>

          <div className="desc">
            <p>Description: {item.Description}</p>
            
          </div>
          <br></br>
          <div>
            <div>
              <form className="card-form">
                <div className="form-group ">
                  <div className="DepartInput">
                    <label htmlFor="date">From:</label>
                    <div className="input flex">
                    <DatePicker
                      selected={FromDate ? new Date(FromDate) : null}
                      onChange={handleFromDateChange}
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      placeholderText="Select a date"
                      excludeDates={disabledDates}

                    />
                    </div>
                  </div>
                </div>

                <div className="ReturnInput">
                  <label htmlFor="date">Return:</label>
                  <div className="input flex">
                <DatePicker
                  selected={ReturnDate ? new Date(ReturnDate) : null}
                  onChange={handleReturnDateChange}
                  dateFormat="yyyy-MM-dd"
                  minDate={FromDate ? new Date(FromDate) : new Date()}
                  placeholderText="Select a date"
                  excludeDates={disabledDates}
                />    
                  </div>
                </div>

              
                <div>
 
  <div className="form-group">
  {FromDate && ReturnDate && (
                  <div className="rd">
                    <p>
                      Rent days: {" "}
                      {Math.ceil(
                        (new Date(ReturnDate) - new Date(FromDate)) /
                          (1000 * 60 * 60 * 24)
                      )}
                    </p>
                  </div>
                )}
    <label htmlFor="amount-select"> Number of group members:   </label>
    <select
      id="amount-select"
      className="form-select"
      value={amount}
      onChange={handleSelectChange}
    >
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </select>
  </div>

  {amount > 1 && (
    <>
      {names.slice(1).map((name, index) => (
        <div className="form-group" key={index}>
          <label htmlFor={`name-${index + 1}`}>Email of {index + 2} member:</label>
          <input
            type="text"
            id={`name-${index + 1}`}
            className="form-control"
            value={name || ""}
            onChange={(event) => handleNameChange(index + 1, event)}
          />
        </div>
      ))}
    </>
  )}
  
</div>

 

              </form>
              <br></br>
              <div className="checkbox-container">  
  <label htmlFor="terms-checkbox">
    <input
      id="terms-checkbox"
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
    <span></span>
  </label>
  <p onClick={handleCheckboxClick}>
    I agree to the terms and conditions.
  </p>
</div>
          <div>
              <header className="header flex">
                <div className={active}>
                  <Terms />
                  <div onClick={removeTerms} className="closetems">
                  <AiFillCloseCircle className="icon" />
                </div>  
                </div>
              </header>
              
              </div><br></br>
            <br></br>
            <button className="btn2"  onClick={handleSubmit}>Submit</button>
              </div>
              <br></br>
            </div>
            <div>
          </div>

        </div>         
      </div>
    </section>

  );
};

export default Order;
