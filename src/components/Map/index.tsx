// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import SectionTitle from "../common/SectionTitle";
// import { Geocoder } from "@mapbox/search-js-react";

// interface PointD {
//   id: string;
//   nom: string;
//   institution: string;
//   telephone: string;
//   arrondissement: string;
//   longitude: number;
//   lagitude: number;
// }

// const Map = () => {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);
//   const [Pdepot, setpointD] = useState<PointD[]>([]);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoieXZhbi1lemVraWVsIiwiYSI6ImNseTg4dzdtMTA4YXYya3NmMGs4emgybjAifQ.3yFqzILb3xMIS5gkDehRCQ";

//     if (mapContainerRef.current) {
//       mapRef.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: "mapbox://styles/mapbox/streets-v12",
//         center: [10.4166667, 5.466667],
//         zoom: 11.15,
//       });

//       mapRef.current.on("load", () => {
//         setMapLoaded(true);
//       });

//       mapRef.current.addControl(new mapboxgl.NavigationControl());
//     }

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     async function fetchPoint() {
//       try {
//         const response = await fetch("/api/point_depot");
//         const data = await response.json();
//         if (data.success) {
//           setpointD(data.data);
//         } else {
//           console.log("Oups, quelque chose s'est mal passé");
//         }
//       } catch (error) {
//         console.log("Oups, quelque chose s'est mal passé, essayez encore");
//       }
//     }
//     fetchPoint();
//   }, []);

//   useEffect(() => {
//     if (mapLoaded && mapRef.current && Pdepot.length > 0) {
//       const filteredPoints = Pdepot.filter((point) =>
//         point.nom.toLowerCase().includes(searchTerm.toLowerCase()),
//       );

//       const features = filteredPoints.map((point) => ({
//         type: "Feature",
//         properties: {
//           description: `<strong>${point.nom}</strong><br>${point.institution}<br>${point.telephone}<br>${point.arrondissement}`,
//           icon: "marker",
//         },
//         geometry: {
//           type: "Point",
//           coordinates: [point.longitude, point.lagitude],
//         },
//       }));

//       const geojson = {
//         type: "FeatureCollection",
//         features: features,
//       };

//       if (mapRef.current.getSource("places")) {
//         (mapRef.current.getSource("places") as mapboxgl.GeoJSONSource).setData(
//           geojson,
//         );
//       } else {
//         mapRef.current.addSource("places", {
//           type: "geojson",
//           data: geojson,
//         });

//         mapRef.current.addLayer({
//           id: "places",
//           type: "symbol",
//           source: "places",
//           layout: {
//             "icon-image": ["get", "icon"],
//             "icon-allow-overlap": true,
//           },
//         });

//         mapRef.current.on("click", "places", (e) => {
//           const coordinates = e.features[0].geometry.coordinates.slice();
//           const description = e.features[0].properties.description;

//           while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//           }

//           new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(description)
//             .addTo(mapRef.current!);
//         });

//         mapRef.current.on("mouseenter", "places", () => {
//           if (mapRef.current) {
//             mapRef.current.getCanvas().style.cursor = "pointer";
//           }
//         });

//         mapRef.current.on("mouseleave", "places", () => {
//           if (mapRef.current) {
//             mapRef.current.getCanvas().style.cursor = "";
//           }
//         });
//       }
//     }
//   }, [mapLoaded, Pdepot, searchTerm]);

//   const handleSearch = () => {
//     // Triggered when the search button is clicked
//     // You can add additional logic here if needed
//     // For now, we update the state to trigger the useEffect
//     // and filter the points based on the searchTerm
//     mapRef.current?.getSource("places")?.setData({
//       type: "FeatureCollection",
//       features: [],
//     });
//     mapRef.current?.setFilter("places", ["==", "nom", searchTerm]);
//   };

//   return (
//     <section className="relative z-10 px-5 py-16 dark:bg-[#181c24] md:px-4 md:py-20 lg:px-4 lg:py-28">
//       <div className="container">
//         <SectionTitle
//           title="Localisation"
//           paragraph="Nos points de depôts"
//           center
//         />
//         <div className="mb-4 flex items-center justify-center">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Rechercher par nom..."
//             className="border-gray-300 rounded-l border p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={handleSearch}
//             className="rounded-r bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             Rechercher
//           </button>
//         </div>
//         <Geocoder
//           accessToken={mapboxgl.accessToken}
//           map={mapRef.current}
//           mapboxgl={mapboxgl}
//           value={inputValue}
//           onChange={(d) => {
//             setInputValue(d);
//           }}
//           marker
//         />
//         <div ref={mapContainerRef} style={{ height: "70vh" }} />
//       </div>
//     </section>
//   );
// };

// export default Map;

"use client";

import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import SectionTitle from "../common/SectionTitle";

import "mapbox-gl/dist/mapbox-gl.css";
import { Geocoder } from "@mapbox/search-js-react";

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
    <section className=" relative z-10 px-5 py-16 dark:bg-[#181c24] md:px-4 md:py-20 lg:px-4 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Localisation"
          paragraph="Nos points de depôts"
          center
        />
        <Geocoder
          accessToken={mapboxgl.accessToken}
          map={mapRef.current}
          mapboxgl={mapboxgl}
          value={inputValue}
          onChange={(d) => {
            setInputValue(d);
          }}
          marker
        />
        <div ref={mapContainerRef} style={{ height: "70vh" }} />
      </div>
    </section>
  );
};

export default Map;
