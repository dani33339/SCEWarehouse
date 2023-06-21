import React, { useEffect } from "react";
import "./Footer.css";
import video from "../../Assets/video2.mp4";
import { ReactComponent as SCEicon } from "../../Assets/SCEicon.svg";
import {FiChevronRight} from 'react-icons/fi'
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section id="footer" className="footer">
      <div className="videoDiv">
        <video src={video} loop autoPlay muted type="video/mp4"></video>
      </div>
      <div className="secContent container">
        <div className="contactDiv flex">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="text"
          ></div>
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="#" className="logo flex">
                <h1>
                  <SCEicon className="icon" /> Warehouse.
                </h1>
              </a>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              className="footerParagraph"
            >
              The warehouse of the Department of Visual Communication Sami
              Shamoon College
              <br /> for any question or request, please contact Production
              studio and warehouse manager: <br />
              <br /> Production studio and warehouse manager: Mr. Shay Sadika{" "}
              <br />
              <a href="tel:08-6174709">08-6174709</a>
              <br />
              <a href="mailto:shaysa@sce.ac.il">shaysa@sce.ac.il</a>
              <br />
              <div
                data-aos="fade-up"
                data-aos-duration="3000"
                className="footerSocials flex"
              >
                <a
                  href="https://www.youtube.com/@scebsc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillYoutube className="icon" />
                </a>
                <a
                  href="https://www.instagram.com/sce.academy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillInstagram className="icon" />
                </a>
              </div>
            </div>
            <br /> Site was created by 4 SCE students from the department of
            software engineering,
            <br /> for technical issues please connect :
            <span>
              Daniel Markov :{" "}
              <a href="mailto:daniema14@ac.sce.ac.il">daniema14@ac.sce.ac.il</a>
            </span>
            <span>
              Anton Volkov :{" "}
              <a href="mailto:antonvo@ac.sce.ac.il">antonvo@ac.sce.ac.il</a>
            </span>
            <span>
              Pavel Kormilchik :{" "}
              <a href="mailto:pavelko@ac.sce.ac.il">pavelko@ac.sce.ac.il</a>
            </span>
            <span>
              Orel Meir :{" "}
              <a href="mailto:orelma2@ac.sce.ac.il">orelma2@ac.sce.ac.il</a>
            </span>
          </div>
          <div className="footerLinks grid">
          {/* Group One */}
           <div data-aos="fade-up" data-aos-duration="4000"  className="linkGroup">
               <span className="groupTitle">
                SCE
               </span>

               <li className="footerList flex" onClick={() => window.location.href = 'https://www.sce.ac.il/'}>
                <FiChevronRight className="icon"/>
                SCE
                </li>

                <li className="footerList flex" onClick={() => window.location.href = 'https://moodle.sce.ac.il/my/'}>
                  <FiChevronRight className="icon"/>
                  Moodle
               </li>

               <li className="footerList flex" onClick={() => window.location.href = 'https://portal.sce.ac.il/'}>
                  <FiChevronRight className="icon"/>
                  Portal
               </li>

           </div>

         </div>
          <div className="footerDiv flex">
            <small>Warehouse.</small>
            <small>
              COPYRIGHTS RESERVED - Daniel Markov & Anton Volkov & Pavel
              Kormilchik & Orel Meir
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
