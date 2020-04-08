import React, { Component, useState } from "react";

function SearchBox() {
  const [stringValue, fillStringValue] = useState("");

  function SearchString(e) {
    e.preventDefault();
  }

  return (
    <div className="search-box-outer">
      <div className="dropdown">
        <button
          className="search-box-btn dropdown-toggle"
          type="button"
          id="dropdownMenu3"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="dripicons-search" />
        </button>
        <ul
          className="dropdown-menu pull-right search-panel"
          aria-labelledby="dropdownMenu3"
        >
          <li className="panel-outer">
            <div className="form-container">
              <form action="">
                <div className="form-group">
                  <input
                    type="search"
                    name="field-name"
                    value={stringValue}
                    placeholder="Search Here"
                    onChange={fillStringValue}
                    required
                  />
                  <button
                    type="submit"
                    className="search-btn"
                    onChange={SearchString}
                  >
                    <span className="fa fa-search" />
                  </button>
                </div>
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchBox;
