"use client";

import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import SectionTitle from "../common/SectionTitle";

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoieXZhbi1lemVraWVsIiwiYSI6ImNseTg4dzdtMTA4YXYya3NmMGs4emgybjAifQ.3yFqzILb3xMIS5gkDehRCQ";

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [10.4166667, 5.466667],
        zoom: 11.15,
      });

      mapRef.current.on("load", () => {
        setMapLoaded(true);

        mapRef.current?.addSource("places", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  description: "<strong>Comissariat de Bamougoum</strong>",
                  icon: "police",
                },
                geometry: {
                  type: "Point",
                  coordinates: [10.2921334, 5.5001265],
                },
              },
              {
                type: "Feature",
                properties: {
                  description:
                    "<strong>Comissariat du 4ème arrondissement</strong><br><p>Bafoussam I</p>",
                  icon: "police",
                },
                geometry: {
                  type: "Point",
                  coordinates: [10.4071216, 5.4746532],
                },
              },
              {
                type: "Feature",
                properties: {
                  description:
                    "<strong>Comissariat central</strong><br><p>Bafoussam I</p>",
                  icon: "police",
                },
                geometry: {
                  type: "Point",
                  coordinates: [10.4166385, 5.4741142],
                },
              },
            ],
          },
        });

        mapRef.current?.addLayer({
          id: "places",
          type: "symbol",
          source: "places",
          layout: {
            "icon-image": ["get", "icon"],
            "icon-allow-overlap": true,
          },
        });

        mapRef.current?.on("click", "places", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(mapRef.current!);
        });

        mapRef.current?.on("mouseenter", "places", () => {
          if (mapRef.current) {
            mapRef.current.getCanvas().style.cursor = "pointer";
          }
        });

        mapRef.current?.on("mouseleave", "places", () => {
          if (mapRef.current) {
            mapRef.current.getCanvas().style.cursor = "";
          }
        });
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl());
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <section className=" xs:px-4 relative z-10 px-10 py-16 dark:bg-[#181c24] md:px-4 md:py-20 lg:px-4 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Localisation"
          paragraph="Nos points de depôts"
          center
        />

        <div ref={mapContainerRef} style={{ height: "70vh" }} />
      </div>
    </section>
  );
};

export default Map;
