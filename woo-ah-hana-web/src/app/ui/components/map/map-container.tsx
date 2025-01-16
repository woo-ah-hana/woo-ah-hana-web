"use client";
 
import { useEffect, useState } from "react";
import { Coordinates } from "./map";
import Map from "./map";
import { Card } from "../../molecule/card/card";
 
export default function MapContainer() {
  const [loc, setLoc] = useState<Coordinates>();
 
  const initLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc([position.coords.longitude, position.coords.latitude]);
    });
  };
 
  useEffect(() => {
    initLocation();
  }, []);
 
  return loc && 
  <Card>
    <Map loc={loc} />
  </Card>
  
}