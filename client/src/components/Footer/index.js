import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="auto-container">
          <div className="widgets-section">
            <div className="row clearfix">
              <div className="big-column col-lg-5 col-md-12 col-sm-12">
                <div className="row clearfix">
                  <div className="footer-column col-lg-7 col-md-7 col-sm-12">
                    <div className="footer-widget logo-widget">
                      <div className="logo">
                        <a href="/">
                          <img
                            src="/assets/images/footer-logo.png"
                            alt="MinimID"
                          />
                        </a>
                      </div>
                      <div className="text">
                        Lorem Ipsum proin gravida nibh vel velit
                        aucsollicitudin, lorem quis bibendum auctor, nisi elit
                        consequat ipsum, nec sagittis sem nibh id elit.
                      </div>
                      <ul className="social-icon-one">
                        <li className="facebook">
                          <a href="#!">
                            <span className="fa fa-facebook"></span>
                          </a>
                        </li>
                        <li className="pinterest">
                          <a href="#!">
                            <span className="fa fa-pinterest-p"></span>
                          </a>
                        </li>
                        <li className="twitter">
                          <a href="#!">
                            <span className="fa fa-twitter"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="footer-column col-lg-5 col-md-5 col-sm-12">
                    <div className="footer-widget links-widget">
                      <h2>Company</h2>
                      <ul className="list">
                        <li>
                          <a href="#!">About Us</a>
                        </li>
                        <li>
                          <a href="#!">Our Team</a>
                        </li>
                        <li>
                          <a href="#!">Testimonials</a>
                        </li>
                        <li>
                          <a href="#!">Brand</a>
                        </li>
                        <li>
                          <a href="#!">Ecosystem</a>
                        </li>
                        <li>
                          <a href="#!">Sitemap</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="big-column col-lg-7 col-md-12 col-sm-12">
                <div className="row clearfix">
                  <div className="footer-column col-lg-4 col-md-6 col-sm-12">
                    <div className="footer-widget links-widget">
                      <h2>Categories</h2>
                      <ul className="list">
                        <li>
                          <a href="#!">Graphics (25)</a>
                        </li>
                        <li>
                          <a href="#!">Backgrounds (12)</a>
                        </li>
                        <li>
                          <a href="#!">Fonts (8)</a>
                        </li>
                        <li>
                          <a href="#!">Music (3)</a>
                        </li>
                        <li>
                          <a href="#!">Photography (3)</a>
                        </li>
                        <li>
                          <a href="#!">Themes (3)</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="footer-column col-lg-4 col-md-6 col-sm-12">
                    <div className="footer-widget links-widget">
                      <h2>Useful Links</h2>
                      <ul className="list">
                        <li>
                          <a href="#!">Blog</a>
                        </li>
                        <li>
                          <a href="#!">Terms & Conditions</a>
                        </li>
                        <li>
                          <a href="#!">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="#!">Refund Policy</a>
                        </li>
                        <li>
                          <a href="#!">Affiliate</a>
                        </li>
                        <li>
                          <a href="#!">Contact</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="footer-column col-lg-4 col-md-6 col-sm-12">
                    <div className="footer-widget map-widget">
                      <h2>Where we are</h2>
                      <div className="image">
                        <img
                          src="/assets/images/resource/map.png"
                          alt="MinimID"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">&copy; Copyright 2018 , MinimID</div>
        </div>
      </footer>
    );
  }
}
