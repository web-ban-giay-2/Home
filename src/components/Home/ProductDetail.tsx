import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { LinkImg } from "../Layout"

interface ProductType {
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

export type CartItem = {
  productId: number
  productName: string
  productImg: string
  price: number
  quantity: number
  size: number
}

type imgType = {
  id: "int"
  name: "string"
  productId: "int"
}

const ProductDetail = () => {
  const [product, setProduct] = useState<ProductType>({} as ProductType)
  const [cart, setCart] = useState<CartItem[]>([])
  const [userId, username] = localStorage.getItem("user")?.split(",") || []
  const [productDetail, setProductDetail] = useState<{ id: "int"; size: number; quantity: "int"; productId: "int" }[]>([])
  const [images, setImages] = useState<imgType[]>([])
  const productId = useParams().productId
  const [qtyAndSize, setQtyAndSize] = useState<{ qty: number; size: number }>({ qty: 1, size: 0 })
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://localhost:7080/api/Product/get-product-form-home/${productId}`)
        const data = await response.json()
        setProduct(data) // Khởi tạo dữ liệu cập nhật bằng dữ liệu gốc
        setImages(data.images)
        await setProductDetail(data.productDetails)
        if (data.productDetails.length > 0) {
          setSize(data.productDetails[0].size)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }

    fetchProduct()
  }, [productId])

  const increaseQuantity = () => {
    qtyAndSize.qty += 1
    console.log(qtyAndSize)

    setQtyAndSize({ ...qtyAndSize })
  }

  const decreaseQuantity = () => {
    if (qtyAndSize.qty > 1) {
      qtyAndSize.qty -= 1
    }
    setQtyAndSize({ ...qtyAndSize })
  }

  const setSize = (size: number) => {
    qtyAndSize.size = size
    setQtyAndSize({ ...qtyAndSize })

    console.log(qtyAndSize)
  }

  function addToCart(product: CartItem) {
    if (!userId) {
      alert("Bạn phải đăng nhập để mua hàng")
      return location.href = "/dang-nhap"
    }
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart_" + userId) || "[]")

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingItemIndex = cart.findIndex((item) => item.productId === product.productId && item.size === product.size)

    if (existingItemIndex > -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      cart[existingItemIndex].quantity += product.quantity
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
      cart.push(product)
    }

    localStorage.setItem("cart_" + userId, JSON.stringify(cart))

    const storedCart = localStorage.getItem("cart_" + userId)
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }

  const handleAddToCart = () => {
    let sl = qtyAndSize.qty
    let size = qtyAndSize.size
    addToCart({
      productId: product.id,
      productName: product.name,
      productImg: product.images?.[0]?.name,
      price: product.price,
      quantity: sl,
      size: size,
    })
  }

  if (!product) {
    return <div>Loading...</div>
  }
  return (
    <>
      <section className="blog-banner-area" id="blog">
        <div className="container h-100">
          <div className="blog-banner">
            <div className="text-center">
              <h1>Chi tiết sản phẩm</h1>
              <nav aria-label="breadcrumb" className="banner-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                  Chi tiết sản phẩm
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <>
        {/*================Single Product Area =================*/}

        <div className="product_image_area">
          <div className="container">
            <div className="row s_product_inner">
              <div className="col-lg-6">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                    <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                    <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                  </ol>
                  <div className="carousel-inner">
                    {images?.map((image, index) => (
                      <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <img className="d-block w-100" src={LinkImg + image?.name} alt="First slide" />
                      </div>
                    ))}
                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div className="s_product_text">
                  <h3>{product.name}</h3>
                  <h2>{product.price}đ</h2>
                  <ul className="list">
                    <li>
                      <a className="active">
                        <span>Thương hiệu</span><strong> : {product.trademark}</strong>
                      </a>
                    </li>
                    <li>
                      <a style={{ display: "inline-block" }}>
                        <span>Size : </span>
                        {productDetail.map((item, index) => {
                          return (
                            <div className="form-check form-check-inline" key={index}>
                              <input className="form-check-input" type="radio" name="exampleRadios" id={`exampleRadios${index}`} defaultValue="option1" defaultChecked={index === 0} onChange={() => setSize(item.size)} />
                              <label className="form-check-label" htmlFor={`exampleRadios${index}`}>
                                {item.size}
                              </label>
                            </div>
                          )
                        })}
                        
                      </a>
                    </li>
                  </ul>
                  <p>{product.description}</p>
                  <div className="product_count_2" style={{ marginTop: "10px" }}>
                    <label htmlFor="qty">Số lượng :</label>
                    <button className="increase items-count" type="button" onClick={() => decreaseQuantity()} style={{border: "1px solid #e5e5e5", marginLeft: "20px"}}>
                      <i className="ti-angle-left" />
                    </button>
                    <input type="text" name="qty" id="sst" value={qtyAndSize.qty} size={2} maxLength={12} defaultValue={1} title="Quantity:" className="input-text qty" style={{border: "1px solid #e5e5e5", textAlign: "center"}} />
                    <button className="reduced items-count" type="button" onClick={() => increaseQuantity()}>
                      <i className="ti-angle-right" />
                    </button>
                    <Link className="button primary-btn add_to_cart_btn" to="/cart" onClick={handleAddToCart} style={{ marginLeft: "20px", border: "1px solid #e5e5e5" }}>
                      Mua ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*================End Single Product Area =================*/}

        <>
          {/*================ Start related Product area =================*/}
          <section className="related-product-area section-margin--small mt-0">
            <div className="container">
              <div className="section-intro pb-60px">
                <h2>
                  Top <span className="section-intro__style">Product</span>
                </h2>
              </div>
              <div className="row mt-30">
                <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                  <div className="single-search-product-wrapper">
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-1.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-2.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-3.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                  <div className="single-search-product-wrapper">
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-4.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-5.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-6.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                  <div className="single-search-product-wrapper">
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-7.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-8.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-9.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 mb-4 mb-xl-0">
                  <div className="single-search-product-wrapper">
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-1.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-2.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                    <div className="single-search-product d-flex">
                      <a href="#">
                        <img src="img/product/product-sm-3.png" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Gray Coffee Cup
                        </a>
                        <div className="price">$170.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*================ end related Product area =================*/}
        </>
      </>
    </>
  )
}

export default ProductDetail
