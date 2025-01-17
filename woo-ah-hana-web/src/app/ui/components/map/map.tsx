"use client"
 
import Script from "next/script";
import { useCallback, useRef } from "react";

type Lng = number;
type Lat = number;
export type NaverMap = naver.maps.Map;
export type Coordinates = [Lng, Lat]
 
const mapId = "naver-map";
 
// TODO: 마커를 찍었지만 마커가 나오지 않는다 ...
export default function Map({ loc }: { loc: string[] }) {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = useCallback(() => {
    naver.maps.onJSContentLoaded = function(){
      const points:naver.maps.Point[] = [];

      for(let i=0; i<loc.length; i++){
        naver.maps.Service.geocode({
          query: loc[i]
        }, function(status, response){
          const item = response.v2.addresses[0];
          const point = new naver.maps.Point(item.x as unknown as number, item.y as unknown as number);
          points.push(point);
        })
      }

      naver.maps.Service.geocode({
        query: loc[0]
      }, function(status, response){
        const item = response.v2.addresses[0];
        const point = new naver.maps.Point(item.x as unknown as number, item.y as unknown as number);

        const mapOptions = {
          center:  new window.naver.maps.LatLng([point.x, point.y]),
          zoom: 15,
          scaleControl: true,
          mapDataControl: true,
          logoControlOptions: {
            position: naver.maps.Position.BOTTOM_LEFT,
          },
        };
        const map = new window.naver.maps.Map(mapId, mapOptions);

        const latlngs = points.map((value)=>{return new window.naver.maps.LatLng(value.x, value.y)})
        
        for(let i=0; i<latlngs.length; i++){
          const marker = new window.naver.maps.Marker({
            map: map,
            position: latlngs[i],
            zIndex: 100
          })
          console.log(marker);
        }
        mapRef.current = map;
      });
    }
    
  }, [loc]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}&submodules=geocoder`}
        async={true}
        onReady={initializeMap}
      ></Script>

      <div id={mapId} className="aspect-video rounded-lg"/>
    </>
  );
}