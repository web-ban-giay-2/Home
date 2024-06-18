import { Link } from "react-router-dom"


const CardPro = (pro : any) => {

  return (
    <>
        <div className="card text-center card-product">
                <div className="card-product__img">
                  <img className="img-fluid" src={`https://localhost:7080/api/Image/get-pro-img/${pro.pro?.images[0]?.name}`} alt="" />
                  <ul className="card-product__imgOverlay">
                    <li>
                      <button>
                        <Link to={`/productDetail/${pro.pro?.id}`}>
                          <i className="ti-search" />
                        </Link>
                        
                      </button>
                    </li>
                    <li>
                      <button>
                        <i className="ti-shopping-cart" />
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <p>{pro.pro?.trademark}</p>
                  <h4 className="card-product__title">
                    <Link to={`/product-detail/${pro.pro?.id}`}>{pro.pro?.name}</Link>
                  </h4>
                  <p className="card-product__price">{pro.pro?.price.toLocaleString('vi-VN').replace('đ', '')}đ</p>
                </div>
              </div>
    </>
  )
}

export default CardPro