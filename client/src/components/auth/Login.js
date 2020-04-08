import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Recaptcha from "react-recaptcha";
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";

import "./style.css";

const Login = ({ login, isAuthenticated, setAlert, history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [isVerified, setIsVerified] = useState(false);
  const [capPlaceholder, setCapPlaceholder] = useState(
    "Loading Google Recaptcha"
  );

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const reCaptchaLoaded = () => {
    setCapPlaceholder("");
  };

  const verifyCallback = response => {
    if (response) {
      setIsVerified(true);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (isVerified) {
      login(email, password);
    } else {
      setAlert("Google Recaptcha : Varified that you are human", "danger");
    }
  };

  if (isAuthenticated) {
    window.location.href = "/dashboard";
  }

  return (
    <Fragment>
      <div>
        <section
          className="page-title"
          style={{ backgroundImage: "url(/assets/images/background/6.jpg)" }}
        >
          <div className="auto-container">
            <h1>Masuk</h1>
            <div className="text">
              Silahkan Kamu masuk, untuk bisa mengakses semua fitur di Minim ID.
            </div>
          </div>
        </section>
        <section className="contact-page-section">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="form-column col-lg-6 col-md-12 col-sm-12 offset-lg-3">
                <div className="card bg-light">
                  <article
                    className="card-body"
                    style={{ minWidth: "450px", margin: "0 auto" }}
                  >
                    <h4 className="card-title mt-3 text-center">Masuk</h4>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <a
                          href=""
                          className="btn btn-block btnTwitter"
                          style={{ backgroundColor: "#42aeec", color: "#fff" }}
                        >
                          {" "}
                          <i className="fa fa-twitter" /> Login via Twitter
                        </a>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <a
                          href=""
                          className="btnFacebook btn btn-block"
                          style={{ backgroundColor: "#405d9d", color: "#fff" }}
                        >
                          {" "}
                          <i className="fa fa-facebook-f" /> Login via facebook
                        </a>
                      </div>
                    </div>
                    <p className="dividerText">
                      <span className="bg-light" style={{ border: 0 }}>
                        ATAU
                      </span>
                    </p>
                    <form onSubmit={e => onSubmit(e)}>
                      <div className="form-group input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            {" "}
                            <i className="icon dripicons-mail" />{" "}
                          </span>
                        </div>
                        <input
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          type="email"
                          value={email}
                          onChange={e => onChange(e)}
                          required
                        />
                      </div>
                      <div className="form-group input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            {" "}
                            <i className="icon dripicons-lock" />{" "}
                          </span>
                        </div>
                        <input
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          type="password"
                          value={password}
                          onChange={e => onChange(e)}
                          minLength="6"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <p className="text-left">
                          <Link to="/forgot-password">Lupa Password ?</Link>
                        </p>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-8 col-xs-12">
                            <Recaptcha
                              sitekey="6LcGzOQUAAAAAFcfFnYOeYLZ3TmhCK8YsZ0O6moO"
                              render="explicit"
                              onloadCallback={reCaptchaLoaded}
                              verifyCallback={verifyCallback}
                            />
                            {capPlaceholder}
                          </div>
                          <div className="col-md-4 col-xs-12">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                              style={{ marginTop: "16.5px" }}
                            >
                              {" "}
                              Masuk{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-center">
                        Belum punya akun ? <Link to="/register">Mendaftar</Link>{" "}
                      </p>
                    </form>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login, setAlert })(Login);
