import{ useEffect, useState } from "react"
import { ProTYpe } from "./Index"
import CardPro from "./CardPro"

const SP_banChay = () => {
  const [proData, setProData] = useState<ProTYpe[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7080/api/Product/home-banchay")
        setProData(await response.json())
      } catch (error) {
        console.error("Lỗi fetch data:", error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <section className="section-margin calc-60px">
        <div className="container">
          <div className="section-intro pb-60px">
            <h2>
              Top sản phẩm <span className="section-intro__style">bán chạy</span>
            </h2>
            <p style={{ marginTop: "15px" }}>Sản phẩn bán chạy trên website của chúng tôi</p>
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
    </>
  )
}

export default SP_banChay
