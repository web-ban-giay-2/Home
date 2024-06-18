import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from './components/Home/Index.tsx'
import HomeLayout from './components/Layout.tsx';
import Shop from './components/Home/Shop.tsx';
import ProductDetail from './components/Home/ProductDetail.tsx';
import Card from './components/Home/Card.tsx';
import Logn_in from './components/Logn_in.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/product-detail/:productId",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Card />,
      }
    ],
  },
  {
    path: "/dang-nhap",
    element: <Logn_in />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
