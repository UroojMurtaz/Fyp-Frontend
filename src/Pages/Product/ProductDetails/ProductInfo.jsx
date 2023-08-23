import "./productinfo.scss";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";
import ReactStars from "react-stars";
import CircleIcon from "@mui/icons-material/Circle";
import InfoIcon from "@mui/icons-material/Info";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ArticleIcon from "@mui/icons-material/Article";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

function ProductInfo() {
  const [activeThumb, setActiveThumb] = useState();
  const [rev, setRev] = useState(false);
  const [det, setDet] = useState(false);
  const [info, setInfo] = useState(false);
  const [review, setreview] = useState(false);
  const [getNoRev, setGetnorev] = useState();
  // console.log("id",{id})

  let { state } = useLocation();

  const {
    title,
    images,
    ratings,
    description,
    price,
    Skincolor,
    category,
    subCategory,
    brand,
    Stock,
    SKU,
    status,
    numOfReviews,
    reviews,
  } = state ?? "";

  // console.log(images)

  console.log("no of Reviews :", numOfReviews);
  console.log("ratings:", ratings);
  console.log(reviews);
  console.log(images);
  // console.log(title.subcategory)
  // useEffect(()=>{
  //   if(numOfReviews > 0){
  //     setreview(true)
  //   }

  // })
  function Review() {
    if (numOfReviews > 0) {
      setreview(true);
    }
    setRev(true);
    setDet(false);
    setInfo(false);
  }

  function detail() {
    setDet(true);
    setRev(false);
    setInfo(false);
    setreview(false);
  }
  function Info() {
    setInfo(true);
    setDet(false);
    setRev(false);
    setreview(false);
  }
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="main">
          <h2 style={{ color: "#56606E" }}>Product Details</h2>
          <div className="top">
            <Link to="/products">
              <KeyboardBackspaceIcon className="icon" />
              <span>View Products</span>
            </Link>
          </div>

          <div className="bottom">
            <h1 className="ui dividing header" style={{ color: "#56606E" }}>
              Product Details
            </h1>
            <div className="header">
              <div className="content">
                <div className="left">
                  <div className="image">
                    <Swiper
                      loop={true}
                      spaceBetween={10}
                      thumbs={{
                        swiper:
                          activeThumb && !activeThumb.destroyed
                            ? activeThumb
                            : null,
                      }}
                      modules={[Navigation, Thumbs]}
                      grabCursor={true}
                      className="product-images-slider"
                    >
                      {!images ? (
                        <SwiperSlide>
                          <div>
                            <img src="" alt="product images" />
                          </div>
                        </SwiperSlide>
                      ) : (
                        images.map((file, index) => (
                          <SwiperSlide zoom={true} key={index}>
                            <img
                              src={file.imageUrl}
                              alt="product images"
                            />
                          </SwiperSlide>
                        ))
                      )}
                    </Swiper>
                    <Swiper
                      onSwiper={setActiveThumb}
                      loop={true}
                      spaceBetween={10}
                      slidesPerView={4}
                      modules={[Navigation, Thumbs]}
                      className="product-images-slider-thumbs"
                    >
                      {!images ? (
                        <SwiperSlide>
                          <div className="product-images-slider-thumbs-wrapper">
                            <img src="" alt="product images" />
                          </div>
                        </SwiperSlide>
                      ) : (
                        images.map((file, index) => (
                          <SwiperSlide key={index}>
                            <div className="product-images-slider-thumbs-wrapper">
                              <img
                                src={file.imageUrl}
                                alt="product images"
                              />
                            </div>
                          </SwiperSlide>
                        ))
                      )}
                    </Swiper>
                  </div>
                </div>
                <div className="between">
                  <div className="left">
                    <h2 className="ui header" style={{ color: "#56606E" }}>
                      {title}
                    </h2>
                    <div className="star">
                      <ReactStars
                        className="rate"
                        count={5}
                        size={28}
                        value={ratings}
                        color2={"#ffd700"}
                      />
                    </div>
                    <div className="desc">
                      <p>{description}</p>

                      <span>Price : Rs{price}</span>
                      <div style={{ marginTop: "10px" }}> SKU# :{SKU}</div>
                      {/* <div className="var">
                        <CircleIcon className="icon" />
                        <CircleIcon className="icon" />
                        <CircleIcon className="icon" />
                        <CircleIcon className="icon" />
                        <CircleIcon className="icon" />
                        <CircleIcon className="icon" />
                      </div> */}

                      <div className={`status ${status}`}>{status}</div>

                      <div className="stock">
                        <div className="avai">
                          Available
                          <br />
                          <span>{Stock}</span>
                        </div>
                        <div className="pending">
                          Pending
                          <br />
                          <span>400</span>
                        </div>
                        <div className="inorder">
                          Inorder
                          <br />
                          <span>400</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="right">
                    {/* <div className="img">
                      <div>Brand: {brand}</div>
                      <div>Category: {category}</div>
                      <div>SubCategory: {subCategory}</div>
                      <div>Skin: {Skincolor}</div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="info">
              <div className="ui button " onClick={() => detail()}>
                <ArticleIcon className="icon" />
                Detail
              </div>
              <div className="ui button " onClick={() => Info()}>
                <InfoIcon className="icon" />
                Info
              </div>
              <div className="ui button" onClick={() => Review()}>
                <ReviewsIcon className="icon" />
                Review
              </div>
            </div>

            {rev && !review ? (
              <div>No reviews</div>
            ) : (
              rev && reviews.map((rev) => (
                <div className="review">
                  <div className="cellWrapper">
                    <div className="img">
                      <img
                        src="https://t3.ftcdn.net/jpg/03/91/19/22/240_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
                        alt=""
                        className="image"
                      />
                    </div>
                    <div className="detail">
                      <span className="div">{rev.name}</span>
                      <div className="div">
                        <ReactStars
                          className="rate"
                          count={5}
                          size={20}
                          value={rev.rating}
                          color2={"#ffd700"}
                        />
                      </div>
                      <p className="div">{rev.comment}</p>
                    </div>
                  </div>
                  <div className="ui dividing header"></div>
                </div>
              ))
            )}

            {det && (
              <div className="detail">
                <p>{description}</p>
                <div className="">
                  <div className="div">
                    <ArrowRightIcon className="icon" />
                    Category : {category}
                  </div>
                  <div className="div">
                    <ArrowRightIcon className="icon" />
                    Sub-Category : {subCategory}
                  </div>
                  <div className="div">
                    <ArrowRightIcon className="icon" />
                    Skin Color : {Skincolor}
                  </div>
                </div>
              </div>
            )}

            {info && (
              <div className="information">
                <div className="div">
                  <ArrowRightIcon className="icon" />
                  Weight 100g
                </div>
                <div className="div">
                  <ArrowRightIcon className="icon" />
                  Glossy matte lipstick
                </div>
                <div className="div">
                  <ArrowRightIcon className="icon" />
                  Color Pink,Red,Purple
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
