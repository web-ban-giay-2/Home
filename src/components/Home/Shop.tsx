import React, { useEffect, useState } from "react"
import CardPro from "./CardPro"
import SmalCardPro from "./SmalCardPro"
import SP_banChay from "./SP_banChay"

type ProTYpe = {
  id: number
  name: string
  description: string
  price: number
  trademark: string
  images: {
    id: number
    name: string
    productId: number
  }[]
  productDetails: {
    id: number
    size: number
    quantity: number
    productId: number
  }[]
}

const Shop = () => {
  const [proData, setProData] = useState<ProTYpe[]>([])
  const [oldProData, setOldProData] = useState<ProTYpe[]>([])
  const [data, setData] = useState<ProTYpe[]>([])
  let [thuong_hieu, setThuongHieu] = useState("all")
  const [trademark, setTrademark] = useState<
    {
      id: number
      name: string
    }[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await LoadProduct()
        const responseTrademark = await fetch("https://localhost:7080/api/Trademark")
        setTrademark(await responseTrademark.json())
      } catch (error) {
        console.error("Lỗi fetch data:", error)
      }
    }

    fetchData()
  }, [])

  const LoadProduct = async () => {
    try {
      const response = await fetch("https://localhost:7080/api/Product")
      setProData(await response.json())
      const response2 = await fetch("https://localhost:7080/api/Product")
      setData(await response2.json())
    } catch (error) {
      console.error("Lỗi fetch data:", error)
    }
  }

  const handleSelect = async (thuong_hieu: any) => {
    console.log(thuong_hieu)
    if (thuong_hieu === "all") {
      setProData(await data)
      setThuongHieu("all")
    } else {
      setProData(await data.filter((pro) => pro.trademark === thuong_hieu))
      setThuongHieu(thuong_hieu)
      console.log(proData)
    }
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    let key = e.target.value
    if (key === "" && thuong_hieu === "all") {
      setProData(await data)
    } else if (key !== "" && thuong_hieu === "all") {
      setProData(await data.filter((pro) => pro.name.toLocaleLowerCase().includes(key.toLocaleLowerCase())))
    } else {
      const oldproduct = await data.filter((pro) => pro.trademark === thuong_hieu)
      setProData(await oldproduct.filter((pro) => pro.name.toLocaleLowerCase().includes(key.toLocaleLowerCase())))
    }
    
  }

  return (
    <>
      <>
        <section className="blog-banner-area" id="category">
          <div className="container h-100">
            <div className="blog-banner">
              <div className="text-center">
                <h1>Shop - Sản phẩm</h1>
                <nav aria-label="breadcrumb" className="banner-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Shop
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* ================ end banner area ================= */}
        {/* ================ category section start ================= */}
        <section className="section-margin--small mb-5">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-5">
                <div className="sidebar-categories">
                  <div className="head">Thương hiệu</div>
                  <ul className="main-categories">
                    <li className="common-filter">
                      <form action="#">
                        <ul>
                          <li className="filter-list">
                            <input className="pixel-radio" type="radio" id={`${0}`} name="brand" defaultChecked onChange={() => handleSelect("all")} />
                            <label htmlFor="">
                              All
                              <span style={{ marginLeft: "10px" }}>(100)</span>
                            </label>
                          </li>
                          {trademark.map((item) => {
                            return (
                              <li className="filter-list" key={item.id}>
                                <input className="pixel-radio" type="radio" id={`${item.id}`} name="brand" onChange={() => handleSelect(item.name)} value={item.name} />
                                <label htmlFor={item.name}>
                                  {item.name}
                                  <span style={{ marginLeft: "10px" }}>(100)</span>
                                </label>
                              </li>
                            )
                          })}
                        </ul>
                      </form>
                    </li>
                  </ul>
                </div>
                {/* <div className="sidebar-filter">
                  <div className="top-filter-head">Product Filters</div>
                  <div className="common-filter">
                    <div className="head">Brands</div>
                    <form action="#">
                      <ul>
                        <li className="filter-list">
                          <input className="pixel-radio" type="radio" id="apple" name="brand" />
                          <label htmlFor="apple">
                            Apple<span>(29)</span>
                          </label>
                        </li>
                        <li className="filter-list">
                          <input className="pixel-radio" type="radio" id="asus" name="brand" />
                          <label htmlFor="asus">
                            Asus<span>(29)</span>
                          </label>
                        </li>
                        <li className="filter-list">
                          <input className="pixel-radio" type="radio" id="gionee" name="brand" />
                          <label htmlFor="gionee">
                            Gionee<span>(19)</span>
                          </label>
                        </li>
                        <li className="filter-list">
                          <input className="pixel-radio" type="radio" id="micromax" name="brand" />
                          <label htmlFor="micromax">
                            Micromax<span>(19)</span>
                          </label>
                        </li>
                        <li className="filter-list">
                          <input className="pixel-radio" type="radio" id="samsung" name="brand" />
                          <label htmlFor="samsung">
                            Samsung<span>(19)</span>
                          </label>
                        </li>
                      </ul>
                    </form>
                  </div>
                  <div className="common-filter">
                    <div className="head">Color</div>
                    <form action="#">
                      <ul>
                        <li className="filter-list">
                          <input className="pixel-radio" type="radio" id="black" name="color" />
                          <label htmlFor="black">
                            Black<span>(29)</span>
                          </label>
                        </li>
                        <li className="filter-list">
                          <input className="pixel-radio" type="radio" id="balckleather" name="color" />
                          <label htmlFor="balckleather">
                            Black Leather<span>(29)</span>
                          </label>
                        </li>
                        <li className="filter-list">
                          <input className="pixel-radio" type="radio" id="blackred" name="color" />
                          <label htmlFor="blackred">
                            Black with red<span>(19)</span>
                          </label>
                        </li>
                        <li className="filter-list">
                          <input className="pixel-radio" type="radio" id="gold" name="color" />
                          <label htmlFor="gold">
                            Gold<span>(19)</span>
                          </label>
                        </li>
                        <li className="filter-list">
                          <input className="pixel-radio" type="radio" id="spacegrey" name="color" />
                          <label htmlFor="spacegrey">
                            Spacegrey<span>(19)</span>
                          </label>
                        </li>
                      </ul>
                    </form>
                  </div>
                  <div className="common-filter">
                    <div className="head">Price</div>
                    <div className="price-range-area">
                      <div id="price-range" />
                      <div className="value-wrapper d-flex">
                        <div className="price">Price:</div>
                        <span>$</span>
                        <div id="lower-value" />
                        <div className="to">to</div>
                        <span>$</span>
                        <div id="upper-value" />
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="col-xl-9 col-lg-8 col-md-7">
                {/* Start Filter Bar */}
                <div className="filter-bar d-flex flex-wrap align-items-center">
                  <div className="sorting">
                    {/* <select>
                      <option value={1}>Xắp xếp mặc định</option>
                      <option value={1}>Bán chạy</option>
                      <option value={1}>Xắp xếp theo giá</option>
                    </select> */}
                  </div>
                  <div className="sorting mr-auto">
                    {/* <select>
                      <option value={1}>{"A => Z"}</option>
                      <option value={1}>{"Z => A"}</option>
                      <option value={1}>Show 12</option>
                    </select> */}
                  </div>
                  <div>
                    <div className="input-group filter-bar-search">
                      <input type="text" placeholder="Search" name="search" onChange={handleSearch} />
                      <div className="input-group-append">
                        <button type="button">
                          <i className="ti-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Filter Bar */}
                {/* Start Best Seller */}
                <section className="lattest-product-area pb-40 category-list">
                  <div className="row">
                    {proData.map((pro) => (
                      <div className="col-md-6 col-lg-4" key={pro.id}>
                        <CardPro pro={pro} />
                      </div>
                    ))}
                  </div>
                </section>
                {/* End Best Seller */}
              </div>
            </div>
          </div>
        </section>
        {/* ================ category section end ================= */}
        {/* ================ top product area start ================= */}
        <SP_banChay />
      </>
    </>
  )
}

export default Shop
