import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import { getCurrentProfile, updatePassword } from "../../actions/profile";

import { setAlert } from "../../actions/alert";

// Component
import Shorten from "../../components/Admin/Shorten";
import LeftMenu from "../../components/Admin/LeftMenu";
import MiddleInfo from "../../components/Admin/MiddleInfo";

import "./style.css";

const UserPassword = ({
  profile: { profile, loading },
  getCurrentProfile,
  updatePassword,
  setAlert,
  history
}) => {
  const [passMatch, setPassMatch] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    retypePassword: ""
  });

  useEffect(() => {
    getCurrentProfile();
  }, [loading, getCurrentProfile]);

  const { currentPassword, newPassword, retypePassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updatePassword(formData, history, true);
  };

  const passMatching = e => {
    if (newPassword === retypePassword) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  };

  const goToHome = () => {
    window.location.href = "/profile";
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Shorten />
      <MiddleInfo />

      <section
        className="contact-page-section"
        style={{ padding: "50px 0px 66px" }}
      >
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="leftSection">
                <LeftMenu />
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <form onSubmit={e => onSubmit(e)}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="card">
                    <div className="card-header">
                      Ubah Kata Sandi (Password)
                    </div>
                    <div className="card-body">
                      <div className="card-text">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 offset-md-3">
                            <div className="form-group input-group">
                              <div
                                className="col-md-12 label"
                                style={{ paddingLeft: 0 }}
                              >
                                Kata Sandi Saat Ini <em>*</em>
                              </div>
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  {" "}
                                  <i className="icon dripicons-dots-3" />{" "}
                                </span>
                              </div>
                              <input
                                name="currentPassword"
                                className="form-control"
                                placeholder="Kata Sandi Saat Ini"
                                type="password"
                                value={currentPassword}
                                onChange={e => onChange(e)}
                                required
                              />
                            </div>
                            <div className="form-group input-group">
                              <div
                                className="col-md-12 label"
                                style={{ paddingLeft: 0 }}
                              >
                                Kata Sandi Baru <em>*</em>
                              </div>
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  {" "}
                                  <i className="icon dripicons-dots-3" />{" "}
                                </span>
                              </div>
                              <input
                                name="newPassword"
                                className="form-control"
                                placeholder="Kata Sandi Baru"
                                type="password"
                                value={newPassword}
                                onChange={e => onChange(e)}
                                minLength="6"
                                required
                              />
                            </div>
                            <div className="form-group input-group">
                              <div
                                className="col-md-12 label"
                                style={{ paddingLeft: 0 }}
                              >
                                Ulangi Kata Sandi <em>*</em>
                              </div>
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  {" "}
                                  <i className="icon dripicons-dots-3" />{" "}
                                </span>
                              </div>
                              <input
                                name="retypePassword"
                                className="form-control"
                                placeholder="Ulangi Kata Sandi"
                                type="password"
                                value={retypePassword}
                                onChange={e => onChange(e)}
                                onBlur={e => passMatching(e)}
                                minLength="6"
                                required
                              />
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <div style={{ fontSize: "12px" }}>
                                  {passMatch === false
                                    ? "Kata Sandi Tidak Cocok "
                                    : "Kata Sandi Cocok "}
                                  {passMatch === false ? (
                                    <span
                                      className="icon dripicons-cross"
                                      style={{ color: "red" }}
                                    />
                                  ) : (
                                    <span
                                      className="icon dripicons-checkmark"
                                      style={{ color: "green" }}
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <div
                                  className="text-right"
                                  style={{ fontSize: "12px" }}
                                >
                                  Minimal 6 Karakter
                                </div>
                              </div>
                            </div>
                            <div className="row" style={{ marginTop: "25px" }}>
                              <div className="col-md-6 col-sm-12">
                                <button
                                  type="button"
                                  className="btn btn-block btn-danger"
                                  onClick={goToHome}
                                >
                                  Batal
                                </button>
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <button
                                  type="submit"
                                  className="btn btn-block btn-success"
                                >
                                  Ubah Kata Sandi
                                </button>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

UserPassword.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  setAlert,
  updatePassword
})(withRouter(UserPassword));
