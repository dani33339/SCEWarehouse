import React, { useEffect, useState } from "react";
import { doc, updateDoc, getDocs, getDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import "./Confirmation.css";

const Confirmation = () => {
  const [reservations, setReservations] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationsCollection = collection(db, "reservations");
      const reservationDocs = await getDocs(reservationsCollection);
      const fetchedReservations = [];
  
      for (let res of reservationDocs.docs) {
        const resData = res.data();
        const userDocRef = doc(db, "users", resData.Userid);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();
  
        fetchedReservations.push({
          id: res.id,
          ...resData,
          UserRoles: userData.userRoles
        });
      }
  
      fetchedReservations.sort((a, b) => {
        // Sort by teacher reservation
        const isTeacherA = a.UserRoles.includes("teacher");
        const isTeacherB = b.UserRoles.includes("teacher");
        if (isTeacherA && !isTeacherB) return -1;
        if (!isTeacherA && isTeacherB) return 1;
      
        // If both are teacher reservations or non-teacher reservations, sort by name
        const nameA = a.FirstName.toLowerCase();
        const nameB = b.FirstName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      
        return 0; // Preserve original order if both are teacher reservations or non-teacher reservations with the same name
      });
  
      setReservations(fetchedReservations);
  
      // Fetch the items related to these reservations
      const fetchedItems = await Promise.all(
        fetchedReservations.map(async (res) => {
          const itemDocRef = doc(db, "items", res.Itemid);
          const docSnap = await getDoc(itemDocRef);
          return docSnap.data();
        })
      );
  
      setItems(fetchedItems);
    };
  
    fetchReservations();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const reservationDocRef = doc(db, "reservations", id);
    await updateDoc(reservationDocRef, { Status: newStatus });
    setReservations(reservations.map(res => res.id === id ? { ...res, Status: newStatus } : res));
  }

  return (
    <section id="main" className="main section container">
      <div className="secTitle">
        <h3 className="title">Confirmation page</h3>
      </div>

      <div className="secContent grid">
        {reservations.map((reservation, index) => (
          <div key={reservation.id} className={`reservation-card ${reservation.UserRoles.includes('teacher') ? 'teacher' : ''}`}>
            {reservation.UserRoles.includes('teacher') && <p className='teach'>Lecturers reservation</p>}
            <img className="imgX" src={items[index]?.ImageUrl} alt="" />
            <p>Reservation ID: {reservation.id}</p>
            <p>First Name: {reservation.FirstName}</p>
            <p>Last Name: {reservation.LastName}</p>
            <p>From: {reservation.FromDate}</p>
            <p>Return: {reservation.ReturnDate}</p>
            <p>Status: {reservation.Status}</p>
            <div className="status-buttons">
              <button
                className="orange"
                onClick={() => handleStatusChange(reservation.id, "Pending")}
              >
                Set as Pending
              </button>
              <button
                className="red"
                onClick={() => handleStatusChange(reservation.id, "Cancel")}
              >
                Cancel
              </button>
              <button
                className="btn"
                onClick={() => handleStatusChange(reservation.id, "Accept")}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Confirmation
