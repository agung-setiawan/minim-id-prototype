import React, { Fragment } from "react";
import axios from "axios";
import Recaptcha from "react-recaptcha";

// Config
import config from "../../utils/default";

// Set API URL :
axios.defaults.baseURL = config.api;

export default class ContactUS extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.reCaptchaLoaded = this.reCaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

    this.state = {
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      contactSubject: "",
      contactContent: "",
      isVerified: false,
      capPlaceholder: "Loading Google Recaptcha"
    };
  }

  reCaptchaLoaded() {
    this.setState({ capPlaceholder: "" });
  }

  handleNameChange = event => {
    this.setState({ contactName: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ contactEmail: event.target.value });
  };

  handlePhoneChange = event => {
    this.setState({ contactPhone: event.target.value });
  };

  handleSubjectChange = event => {
    this.setState({ contactSubject: event.target.value });
  };

  handleContentChange = event => {
    this.setState({ contactContent: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state.isVerified);
    if (this.state.isVerified) {
      try {
        await axios
          .post(config.api + "/api/contact_us/save", JSON.stringify(this.state))
          .then(function(response) {
            alert(response.data.msg);
            if (response.data.success) {
              window.location.reload(true);
            }
          });
      } catch (error) {
        alert("Gagal, mohon data yang diperlukan harus diisi");
      }
    } else {
      alert("Google Recaptcha : Varified that you are human");
    }
  };

  verifyCallback = response => {
    if (response) {
      this.setState({ isVerified: true });
    }
  };

  render() {
    return (
      <Fragment>
        <section
          className="page-title"
          style={{ backgroundImage: "url(/assets/images/background/6.jpg)" }}
        >
          <div className="auto-container">
            <h1>Hubungi Kami</h1>
            <div className="text">
              Highlight your writing with beautiful, expressive featured images.
            </div>
          </div>
        </section>

        <section className="contact-page-section">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="form-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="contact-form">
                    <form
                      method="post"
                      onSubmit={this.handleSubmit}
                      id="contact-form"
                    >
                      <div className="row clearfix">
                        <div className="form-group col-lg-6 col-md-6 col-sm-12">
                          <label>
                            Nama <em>*</em>
                          </label>
                          <input
                            type="text"
                            name="contactName"
                            value={this.state.contactName}
                            onChange={this.handleNameChange}
                            required
                          />
                        </div>
                        <div className="form-group col-lg-6 col-md-6 col-sm-12">
                          <label>
                            Email <em>*</em>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={this.state.contactEmail}
                            onChange={this.handleEmailChange}
                            required
                          />
                        </div>
                        <div className="form-group col-lg-6 col-md-6 col-sm-12">
                          <label>Phone</label>
                          <input
                            type="text"
                            name="phone"
                            value={this.state.contactPhone}
                            onChange={this.handlePhoneChange}
                          />
                        </div>
                        <div className="form-group col-lg-6 col-md-6 col-sm-12">
                          <label>
                            Subject <em>*</em>
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={this.state.contactSubject}
                            onChange={this.handleSubjectChange}
                            required
                          />
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                          <label>
                            Komentar <em>*</em>
                          </label>
                          <textarea
                            name="message"
                            value={this.state.contactContent}
                            onChange={this.handleContentChange}
                          ></textarea>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                          <div className="row">
                            <div className="col-md-6 col-xs-12">
                              <Recaptcha
                                sitekey="6LcGzOQUAAAAAFcfFnYOeYLZ3TmhCK8YsZ0O6moO"
                                render="explicit"
                                onloadCallback={this.reCaptchaLoaded}
                                verifyCallback={this.verifyCallback}
                              />
                              {this.state.capPlaceholder}
                            </div>
                            <div
                              className="col-md-6 col-xs-12"
                              style={{ textAlign: "right" }}
                            >
                              <button
                                type="submit"
                                className="theme-btn btn-style-two"
                                style={{ marginTop: "15.5px" }}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="map-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <section className="map-section">
                    <div>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63417.01691746839!2d106.73072215123743!3d-6.576632332313398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c4f738972703%3A0x2c04739fc32b8e0e!2sWest%20Bogor%2C%20Bogor%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1585299771097!5m2!1sen!2sid"
                        width="100%"
						title="mapLocation"
                        height="450"
                        frameBorder="0"
                        style={{ border: "0" }}
                        allowFullScreen=""
                        aria-hidden="false"
                      />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
