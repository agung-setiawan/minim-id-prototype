import React, { Component, Fragment } from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Config from "../../utils/default";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

import "./style.css";

axios.defaults.headers.post["Content-Type"] = "application/json";

export default class Shorten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkResult: "",
      theCode: "",
      url: "",
      maxChar: "250",
      title: "",
      desc: "",
      shortenType: "PRIVATE",
      oriLink: "",
      copyIcon: ";"
    };
  }

  componentDidMount() {
    this.$el = $(this.el);
    this.$el.selectmenu({
      change: (event, ui) => {
        this.setState({ shortenType: ui.item.value });
        console.log(this.state.shortenType);
      }
    });
  }

  handleClick = async e => {
    e.preventDefault();
    let theUrl = this.state.url;
    this.setState({ btnText: "Copy" });

    const hostname = window.location.origin;
    const body = JSON.stringify({ theUrl, hostname });

    const res = await axios.post(
      `${Config.api}/api/shortener/getShorten`,
      body
    );

    this.setState({
      linkResult: res.data.newLink,
      theCode: res.data.newCode
    });
  };

  handleOnChange = event => {
    this.setState({ url: event.target.value, oriLink: event.target.value });
  };

  checkCharacters = event => {
    if (event.target.value.length > 250) {
      this.setState({ desc: event.target.value.substring(0, 250) });
    } else {
      this.setState({
        maxChar: 250 - event.target.value.length
      });
      this.setState({ desc: event.target.value });
    }
  };

  handleTitleValue = event => {
    this.setState({ title: event.target.value });
  };

  handleShortenType = event => {
    this.setState({ shortenType: event.target.value });
  };

  handleCopyLink = async e => {
    e.preventDefault();
    const typeIn = this.state.shortenType;
    const theLink = this.state.linkResult;
    const theUrl = this.state.oriLink;
    const shortenCode = this.state.theCode;
    const user_id = null;

    if (typeIn === "PUBLIC") {
      const title = this.state.title;
      const summary = this.state.desc;

      // Send Rest API for PUBLIC
      if (title.length === 0 && summary.length === 0) {
        toast.error("Judul dan Ringkasan tidak boleh kosong", {
          position: "top-center",
          hideProgressBar: true
        });
        return false;
      } else {
        const body = JSON.stringify({
          user_id,
          theUrl,
          theLink,
          title,
          summary,
          typeIn,
          shortenCode
        });

        try {
          const res = await axios.post(
            `${Config.api}/api/shortener/saveNewShorten`,
            body
          );
          if (res) {
            // Update Icon
            this.setState({ copyIcon: "S" });

            // Copy Link Function
            navigator.clipboard.writeText(this.state.linkResult);

            // Trigger Notification
            toast.success("Tautan Sudah Tersalin", {
              position: "top-center",
              hideProgressBar: false,
              onClose: () => window.location.reload()
            });
          } else {
            // Trigger Notification
            toast.error(
              "Maaf ada kesalahan pada sistem Kami, silahkan Anda mencoba kembali",
              {
                position: "top-center",
                hideProgressBar: true
              }
            );
          }
        } catch (error) {
          toast.success(error.msg, {
            position: "top-center",
            hideProgressBar: true
          });
        }
      }
    } else {
      // Send Rest API for PRIVATE
      try {
        const body = JSON.stringify({
          user_id,
          theUrl,
          theLink,
          typeIn,
          shortenCode
        });
        const res = await axios.post(
          `${Config.api}/api/shortener/saveNewShorten`,
          body
        );
        if (res) {
          // Update Icon
          this.setState({ copyIcon: "S" });

          // Copy Link Function
          navigator.clipboard.writeText(this.state.linkResult);

          // Trigger Notification
          toast.success("Tautan Sudah Tersalin", {
            position: "top-center",
            hideProgressBar: false,
            onClose: () => window.location.reload()
          });
        } else {
          // Trigger Notification
          toast.error(
            "Maaf ada kesalahan pada sistem Kami, silahkan Anda mencoba kembali",
            {
              position: "top-center",
              hideProgressBar: true
            }
          );
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  render() {
    return (
      <Fragment>
        <section
          className={`banner-section ${
            this.state.linkResult.length === 0 ? "tightHeight" : ""
          }`}
          style={{
            backgroundImage: "url(/assets/images/background/1.jpg)"
          }}
        >
          <div className="auto-container">
            <h2>Ketikkan URL Kamu</h2>
            <div className="search-form">
              <form>
                <div className="form-group clearfix">
                  <select
                    ref={el => (this.el = el)}
                    className="dropdown-menu custom-select-box"
                    onChange={this.handleShortenType}
                    defaultValue={this.state.shortenType}
                  >
                    <option value="PRIVATE">Private</option>
                    <option value="PUBLIC">Public</option>
                  </select>
                  <input
                    type="text"
                    name="oriLink"
                    value={this.state.oriLink}
                    required
                    onChange={this.handleOnChange}
                    maxLength="500"
                    style={{ overflow: "visible" }}
                  />
                  <button
                    className="theme-btn dripicons-search"
                    onClick={this.handleClick}
                  />
                </div>
              </form>
              <div
                className={
                  this.state.linkResult.length === 0
                    ? "hideMe"
                    : "resultContainer"
                }
              >
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="form-group"
                      style={{
                        marginBottom: "0",
                        paddingLeft: 0
                      }}
                    >
                      <input
                        type="text"
                        name="link_result"
                        value={this.state.linkResult}
                        readOnly
                      />
                      <input
                        type="hidden"
                        name="link_code"
                        value={this.state.theCode}
                      />
                      <button
                        type="button"
                        className="theme-btn btnResult"
                        onClick={this.handleCopyLink}
                      >
                        <div
                          data-tip="Salin Tautan Ini"
                          data-icon={this.state.copyIcon}
                          className="icon"
                        />
                      </button>
                      <ReactTooltip />
                    </div>
                  </div>
                </div>
                <div
                  className={
                    this.state.shortenType === "PUBLIC" ? "showMe" : "hideMe"
                  }
                >
                  <div
                    className="row"
                    style={{
                      margin: 0,
                      backgroundColor: "#f5f5f5",
                      borderBottom: "1px solid #CCC"
                    }}
                  >
                    <div className="col-md-12">
                      <div className="typeCounting">{this.state.maxChar}</div>
                    </div>
                    <div className="shortenDescription">
                      <div
                        className="col-md-12"
                        style={{
                          borderBottom: "1px solid #aaa"
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Judul"
                          onChange={this.handleTitleValue}
                        />
                      </div>
                      <div className="col-md-12">
                        <textarea
                          className="form-contraol"
                          style={{ height: "150px" }}
                          placeholder="Ringkasan"
                          maxLength={250}
                          onKeyDown={this.checkCharacters}
                          onChange={this.checkCharacters}
                          value={this.state.desc}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="title">
              Dengan menggunakan Mimin ID, Anda setuju dengan{" "}
              <span>Syarat &amp; Ketentuan</span>
            </div>
          </div>
          <ToastContainer />
        </section>
      </Fragment>
    );
  }
}
