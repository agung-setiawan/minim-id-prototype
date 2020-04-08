import React, { Component, Fragment } from "react";
import axios from "axios";

// Config
import config from "../../utils/default";

// Set API URL :
axios.defaults.baseURL = config.api;

export default class AboutUS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodContent: ""
    };
  }

  componentDidMount() {
    this.getBodyContent();
  }

  getBodyContent = () => {
    // fetch(`${config.api}/api/shortener/get/counter/total`)
    //   .then(results => {
    //     return results.json();
    //   })
    //   .then(data => {
    //     this.setState({ shortenTotal: data });
    //     console.log(data);
    //   });
  };

  render() {
    return (
      <Fragment>
        <section
          className="page-title"
          style={{ backgroundImage: "url(/assets/images/background/3.jpg)" }}
        >
          <div className="auto-container">
            <h1>About us</h1>
            <div className="text">
              Highlight your writing with beautiful, expressive featured images.
            </div>
          </div>
        </section>

        <section className="we-are-section">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="content-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <h2>Apa Itu MinimID ?</h2>
                  <div className="bold-text">
                    <p>
                      Sebuah platform penyedia servis untuk memudahkan Kamu
                      berbagi tautan (Link) untuk pribadi atau bisnis. Tautan
                      (Link) adalah sebuah eksistensi dari sebuah konten digital
                      saat ini, sehingga bisa dikatakan bahwa sebuah tautan
                      menjadi pintu gerbang bagi pencari konten di era digital
                      saat ini.
                    </p>
                    <p>
                      MinimID hadir untuk Kamu yang serius dalam menggeluti
                      dunia konten digital membantu kamu dalam mengatur &amp;
                      memantau tautan kamu, sehingga bisa meningkatkan
                      visibility konten kamu di dunia digital.
                    </p>{" "}
                  </div>
                </div>
              </div>

              <div className="image-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <h2>Visi &amp; Misi MinimID</h2>
                  <div className="bold-text">
                    <h3 className="text-left">
                      <i className="fa fa-check-square-o" />{" "}
                      <strong>Visi</strong>
                    </h3>
                    <p className="vision-text">
                      Memberikan edukasi kepada netizen dengan menyebarkan
                      konten-konten yang aktratif dan juga berkualitas.
                    </p>
                    <h3 className="text-left">
                      <i className="fa fa-check-square-o" />{" "}
                      <strong>Misi</strong>
                    </h3>
                    <p className="vision-text">
                      Menyediakan sarana untuk memudahkan memberikan serta
                      memantau tautan dengan konten yang aktratif dan
                      berkualitas.
                    </p>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
