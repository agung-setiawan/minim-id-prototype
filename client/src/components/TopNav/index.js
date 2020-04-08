import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

// Components
import SearchBox from "../SearchBox";

const TopNav = ({ auth: { isAuthenticated, loading }, logout }) => {
  const guestLinks = (
    <div className="button-box">
      <a href="/login" className="theme-btn btn-style-one">
        Masuk
      </a>
    </div>
  );

  const authLinks = (
    <div className="button-box">
      <a onClick={logout} href="#!" className="theme-btn btn-style-one">
        Keluar
      </a>
    </div>
  );

  return (
    <div>
      <nav className="main-menu navbar-expand-md">
        <div className="navbar-header">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </div>
        <div
          className="navbar-collapse collapse clearfix"
          id="navbarSupportedContent"
        >
          <ul className="navigation clearfix">
            <li className="current dropdown">
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/tentang-kami">Tentang Kami</a>
            </li>
            <li className="dropdown">
              <a href="/fitur">Fitur</a>
            </li>
            <li className="dropdown">
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/hubungi-kami">Hubungi Kami</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="outer-box clearfix">
        <div className="option-box">
          <SearchBox />
        </div>
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      </div>
    </div>
  );
};

TopNav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(TopNav);
