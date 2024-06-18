import Header from "./Home/Header.tsx"
import Index from "./Home/Index.tsx"
import { Outlet, Route, Routes, useLocation } from "react-router-dom"
import Shop from "./Home/Shop.tsx"
import { useEffect, useState } from "react"
import ProductDetail from "./Home/ProductDetail.tsx"
import Card from "./Home/Card.tsx"

export const LinkImg = "https://localhost:7080/api/Image/get-pro-img/"

// import '../assets/home/'
const HomeLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    //nếu co thay doi path thi se reload lai trang
    
    
  }, [location]);

  return (
    
    <>
      <Header />

      <main className="site-main">

        <Outlet />

        <section className="subscribe-position">
          <div className="container">
            <div className="subscribe text-center">
              <h3 className="subscribe__title">Điền Email của bạn vào đây</h3>
              <p>Để được đội ngũ chăm sóc khách hàng của chúng tôi tư vấn và hỗ trợ</p>
              <div id="mc_embed_signup">
                <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01" method="get" className="subscribe-form form-inline mt-5 pt-1">
                  <div className="form-group ml-sm-auto">
                    <input className="form-control mb-1" type="email" name="EMAIL" placeholder="Enter your email" />
                    <div className="info" />
                  </div>
                  <button className="button button-subscribe mr-auto mb-1" type="submit">
                    Gửi
                  </button>
                  <div style={{ position: "absolute", left: "-5000px" }}>
                    <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabIndex={-1} defaultValue="" type="text" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* ================ Subscribe section end ================= */}
      </main>
      {/*================ Start footer Area  =================*/}
      <footer className="footer">
        <div className="footer-area">
          <div className="container">
            <div className="row section_gap">
              <div className="col-4">
                <div className="single-footer-widget tp_widgets">
                  <h4 className="footer_title large_title">Nhiệm vụ của chúng ta</h4>
                  <p>Hãy gieo hạt giống xanh cho những đàn gia súc có cánh bay vào. Thu thập những thứ làm nên sự bay lượn, bạn không chia rẽ sự sâu thẳm đã lay động chúng ta. Thu thập những thứ làm nên chúng ta, đất đai và những năm tháng sinh sống.</p>
                  <p>Hãy gieo hạt giống xanh cho những đàn gia súc có cánh bay vào. Thu thập những thứ làm nên sự bay lượn, bạn không chia rẽ sự sâu thẳm đã lay động.</p>
                </div>
              </div>
              <div className="offset-lg-1 col-3 px-5">
                <div className="single-footer-widget tp_widgets">
                  <h4 className="footer_title">Quick Links</h4>
                  <ul className="list">
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Shop</a>
                    </li>
                    <li>
                      <a href="#">Blog</a>
                    </li>
                    <li>
                      <a href="#">Product</a>
                    </li>
                    <li>
                      <a href="#">Brand</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="offset-lg-1 col-3">
                <div className="single-footer-widget tp_widgets">
                  <h4 className="footer_title">Liên hệ</h4>
                  <div className="ml-40">
                    <p className="sm-head">
                      <span className="fa fa-location-arrow" />
                      Địa chỉ
                    </p>
                    <p>129/2/5, Nguyễn Chí Thanh, BMT</p>
                    <p className="sm-head">
                      <span className="fa fa-phone" />
                      Điện thoại
                    </p>
                    <p>+84949691310</p>
                    <p className="sm-head">
                      <span className="fa fa-envelope" />
                      Email
                    </p>
                    <p>hoangquoctuans3@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row d-flex">
              <p className="col-lg-12 footer-text text-center">
                Website được thiết kế bởi <i className="fa fa-heart" aria-hidden="true" />{" "}
                <a href="https://www.facebook.com/profile.php?id=100021709069639" target="_blank">
                  Hoàng Quốc Tuấn
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomeLayout
