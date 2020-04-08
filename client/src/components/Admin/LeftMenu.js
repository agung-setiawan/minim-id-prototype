import React, { useState } from "react";

import "../../pages/Admin/style.css";

const LeftMenu = () => {
  let [uriLink] = useState(window.location.href.split("/"));

  return (
    <div className="panel-group" id="accordion">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a
              data-toggle="collapse"
              data-parent="#accordion"
              href="#collapseOne"
            >
              <span className="icon dripicons-link"></span> Tautan
            </a>
          </h4>
        </div>
        <div
          id="collapseOne"
          className="panel-collapse collapse in collapse show"
        >
          <div className="panel-body">
            <table className="table accord-menu" style={{ border: "none" }}>
              <tbody>
                <tr>
                  {uriLink[3] === "public-shorten" ? (
                    <td className="active-link">
                      <a href="/public-shorten">Publik</a>
                    </td>
                  ) : (
                    <td>
                      <a href="/public-shorten">Publik</a>
                    </td>
                  )}
                </tr>
                <tr>
                  {uriLink[3] === "private-shorten" ? (
                    <td className="active-link">
                      <a href="/private-shorten">Pribadi</a>
                    </td>
                  ) : (
                    <td>
                      <a href="/private-shorten">Pribadi</a>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4
            className="panel-title"
            style={{
              borderTop: "1px solid #DEE2E6"
            }}
          >
            <a
              data-toggle="collapse"
              data-parent="#accordion"
              href="#collapseTwo"
            >
              <span className="icon dripicons-user"></span> Akun
            </a>
          </h4>
        </div>
        <div id="collapseTwo" className="panel-collapse collapse show">
          <div className="panel-body">
            <table className="table accord-menu">
              <tbody>
                <tr>
                  <td>
                    <a href="/profile">Profile</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="/update-password">Ganti Password</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4
            className="panel-title"
            style={{
              borderTop: "1px solid #DEE2E6"
            }}
          >
            <a
              data-toggle="collapse"
              data-parent="#accordion"
              href="#collapseFour"
            >
              <span className="icon dripicons-swap"></span> Channel
            </a>
          </h4>
        </div>
        <div id="collapseFour" className="panel-collapse collapse show">
          <div className="panel-body">
            <table className="table accord-menu">
              <tbody>
                <tr>
                  <td>
                    <a href="/channel-list">Daftar Channel</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="/create-new-channel">Buat Channel Baru</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
