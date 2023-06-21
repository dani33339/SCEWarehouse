import React, {useEffect,useState} from 'react'
import './Myorders.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { auth, db} from "../../firebase-config";
import {collection,doc,getDoc,getDocs,query, where} from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth'
import { Promise } from 'es6-promise';


const Myorders = () => {
    useEffect(()=>{
      Aos.init({duration: 4000})
   }, [])

   const [Reservations,setReservations] = useState([]);
   const [Items,setItems] = useState();
   const [user, loading] = useAuthState(auth);


  useEffect(() => {
    fetchItems();

  }, [Reservations,user])

  const fetchItems=async()=>{
    if (!user) return;

    const q = query(collection(db, "reservations"), where("Userid", "==", user.uid));
    const data = await getDocs(q);
    const reservations = data.docs.map((doc) => doc.data());
    setReservations(reservations);
  
    const items = await Promise.all(
      reservations.map((res) => {
        const itemId = res.Itemid;
        const itemDocRef = doc(db, "items", itemId);
        return getDoc(itemDocRef).then((doc) => doc.data());
      })
    );
    setItems(items);
  }
  return (
    <section id='main' className='main section container'>
      
      <div className="secTitle">
        <h1 className="title">
          My Orders
        </h1>
      </div>

      
 
      <div className="secContent grid">
        {
        Items &&
            Items.map((item, index) => {
          const reservation = Reservations[index];
          return (
            <div key={index} data-aos="fade-up" className="singleDestination">
              <div className="imageDiv">
                <img src={item.ImageUrl} alt="" />
              </div>

                <div className="cardInfo">
                 <h4 className="destTitle"> {reservation.ItemType}</h4>
                 <span className="continent flex">
                    <HiOutlineLocationMarker className="icon"/>
                    <span className="name">{item.Location}</span>
                 </span>
      
                 <div className="fees flex">
                    <div className="grade">
                      <span  className="textD">From</span>
                      <span>{reservation.FromDate}</span>
                      <span className="textD ">  Retunrn Date: </span><span>{reservation.ReturnDate} </span> 

                    </div>
                   
                 </div>


                 <div className="desc">
                 <p>Description: {item.Description}</p>
                 </div>

                 <div className="desc">
                 <p>Status: {reservation.Status}</p>
                 </div>
                </div>
              </div>
      
            )
          }) 
        }
      </div>
     
    </section>
  )
}

export default Myorders