import { useEffect, useState } from "react"
import Baner from "./Baner"
import CardPro from "./CardPro"
import SP_banChay from "./SP_banChay"
export interface ProTYpe {
  id: number
  name: string
  price: number
  img: string
}

function App() {
  const [proData, setProData] = useState<ProTYpe[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7080/api/Product")

        setProData(await response.json())
        console.log(proData)
      } catch (error) {
        console.error("Lỗi fetch data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Baner />
      {/*================ Hero banner start =================*/}
      {/*================ Hero Carousel start =================*/}
      <section className="section-margin my-5">
        <div className="container">
          <div className="section-intro pb-60px">
            <h2>
              Thương hiệu <span className="section-intro__style">nổi bật</span>
            </h2>
          </div>
          <div className="row trademark_logo">
            <div className="col-md-2">
              <img src="src/assets/img/thuong-hieu/nike-logo.jpg" alt="" style={{ width: "100%" }}/>
            </div>
            <div className="col-md-2">
              <img src="src/assets/img/thuong-hieu/Adidas_Logo.svg" alt=""style={{ width: "100%" }} />
            </div>
            <div className="col-md-2">
              <img src="src/assets/img/thuong-hieu/logo-thuong-hieu-puma-elle-man-7.jpg" alt="" style={{ width: "100%" }}/>
            </div>
            <div className="col-md-2">
              <img src="src/assets/img/thuong-hieu/Reebok-logo.png" style={{ width: "100%" }}alt="" />
            </div>
            <div className="col-md-2">
              <img src="src/assets/img/thuong-hieu/Converse_logo.svg.png" style={{ width: "100%" }}alt="" />
            </div>
            <div className="col-md-2">
              <img src="src/assets/img/thuong-hieu/new-balance-2-logo-png-transparent.png" style={{ width: "100%" }}alt="" />
            </div>
          </div>
        </div>
      </section>
      {/*================ Hero Carousel end =================*/}
      {/* ================ Best Selling item  carousel ================= */}
      
      {/* ================ Best Selling item  carousel end ================= */}
      {/* ================ trending product section start ================= */}
      <section className="section-margin calc-60px">
        <div className="container">
          <div className="section-intro pb-60px">
            <h2>
              Sản phẩm <span className="section-intro__style">mới</span>
            </h2>
          </div>
          <div className="row">
            {proData.map((pro) => (
              <div className="col-md-6 col-lg-4 col-xl-3" key={pro.id}>
                <CardPro pro={pro} />
              </div>
            ))}

            
          </div>
        </div>
      </section>

      <SP_banChay />
      {/* ================ trending product section end ================= */}
      {/* ================ offer section start ================= */}
      <section className="offer" id="parallax-1" data-anchor-target="#parallax-1" data-300-top="background-position: 20px 30px" data-top-bottom="background-position: 0 20px">
        <div className="container">
          <div className="row">
            <div className="col-xl-5">
              <div className="offer__content text-center">
                <h3>Giảm tới 50%</h3>
                <a className="button button--active mt-3 mt-xl-4" href="#">
                  Mua ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
