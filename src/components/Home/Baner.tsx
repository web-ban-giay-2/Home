import React from 'react'

const Baner = () => {
  return (
    <>
        <section className="hero-banner">
          <div className="container">
            <div className="row no-gutters align-items-center pt-60px">
              <div className="col-5 d-none d-sm-block rounded">
                <div className="hero-banner__img rounded">
                  <img className="img-fluid" src="src/assets/img/banner/4b16c6be3b934340e19a4f465667dd2a.jpg" style={{ width: "100%" }} alt="" />
                </div>
              </div>
              <div className="col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0">
                <div className="hero-banner__content">
                  <h1>BƯỚC CHÂN THOẢI MÁI, PHONG CÁCH TỰ TIN</h1>
                  <p>Khám phá bộ sưu tập giày mới nhất, chất lượng vượt trội, giá cả phải chăng.</p>
                  <a className="button button-hero" href="#">
                    Khám phá ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Baner