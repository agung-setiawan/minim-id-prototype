import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import {
  createProfile,
  getCurrentProfile,
  changeAvatar
} from "../../actions/profile";

import { setAlert } from "../../actions/alert";

// Component
import Shorten from "../../components/Admin/Shorten";
import LeftMenu from "../../components/Admin/LeftMenu";
import MiddleInfo from "../../components/Admin/MiddleInfo";

import "./style.css";

const UserProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  changeAvatar,
  setAlert,
  history
}) => {
  const [copyIcon, setCopyIcon] = useState("dripicons-duplicate");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    selfDescription: "",
    gender: "",
    avatar: "",
    apiKey: "",
    file: []
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      name: loading || !profile.name ? "" : profile.name,
      email: loading || !profile.email ? "" : profile.email,
      selfDescription:
        loading || !profile.selfDescription ? "" : profile.selfDescription,
      gender: loading || !profile.gender ? "" : profile.gender,
      apiKey: loading || !profile.apiKey ? "" : profile.apiKey
      //   avatar: loading || !profile.avatar ? "" : profile.avatar
    });
  }, [loading, getCurrentProfile]);

  const {
    name,
    email,
    selfDescription,
    gender,
    apiKey
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  const handleFocus = event => event.target.select();

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setAlert("API Key Copied", "success");
    setCopyIcon("dripicons-checkmark");
  };

  /*
  | Handle for change avatar -- Later On
  const handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let files = e.target.files[0];

    reader.onloadend = () => {
      setFormData({
        avatar: reader.result,
        file: files
      });
    };
    reader.readAsDataURL(files);
  };

  const fileUploadHandler = e => {
    e.preventDefault();
    try {
      changeAvatar(file, true);
    } catch (error) {
      alert("Please Select The Image First");
    }
  };
  */

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
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="card">
                        <div className="card-header">
                          Informasi Profile Kamu
                        </div>
                        <div className="card-body">
                          <div className="card-text">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="form-group input-group">
                                  <div
                                    className="col-md-12 label"
                                    style={{ paddingLeft: 0 }}
                                  >
                                    Nama <em>*</em>
                                  </div>
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      {" "}
                                      <i className="icon dripicons-user" />{" "}
                                    </span>
                                  </div>
                                  <input
                                    name="name"
                                    className="form-control"
                                    placeholder="Nama"
                                    type="text"
                                    value={name}
                                    onChange={e => onChange(e)}
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <div
                                    className="col-md-12 label"
                                    style={{ paddingLeft: 0 }}
                                  >
                                    Jenis Kelamin
                                  </div>
                                  <select
                                    className="form-control"
                                    name="gender"
                                    value={gender}
                                    onChange={e => onChange(e)}
                                  >
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="form-group input-group">
                                  <div
                                    className="col-md-12 label"
                                    style={{ paddingLeft: 0 }}
                                  >
                                    Email <em>*</em>
                                  </div>
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
                                  <div
                                    className="col-md-12 label"
                                    style={{ paddingLeft: 0 }}
                                  >
                                    API Key
                                  </div>
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      {" "}
                                      <i className="icon dripicons-gear" />{" "}
                                    </span>
                                  </div>
                                  <input
                                    className="form-control"
                                    placeholder="API Key"
                                    type="text"
                                    value={apiKey}
                                    onChange={e => onChange(e)}
                                    onFocus={e => handleFocus(e)}
                                  />
                                  <div className="input-group-prepend cursor-pointer">
                                    <span className="input-group-text">
                                      {" "}
                                      <i
                                        className={`icon ${copyIcon}`}
                                        onClick={handleCopy}
                                      />{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                  <div
                                    className="col-md-12 label"
                                    style={{ paddingLeft: 0 }}
                                  >
                                    Deskripsi
                                  </div>
                                  <textarea
                                    className="form-control"
                                    name="selfDescription"
                                    style={{ minHeight: "101px" }}
                                    onChange={e => onChange(e)}
                                    value={selfDescription}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div className="card">
                      <div className="card-header">Keterangan</div>
                      <div className="card-body">
                        {/* <h5 className="card-title">Special title treatment</h5> */}
                        <div className="card-text">
                          <ul>
                            <li>
                              1. <strong>Nama</strong> tidak boleh kosong.
                            </li>
                            <li>
                              2. <strong>Email</strong> tidak boleh kosong.
                            </li>
                            <li>
                              3. <strong>API Key</strong> Adalah kode kunci{" "}
                              <strong>(confidential)</strong> jika Kamu ingin
                              menggunakan service URL Short dari Minim ID untuk
                              proses integrasikan dengan website atau aplikasi
                              Kamu, setiap permintaan service URL Short dari
                              website Kamu ke Minim ID, maka sistem akan meminta
                              API Key.
                            </li>
                          </ul>
                        </div>
                        <input
                          type="submit"
                          className="btn btn-primary"
                          value="Ubah Data"
                        />
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

UserProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  changeAvatar: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  changeAvatar,
  setAlert
})(withRouter(UserProfile));
