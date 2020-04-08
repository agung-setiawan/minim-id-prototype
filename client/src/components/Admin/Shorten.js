import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentProfile } from "../../actions/profile";
import { getChannelList } from "../../actions/shorten";
import Config from "../../utils/default";
import { createSlug } from "../../utils/helper";

import "./style.css";

axios.defaults.headers.post["Content-Type"] = "application/json";

const Shorten = ({
  isAuthenticated,
  setAlert,
  history,
  getCurrentProfile,
  getChannelList,
  profile: { profile, loading },
  channel: { channels }
}) => {
  const [linkResult, setLinkResult] = useState("");
  const [theCode, setTheCode] = useState("");
  const [url, setUrl] = useState("");
  const [maxChar, setMaxChar] = useState(250);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [shortenType, setShortenType] = useState("PRIVATE");
  const [oriLink, setOriLink] = useState("");
  const [copyIcon, setCopyIcon] = useState(";");
  const [attrShortBtn, setAttrShortBtn] = useState(false);
  const [attrCopyBtn, setAttrCopyBtn] = useState(false);
  const [channelID, setChannelID] = useState(0);
  const [hostName] = useState(window.location.origin);

  async function handleClick(e) {
    e.preventDefault();

    const theUrl = url;
    const hostname = hostName;

    setAttrShortBtn(true);

    const body = JSON.stringify({ theUrl, hostname });

    const res = await axios.post(
      `${Config.api}/api/shortener/getShorten`,
      body
    );

    setLinkResult(res.data.newLink);
    setTheCode(res.data.newCode);
  }

  function handleOnChange(event) {
    setUrl(event.target.value);
    setOriLink(event.target.value);
  }

  useEffect(() => {
    getCurrentProfile();
    getChannelList();
  }, [getCurrentProfile, getChannelList]);

  function checkCharacters(event) {
    if (event.target.value.length > 250) {
      setDesc(event.target.value.substring(0, 250));
    } else {
      setMaxChar(250 - event.target.value.length);
      setDesc(event.target.value);
    }
  }

  function handleTitleValue(event) {
    setTitle(event.target.value);
  }

  function handleShortenType(event) {
    setShortenType(event.target.value);
  }

  async function handleCopyLink(e) {
    e.preventDefault();
    const typeIn = shortenType;
    const theLink = linkResult;
    const theUrl = oriLink;
    const shortenCode = theCode;
    const date = new Date();
    const mth = date.getMonth() + parseInt(1);
    const yrs = date.getFullYear();

    // Update Icon
    setCopyIcon("...");

    if (typeIn === "PUBLIC") {
      const summary = desc;
      const user_id = profile._id;

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
          channelID,
          theUrl,
          theLink,
          title,
          summary,
          typeIn,
          shortenCode,
          mth,
          yrs
        });

        try {
          const res = await axios.post(
            `${Config.api}/api/shortener/saveNewShorten`,
            body
          );
          if (res) {
            // Update Icon
            setCopyIcon("S");

            // Set Button Disabled to Click
            setAttrCopyBtn(true);

            // Copy Link Function
            navigator.clipboard.writeText(linkResult);

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
          theUrl,
          theLink,
          typeIn,
          shortenCode,
          mth,
          yrs
        });
        const res = await axios.post(
          `${Config.api}/api/shortener/saveNewShorten`,
          body
        );
        if (res) {
          // Update Icon
          setCopyIcon("S");

          // Copy Link Function
          navigator.clipboard.writeText(linkResult);

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
  }

  const changeShorten = e => {
    console.log(e.target.value);
    setChannelID(e.target.value);
    if (title.length === 0) {
      alert("Judul tidak boleh kosong");
      setChannelID(0);
      return false;
    } else {
      let theSlug = "";
      let theTitle = "";
      setChannelID(e.target.value);
      const optIndex = e.nativeEvent.target.selectedIndex;
      const slug = e.target[optIndex].getAttribute("attrslug");
      if (slug !== null) {
        theSlug = slug;
        theTitle = "/" + createSlug(title);
        //title.replace(/\s+/g, "-").toLowerCase();
      } else {
        theSlug = theCode;
        theTitle = "";
      }
      const newShorten = hostName + "/" + theSlug + theTitle;
      setLinkResult(newShorten);
    }
    // } else {
    //   setChannelID(0);
    //   const newShorten = hostName + "/" + theCode;
    //   setLinkResult(newShorten);
    // }
  };

  return (
    <Fragment>
      <section
        className={`banner-section ${
          linkResult.length === 0 ? "tightHeight" : ""
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
                  className="dropdown-menu custom-select-box"
                  defaultValue={shortenType}
                  onChange={handleShortenType}
                >
                  <option value="PRIVATE">Private</option>
                  <option value="PUBLIC">Public</option>
                </select>
                <input
                  type="text"
                  style={{ padding: "10px 106px 10px 30px" }}
                  name="oriLink"
                  value={oriLink}
                  required
                  onChange={handleOnChange}
                />
                <button
                  className="theme-btn dripicons-search"
                  onClick={handleClick}
                  disabled={attrShortBtn}
                />
              </div>
            </form>
            <div
              className={linkResult.length === 0 ? "hideMe" : "resultContainer"}
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
                      value={linkResult}
                      readOnly
                    />
                    <input type="hidden" name="link_code" value={theCode} />
                    <button
                      type="button"
                      className="theme-btn btnResult"
                      onClick={handleCopyLink}
                      disabled={attrCopyBtn}
                    >
                      <div
                        data-tip="Salin Tautan Ini"
                        data-icon={copyIcon}
                        className="icon"
                      />
                    </button>
                    <ReactTooltip />
                  </div>
                </div>
              </div>
              <div className={shortenType === "PUBLIC" ? "showMe" : "hideMe"}>
                <div
                  className="row"
                  style={{
                    margin: 0,
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid #CCC"
                  }}
                >
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12">
                        <div
                          className="typeCounting"
                          style={{ marginTop: "10px" }}
                        >
                          {maxChar}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        {channels.length > 0 ? (
                          <select
                            className="form-control"
                            name="channelID"
                            value={channelID}
                            onChange={changeShorten}
                            style={{ marginTop: "10px" }}
                          >
                            <option value="0">No Channel</option>
                            {channels.map(cnl => (
                              <option
                                key={cnl._id}
                                value={cnl._id}
                                attrslug={cnl.slug}
                              >
                                {cnl.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
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
                        onChange={handleTitleValue}
                      />
                    </div>
                    <div className="col-md-12">
                      <textarea
                        className="form-contraol"
                        style={{ height: "150px" }}
                        placeholder="Ringkasan"
                        maxLength={250}
                        onKeyDown={checkCharacters}
                        onChange={checkCharacters}
                        value={desc}
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
};

Shorten.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getChannelList: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile,
  channel: state.channel
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getChannelList,
  setAlert
})(Shorten);
