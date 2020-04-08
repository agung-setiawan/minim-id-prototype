import React, { Fragment, useState } from "react";
import Recaptcha from "react-recaptcha";
import PasswordStrengthMeter from "../../components/auth/PasswordStrengthMeter";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register, fbRegister } from "../../actions/auth";
import PropTypes from "prop-types";
// import FacebookLogin from "react-facebook-login";
// import goLogin from "react-google-login";

const Register = ({ setAlert, register, fbRegister, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const [isVerified, setIsVerified] = useState(false);
  const [capPlaceholder, setCapPlaceholder] = useState(
    "Loading Google Recaptcha"
  );

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
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      if (isVerified) {
        register({ name, email, password });
      } else {
        setAlert("Google Recaptcha : Verified that you are human", "danger");
      }
    }
  };

	/*
  const responseFacebook = response => {
    fbRegister(response.name, response.email, response.picture.data.url);
    console.log(
      response.name + " - " + response.email + " - " + response.picture.data.url
    );
  };
  */

  // const responseGoogle = (response) => {
  //   console.log(response);
  // }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div>
        <section
          className="page-title"
          style={{ backgroundImage: "url(/assets/images/background/6.jpg)" }}
        >
          <div className="auto-container">
            <h1>Mendaftar</h1>
            <div className="text">Buat Akun Baru.</div>
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
                    <h4 className="card-title mt-3 text-center">Mendaftar</h4>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <a
                          href="#!"
                          className="btn btn-block btnTwitter"
                          style={{ backgroundColor: "#42aeec", color: "#fff" }}
                        >
                          {" "}
                          <i className="fa fa-twitter" /> Daftar dengan Twitter
                        </a>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <a
                          href="#!"
                          className="btnFacebook btn btn-block"
                          style={{ backgroundColor: "#405d9d", color: "#fff" }}
                        >
                          {" "}
                          <i className="fa fa-facebook-f" /> Daftar dengan
                          facebook
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
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={e => onChange(e)}
                          required
                        />
                      </div>

                      <div className="form-group input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            {" "}
                            <i className="icon dripicons-user" />{" "}
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="name"
                          value={name}
                          onChange={e => onChange(e)}
                          required
                        />
                      </div>
                      <p className="dividerText">&nbsp;</p>
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
                        <PasswordStrengthMeter password={password} />
                      </div>
                      <div className="form-group input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            {" "}
                            <i className="icon dripicons-lock" />{" "}
                          </span>
                        </div>
                        <input
                          name="password2"
                          className="form-control"
                          placeholder="Confirm Password"
                          type="password"
                          value={password2}
                          onChange={e => onChange(e)}
                          minLength="6"
                          required
                        />
                        <div className="small-notes">
                          <em>All fields are required</em>
                        </div>
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
                              Mendaftar{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-center">
                        Sudah punya akun ? <Link to="/login">Masuk</Link>{" "}
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  fbRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register, fbRegister })(
  Register
);
