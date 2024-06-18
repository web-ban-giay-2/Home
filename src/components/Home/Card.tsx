import { useEffect, useState } from "react"

import "../../assets/vendors/linericon/style.css"
import "../../assets/vendors/nouislider/nouislider.min.css"
import { CartItem } from "./ProductDetail"
import { LinkImg } from "../Layout"
const Card = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [UserId, username] = localStorage.getItem("user")?.split(",") || []
  useEffect(() => {
    const getCart = () => {
      console.log(username)
      const storedCart = localStorage.getItem("cart_" + UserId)
      if (storedCart) {
        setCart(JSON.parse(storedCart))
      }
    }

    getCart()
  }, [])
  const increaseQuantity = (id: number, size: number) => {
    const newCart = cart.map((item) => {
      if (item.productId === id && item.size === size) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item
    })
    setCart(newCart)
    localStorage.setItem("cart_" + UserId, JSON.stringify(newCart))
  }

  const decreaseQuantity = (id: number, size: number) => {
    const newCart = cart.map((item) => {
      if (item.productId === id && item.quantity > 1 && item.size === size) {
        return { ...item, quantity: item.quantity - 1 }
      }
      return item
    })
    setCart(newCart)
    localStorage.setItem("cart_" + id, JSON.stringify(newCart))
  }

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.productId !== id)
    setCart(newCart)
    localStorage.setItem("cart_" + UserId, JSON.stringify(newCart))
  }

  const addToOder = async () => {
    const cartRequest = cart.map((item) => {
      return {
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        UserId,
      }
    })
    console.log(JSON.stringify(cartRequest))
    const response = await fetch("https://localhost:7080/api/DonHang", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartRequest),
    })
    if (response.ok) {
      await alert("Đặt hàng thành công")
      // xoá dữ liệu trong localStorage
      localStorage.removeItem("cart_" + UserId)
      setCart([])
    }
  }
  console.log(cart)

  return (
    <>
      <section className="blog-banner-area" id="category">
        <div className="container h-100">
          <div className="blog-banner">
            <div className="text-center">
              <h1>Giỏ hàng</h1>
              <nav aria-label="breadcrumb" className="banner-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Giỏ hàng
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {cart.length > 0 ? (
        <>
          <section className="cart_area">
            <div className="container">
              <div className="cart_inner">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Size</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="media">
                                <div className="d-flex">
                                  <img src={LinkImg + item.productImg} alt="" style={{ width: "100px", height: "100px" }} />
                                </div>
                                <div className="media-body">
                                  <p>{item.productName}</p>
                                </div>
                              </div>
                            </td>
                            <td>{item.size}</td>
                            <td>
                              <h5>{item.price}đ</h5>
                            </td>
                            <td>
                              <div className="product_count">
                                <input type="number" name="qty" id="sst" min={1} maxLength={12} defaultValue={1} value={item.quantity} title="Quantity:" className="input-text qty" />
                                <button className="increase items-count" type="button" style={{ width: "30px", height: "30px" }} onClick={() => increaseQuantity(item.productId, item.size)}>
                                  <i className="lnr lnr-chevron-up" />
                                </button>
                                <button className="reduced items-count" type="button" style={{ width: "30px", height: "30px" }} onClick={() => decreaseQuantity(item.productId, item.size)}>
                                  <i className="lnr lnr-chevron-down" />
                                </button>
                              </div>
                            </td>
                            <td>
                              <h5>{item.price * item.quantity}đ</h5>
                            </td>
                            <td>
                              <div className="btn" style={{ color: "red" }} onClick={() => removeFromCart(item.productId)}>
                                <i className="fa-solid fa-x"></i>
                              </div>
                            </td>
                          </tr>
                        )
                      })}

                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{ textAlign: "right", width: "200px" }}>
                          <h5>Tổng tiền: </h5>
                        </td>
                        <td>
                          <h5>{cart.reduce((total, item) => total + item.price * item.quantity, 0)}đ</h5>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{ textAlign: "right", width: "200px" }}>
                          <h5>Phí giao hàng : </h5>
                        </td>
                        <td>
                          <h5>Free</h5>
                        </td>
                      </tr>
                      <tr className="out_button_area">
                        <td className="d-none-l"></td>
                        <td className=""></td>
                        <td></td>
                        <td></td>
                        <td style={{ textAlign: "right", paddingLeft: "160px" }}>
                          <div className="checkout_btn_inner d-flex align-items-center">
                            <a className="gray_btn" href="#">
                              Tiếp tục mua hàng
                            </a>
                            <a className="primary-btn ml-2" href="#" onClick={addToOder}>
                              Đặt hàng
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <h4 className="text-center mt-5 text-danger">Không có sản phẩm trong giỏ hàng</h4>
      )}
    </>
  )
}

export default Card
