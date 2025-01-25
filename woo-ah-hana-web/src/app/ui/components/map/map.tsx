"use client";

import Script from "next/script";
import { useCallback, useRef } from "react";

export type NaverMap = naver.maps.Map;

const mapId = "naver-map";

export default function Map({ loc }: { loc: string[] }) {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = useCallback(() => {
    naver.maps.onJSContentLoaded = function () {
      const promises = loc.map(
        (address) =>
          new Promise<naver.maps.Point | null>((resolve) => {
            naver.maps.Service.geocode({ query: address }, (status, response) => {
              if (status === naver.maps.Service.Status.OK && response.v2.addresses.length > 0) {
                const item = response.v2.addresses[0];
                resolve(new naver.maps.Point(parseFloat(item.x), parseFloat(item.y)));
              } else {
                resolve(null);
              }
            });
          })
      );

      Promise.all(promises).then((points) => {
        const validPoints = points.filter((point): point is naver.maps.Point => point !== null);

        if (validPoints.length > 0) {
          const centerPoint = validPoints[0];
          const mapOptions = {
            center: new naver.maps.LatLng(centerPoint.y, centerPoint.x),
            zoom: 10,
            scaleControl: true,
            mapDataControl: true,
            logoControlOptions: {
              position: naver.maps.Position.BOTTOM_LEFT,
            },
          };
          const map = new naver.maps.Map(mapId, mapOptions);
          mapRef.current = map;

          validPoints.forEach((point) => {
            new naver.maps.Marker({
              map: map,
              position: new naver.maps.LatLng(point.y, point.x),
              zIndex: 100,
            });
          });
        }
      });
    };
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
      <div id={mapId} className="aspect-video rounded-lg" />
    </>
  );
}
