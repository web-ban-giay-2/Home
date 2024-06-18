import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  const [cart, setCart] = useState<[]>([])
  const [userId, username] = localStorage.getItem("user")?.split(",") || []
  useEffect(() => {
    const getCart = () => {
      const storedCart = localStorage.getItem("cart_" + userId)
      setCart(JSON.parse(storedCart || "[]"))
    }
    getCart()
  }, [])

  return (
    <>
      <header className="header_area">
        <div className="main_menu">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <Link className="navbar-brand logo_h" to="/">
                <img src="src/assets/img/logo/shoes-shop-logo-vector-store-260nw-1718721763.png" alt="" />
              </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                <ul className="nav navbar-nav menu_nav ml-auto mr-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/shop">
                      Shop
                    </Link>
                  </li>
                  <li className="nav-item submenu dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                      Giới thiệu
                    </a>
                  </li>
                  <li className="nav-item submenu dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                      liên hệ
                    </a>
                  </li>
                </ul>
                <ul className="nav-shop nav navbar-nav">
                  <li className="nav-item" style={{ padding: "32px 0px", marginRight: "20px", marginLeft: "115px" }}>
                    <button>
                      <i className="ti-search" />
                    </button>
                  </li>
                  <li className="nav-item" style={{ padding: "32px 0px", marginRight: "-20px" }}>
                    <Link to="/cart">
                      <button>
                        <i className="ti-shopping-cart" />
                        <span className="nav-shop__circle">{cart.length}</span>
                      </button>{" "}
                    </Link>
                  </li>
                  <li className="nav-item submenu dropdown">
                    <a href="/" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                      <i className="fa-regular fa-user" aria-hidden="true"></i><span>{username ? " - " + username : ""}</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                      <Link className="nav-link" to={"/dang-nhap"}>
                        {
                          userId ? "Đăng xuất" : "Đăng nhập"
                        }
                      </Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="register.html">
                          Register
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="tracking-order.html">
                          Tracking
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
