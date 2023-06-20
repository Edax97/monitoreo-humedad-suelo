import {
  GoogleMap,
  InfoWindow,
  MarkerF as Marker,
  PolygonF as Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import { PlantacionType } from "../../../api/plant-list-api";
import LoadingComponent from "../../common/loading/LoadingComponent";
import EquipoInfo from "./EquipoInfo";

interface LatLng {
  lat: number;
  lng: number;
}

const polygonOptions = {
  strokeColor: "red",
  strokeOpacity: 0.5,
  strokeWeight: 3.0,
  fillColor: "red",
  fillOpacity: 0.1,
};

interface Props {
  plantList: PlantacionType[];
}
export default function PlantsMap(props: Props) {
  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: "48rem",
    }),
    []
  );
  const zoom = useMemo(() => 17, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
  });
  const [center, plantList] = useMemo(() => {
    const center = { lat: 0, lng: 0 };
    const plantList = props.plantList.map(
      ({ plant_coordenadas, ...restPlant }, j) => {
        const [lat, lng] = plant_coordenadas.split(",");
        center.lat = (center.lat * j + +lat) / (j + 1);
        center.lng = (center.lng * j + +lng) / (j + 1);
        return { ...restPlant, plant_coordenadas: { lat: +lat, lng: +lng } };
      }
    );
    return [center, plantList];
  }, [props.plantList]);

  const [mapRef, setMapRef] = useState<google.maps.Map>();
  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  const [infoIndex, setInfoIndex] = useState<number | null>(null);
  const onMarker = (index: number, coords: LatLng) => {
    if (!mapRef) return;
    mapRef.panTo(coords);
    setInfoIndex(index);
  };

  if (!isLoaded) return <LoadingComponent />;
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={zoom}
      center={center}
      onLoad={onMapLoad}
      onClick={() => setInfoIndex(null)}
    >
      {plantList.map((plant, j) => (
        <>
          <Marker
            key={`m-${j}`}
            position={plant.plant_coordenadas}
            onClick={() => onMarker(j, plant.plant_coordenadas)}
          >
            {infoIndex === j && (
              <InfoWindow
                onCloseClick={() => setInfoIndex(null)}
                options={{ maxWidth: 300 }}
              >
                <EquipoInfo sensorLista={plant.lista_equipos[0].sensor_Lista} />
              </InfoWindow>
            )}
          </Marker>
          <Polygon
            key={`p-${j}`}
            options={polygonOptions}
            paths={plant.lista_puntos.map((punto) => ({
              lat: +punto.punto_lat,
              lng: +punto.punto_lon,
            }))}
          />
        </>
      ))}
      <></>
    </GoogleMap>
  );
}

//export default React.memo(PlantsMap);
