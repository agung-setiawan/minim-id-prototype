import React from "react";

const StickyHeader = () => (
  <div className="sticky-header">
    <div className="auto-container clearfix">
      <div className="logo pull-left">
        <a href="index.html" className="img-responsive">
          <img src="/assets/images/logo-small.png" alt="" title="" />
        </a>
      </div>
      <div className="right-col pull-right">
        <nav className="main-menu navbar-expand-md">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <div
            className="navbar-collapse collapse clearfix"
            id="navbarSupportedContent1"
          >
            <ul className="navigation clearfix">
              <li className="current">
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/tentang-kami">Tentang Kami</a>
              </li>
              <li>
                <a href="/fitur">Fitur</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/hubungi-kami">Hubungi Kami</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
);

export default StickyHeader;
