import React, { useEffect, useState } from "react";
import './Main.css';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { HiClipboardList } from 'react-icons/hi';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";

const Main = ({ Filters }) => {
  const ItemsRef = collection(db, "items");
  const [Items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    try {
      fetchItems();
    } catch (error) {
      console.log(error.message);
      setErrorMessage('Database is down.');
    }

    Aos.init({ duration: 4000 });
  }, [Filters]);

  async function fetchItems() {
    try {
      // Fetch all items
      const data = await getDocs(ItemsRef);
      const itemsData = data.docs.map((doc) => doc.data());

      let filteredItems = itemsData;

      if (Filters) {
        // Filter by ItemType
        if (Filters[0] && Filters[0].ItemType) {
          filteredItems = filteredItems.filter(item => item.ItemType === Filters[0].ItemType);
        }

        // Filter by Description
        if (Filters[1] && Filters[1].Description) {
          const searchTerm = Filters[1].Description.toLowerCase().trim();
          filteredItems = filteredItems.filter(item => item.Description.toLowerCase().includes(searchTerm));
        }
      }

      setItems(filteredItems);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  }

  const Order = async (item) => {
    navigate("Order", { state: item });
  };

  const renderErrorMessage = () => {
    if (errorMessage) {
      return (
        <div className="error-notification">
          <div className="error-bubble">
            {errorMessage}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section id='main' className='main section container'>
      <div className="secTitle">
        <h3 className="title">
          Available items
        </h3>
      </div>
      <div className="secContent grid">
        {
          Items.map((item, index) => {
            return (
              <div key={index} data-aos="fade-up" className="singleDestination">
                <div className="imageDiv">
                  <img src={item.ImageUrl} alt="" />
                </div>
                <div className="cardInfo">
                  <span className="continent flex">
                    <HiOutlineLocationMarker className="icon" />
                    <span className="name">location: {item.Location}</span>
                  </span>
                  <div className="fees flex">
                    <div className="grade ">
                      <span className="textD ">Serial </span>
                      <span>{item.Serial} </span>
                    </div>
                  </div>
                  <div className="desc">
                    <p>Description:{item.Description}</p>
                  </div>
                  <button className='btn flex' onClick={() => Order(item)}>Order <HiClipboardList className="icon" /> </button>
                </div>
              </div>
            );
          })
        }
        {renderErrorMessage()}
      </div>
    </section>
  );
};

Main.propTypes = {
  Filters: PropTypes.arrayOf(
    PropTypes.shape({
      ItemType: PropTypes.string,
      Description: PropTypes.string
    })
  ),
};

export default Main;
