import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createChannel } from "../../actions/shorten";

// Component
import Shorten from "../../components/Admin/Shorten";
import LeftMenu from "../../components/Admin/LeftMenu";
import MiddleInfo from "../../components/Admin/MiddleInfo";

import "./style.css";

const ChannelNew = ({ createChannel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const { name, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createChannel(formData);
  };

  const goToHome = () => {
    window.location.href = "/channel-list";
  };

  return (
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
                    <div className="card-header">Buat Channel Baru</div>
                    <div className="card-body">
                      <div className="card-text">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 offset-md-3">
                            <div className="form-group input-group">
                              <div
                                className="col-md-12 label"
                                style={{ paddingLeft: 0 }}
                              >
                                Nama Channel <em>*</em>
                              </div>
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  {" "}
                                  <i className="icon dripicons-pencil" />{" "}
                                </span>
                              </div>
                              <input
                                name="name"
                                className="form-control"
                                placeholder="Nama Channel"
                                type="text"
                                value={name}
                                onChange={e => onChange(e)}
                                required
                              />
                            </div>
                            <div className="form-group input-group">
                              <div
                                className="col-md-12 label"
                                style={{ paddingLeft: 0 }}
                              >
                                Deskripsi
                              </div>
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  {" "}
                                  <i className="icon dripicons-pencil" />{" "}
                                </span>
                              </div>
                              <textarea
                                name="description"
                                className="form-control"
                                placeholder="Deskripsi"
                                value={description}
                                onChange={e => onChange(e)}
                                style={{ height: "149px" }}
                              />
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
                                  Simpan
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

ChannelNew.propTypes = {
  createChannel: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  createChannel
})(withRouter(ChannelNew));
