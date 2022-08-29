import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [dataLatLon, setDataLatLon] = useState({ lat: 0, lon: 0 });

  const Cordinates = () => {
    const map = useMapEvents({
      click: (e) => {
        setDataLatLon({ lat: e.latlng.lat, lon: e.latlng.lng });
        console.log(dataLatLon);
      },
    });
    return null;
  };

  const [data, setData] = useState({});

  const base =
    "https://api.openweathermap.org/data/2.5/forecast?appid=2864c037ed39e8c864f7c0ab7e3d8a0a";

  useEffect(() => {
    axios
      .get(
        base +
          "&lat=" +
          dataLatLon.lat +
          "&lon=" +
          dataLatLon.lon +
          "&units=metric&lang=da"
      )
      .then((res) => {
        console.log(data);
        setData(res.data);
        console.log(res.data);
        return res.data;
      })

      .catch((error) => {
        console.error(error);
        return null;
      });
  }, [dataLatLon]);

  const [myspot, setMyspot] = useState("");

  const position = [56.52635293804066, 9.614244537563335];
  useEffect(() => {
    setMyspot(
      L.icon({
        iconUrl: "/assets/icon/weatherIcon.svg",
        iconSize: [80, 80],
        iconAnchor: [40, 65],
      })
    );
  }, []);
  return (
    <div id="content">
      <MapContainer center={position} zoom={7} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>

        <Marker position={dataLatLon} icon={myspot}>
          <Popup>
            <>
          <h2>{data.city?.name || data.city?.country || "Hverken by eller land blev fundet"}</h2>

              <button>
                <Link to={{ pathname: "/moreData", state: data }}>
                  Vejr 
                </Link>
              </button>
            </>
          </Popup>
        </Marker>

        <Cordinates />
      </MapContainer>
    </div>
  );
};

export default Home;
