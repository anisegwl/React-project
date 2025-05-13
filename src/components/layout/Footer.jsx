import React from 'react';
import '../../styles/footer.css';

const Footer = (props) => {
  return (
    <div className="footer-wrapper ">
      <footer className={`footer py-5 bg-${props.mode} text-${props.darkModeTxt}`}>
        <div className="container">
          <div className="row">

            {/* Contact Us section */}
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="footer-heading mb-4">Contact Us</h5>
              <ul className="footer-ul">
                <li><i className="fas fa-map-marker-alt"></i>&nbsp; Irving 2194 USA</li>
                <li><i className="fas fa-phone-alt"></i>&nbsp; 0478 517 210</li>
                <li><i className="fas fa-envelope"></i>&nbsp; uoit-msar@gmail.com</li>
                <li><i className="fas fa-id-card"></i>&nbsp; ABN: 30 628 513 20</li>
              </ul>
              <div className="social-icons mt-3">
                <a href="#"><i className={`fab fa-facebook-f text-${props.darkModeTxt}`}></i></a>
                <a href="#"><i className={`fab fa-instagram text-${props.darkModeTxt}`}></i></a>
                <a href="#"><i className={`fab fa-linkedin-in text-${props.darkModeTxt}`}></i></a>
                <a href="#"><i className={`fab fa-twitter text-${props.darkModeTxt}`}></i></a>
              </div>
            </div>

            {/* Quick Links section */}
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="footer-heading mb-4">Quick Links</h5>
              <ul className="footer-ul">
                <li>Home</li>
                <li>About Us</li>
                <li>Services</li>
                <li>Gallery</li>
                <li>Testimonials</li>
                <li>Contact Us</li>
              </ul>
            </div>

            {/* About Us section */}
            <div className="col-md-4">
              <h5 className="footer-heading mb-4">About Us</h5>
              <p className="footer-text">
                We take pleasure in providing individual with unique style of fitting and finishing. Our team of skilled craftsmen are dedicated to delivering the highest quality products that meet the standard
              </p>
              <p><strong>5 Years</strong><br />In Clothing</p>
            </div>

          </div>
        </div>
      </footer>

      <div className="lower-footer">
        <p>
          &copy; 2023 - UOIT-Apparael Your Clothing Hub. All Rights Reserved.
          Designed by Anise Gnawali.
        </p>
      </div>
    </div>
  );
};

export default Footer; 
