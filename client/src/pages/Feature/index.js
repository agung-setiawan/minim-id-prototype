import React, { Fragment } from "react";
import axios from "axios";

// Config
import config from "../../utils/default";

// Set API URL :
axios.defaults.baseURL = config.api;

export default class Feature extends React.Component {
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
            <h1>Fitur</h1>
            <div className="text">
              MinimID menyediakan fitur untuk kelola tautan.
            </div>
          </div>
        </section>

        <section className="we-are-section">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="content-column col-lg-12 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                      <div className="about-us-text">
                        <h2>Kategori</h2>
                        <p>
                          Di MinimID Kamu bisa dengan bebas untuk menentukan
                          apakah tautan Kamu ingin kategori umum atau pribadi
                          sesuka hati Kamu aja.
                        </p>
                        <p>
                          Kamu bisa memilih untuk menyebarkan tautan Kamu secara
                          pribadi atau Kamu ingin khalayak umum mengetahui
                          tautan Kamu ? Semua pilihan ada pada Kamu sendiri, dan
                          tugas Kami yang menyediakan servisnya.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12">
                      <div
                        className="about-us-img-section"
                        style={{
                          backgroundImage: "url(/assets/images/fitur_1.jpg)"
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-column col-lg-12 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-12">
                      <div
                        className="about-us-img-section"
                        style={{
                          backgroundImage: "url(/assets/images/fitur_2.png)"
                        }}
                      ></div>
                    </div>
                    <div className="col-lg-7 col-md-6 col-sm-12">
                      <div className="about-us-text">
                        <h2>Akan Selalu Gratis</h2>
                        <p>
                          Semau fitur yang ada di MinimID tidak berbayar atau
                          gratis, ya Kami menyediakan semua kepraktisan dalam
                          mengelola dan memonitoring tautan Kamu tanpa dipungut
                          biaya sepeser pun, Kamu cukup untuk fokus pada konten
                          dan tautan nya saja.
                        </p>
                        <p>
                          Semua fitur dalam MinimID Kami sediakan dengan
                          cuma-cuma tetapi Kami tetap menjunjung konten atau
                          tautan yang berkualitas dan sesuai dengan kaidah yang
                          tercantum dalam <a href="">Syarat dan Ketentuan</a> di
                          MinimID.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-column col-lg-12 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                      <div className="about-us-text">
                        <h2>Pantau Tautan Kamu</h2>
                        <p>
                          Kamu dapat memantau tautan kapan saja dan dimana saja.
                        </p>
                        <p>
                          Kamu bisa memilih untuk menyebarkan tautan Kamu secara
                          pribadi atau Kamu ingin khalayak umum mengetahui
                          tautan Kamu ? Semua pilihan ada pada Kamu sendiri, dan
                          tugas Kami yang menyediakan servisnya.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12">
                      <div
                        className="about-us-img-section"
                        style={{
                          backgroundImage: "url(/assets/images/fitur_3.jpg)"
                        }}
                      ></div>
                    </div>
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
