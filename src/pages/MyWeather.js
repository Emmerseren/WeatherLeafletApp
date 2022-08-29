import React from "react";
import "./Home.scss";
import { arrowBack } from "ionicons/icons";
import { IonFabButton, IonFab, IonIcon, IonCard, IonRow } from "@ionic/react";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MyWeather = () => {
  const location = useLocation();
  const data = location.state;

  console.log(data);
  return (
    <div className="Weather__Content">
      <IonFab className="icon" vertical="top" horizontal="start" slot="fixed">
        <Link to="/">
          <IonFabButton className="back__Icon">
            <IonIcon icon={arrowBack} />
          </IonFabButton>
        </Link>
      </IonFab>

      <IonRow class="header">

      <IonFab className="icon" vertical="top" horizontal="start" slot="fixed">
        <Link to="/">
          <IonFabButton className="back__Icon">
            <IonIcon icon={arrowBack} />
          </IonFabButton>
        </Link>
      </IonFab>

        <h2 className="header__Weather">
        <i>Land:</i><b> {data?.city?.country}</b>  <br />
         <i>By:</i><b> {data?.city.name}</b>
        </h2>
      </IonRow>
      <IonCard class="card">
        <div>
          <img
            className="Weather__Icon"
            src={
              "https://openweathermap.org/img/wn/" +
              data?.list[0].weather[0].icon +
              "@2x.png"
            }
            alt=""
          />
          <p>{data.list[0].weather[0].description}</p>
        </div>
        <p>{Math.round(data.list[0].main.temp)} C°</p>
        <p>Luftfugtighed: {data.list[0].main.humidity}%</p>
        <p>Vind: {Math.round(data.list[0].wind.speed)} M/S</p>
      </IonCard>
<IonCard className="slidercard">

      <Swiper
        modules={[ Pagination]}
        Pagination={true}
        slidesPerView={5}
        EffectCards={true}
        className="Swiper"
  
      >
        {data.list.map((index) => (
          <SwiperSlide key={index.id}>

          
           <p>{new Intl.DateTimeFormat("da-DK", {  weekday: "long", hour: "2-digit", minute: "2-digit" }).format(new Date(index.dt_txt)).replace("den ", "")}</p>
          <div>
           <img src={ "https://openweathermap.org/img/wn/" + index.weather[0].icon +"@2x.png"} alt="" />
            <p>{Math.round(index.main.temp)} C°</p>

          </div>
          </SwiperSlide>
        ))}
      </Swiper>
        </IonCard>
    </div>
  );
};

export default MyWeather;
