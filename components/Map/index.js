import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const MapDiv = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 47%;
    margin-top: 70px;
`;

const Map = (props) => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const mapContainer = useRef();
    const map = useRef();
    const accomMarkers = useRef([]);

    useEffect(() => {
        // Render Mapbox
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
            scrollZoom: false,
        });
        map.current.addControl(new mapboxgl.NavigationControl());

        // Create bounds for map around map routes if map routes
        // array is not empty. If it is empty, fly to the first
        // activity location.
        if (props.mapTransport.length) {
            const mapBounds = new mapboxgl.LngLatBounds();
            const mapBoundsNestedArr = props.mapTransport.map((route) =>
                route
                    .filter((location) => location)
                    .map((location) => location.coordinates)
            );
            const mapBoundsFlatArr = mapBoundsNestedArr.flat(1);
            mapBoundsFlatArr.forEach((location) => {
                mapBounds.extend(location);
            });
            map.current.fitBounds(mapBounds, {
                padding: 50,
            });
        } else {
            map.current.flyTo({
                center: [
                    props.mapActivities[0].coordinates[0],
                    props.mapActivities[0].coordinates[1],
                ],
                essential: true,
                zoom: 8,
            });
        }
    }, [props.mapTransport]);

    useEffect(() => {
        // Iterate over mapRoutes and create map layer for all
        // transport routes.
        const filteredRoutes = props.mapRoutes.filter(
            (route) => route.routes.length
        );
        const featureArray = filteredRoutes.map((route) =>
            route.routes[0].legs.map((leg) =>
                leg.steps.map((step) => ({
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: step.geometry.coordinates.map((coords) => [
                            coords[0],
                            coords[1],
                        ]),
                    },
                }))
            )
        );
        const features = featureArray.flat(2);
        const geoJsonObj = {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: features,
            },
        };
        const updatedSource = {
            type: "FeatureCollection",
            features: features,
        };
        const routeLayer = {
            id: "route",
            type: "line",
            source: "route",
            layout: {
                "line-join": "round",
                "line-cap": "round",
            },
            paint: {
                "line-color": "#FF5C6E",
                "line-width": 5,
                "line-opacity": 1,
            },
        };
        const jsonString = JSON.stringify(geoJsonObj);
        const jsonObj = JSON.parse(jsonString);
        map.current.on("load", () => {
            if (map.current.getSource("route")) {
                map.current.removeLayer("route");
                map.current.getSource("route").setData(updatedSource);
                map.current.addLayer(routeLayer);
            } else {
                map.current.addSource("route", jsonObj);
                map.current.addLayer(routeLayer);
            }
        });
    }, [props.mapRoutes]);

    useEffect(() => {
        // Loop through mapMarkers to create JSON data for all
        // accommodation in selected tour.
        const featureArray = props.mapAccom.map((accom) => ({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: accom.coordinates,
            },
        }));
        const geoJsonObj = {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: featureArray,
            },
        };

        const jsonString = JSON.stringify(geoJsonObj);
        const jsonObj = JSON.parse(jsonString);

        // Add markers to map.
        jsonObj.data.features.forEach((feature) => {
            // Create an HTML element for each feature.
            const el = document.createElement("div");
            el.className = "accomMarker";

            // Make a marker for each feature and add to the map.
            new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .addTo(map.current);
        });
    }, [props.mapAccom]);

    useEffect(() => {
        // Loop through mapMarkers to create JSON data for all
        // activities in selected tour.
        const featureArray = props.mapActivities.map((activity) => ({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: activity.coordinates,
            },
        }));
        const geoJsonObj = {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: featureArray,
            },
        };

        const jsonString = JSON.stringify(geoJsonObj);
        const jsonObj = JSON.parse(jsonString);

        // Add markers to map.
        jsonObj.data.features.forEach((feature) => {
            // Create an HTML element for each feature.
            const el = document.createElement("div");
            el.className = "activityMarker";

            // Make a marker for each feature and add to the map.
            new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .addTo(map.current);
        });
    }, [props.mapActivities]);

    return <MapDiv ref={mapContainer} />;
};

export default Map;
