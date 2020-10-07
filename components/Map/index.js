import { useEffect, useRef, useContext } from "react";
import { Context } from "../../context/context";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";
import * as geoJson from "../../util/geojson";

const MapDiv = styled.div`
    height: calc(100vh - 70px);
    width: calc(100% - 640px);
    position: fixed;
`;

const Map = (props) => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const mapContainer = useRef();
    const map = useRef();
    const { darkMode } = useContext(Context);

    useEffect(() => {
        // Render Mapbox.
        const renderMap = () => {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: darkMode.value
                    ? process.env.NEXT_PUBLIC_MAPBOX_STYLE_DARK
                    : process.env.NEXT_PUBLIC_MAPBOX_STYLE_LIGHT,
                scrollZoom: false,
            });
            map.current.addControl(new mapboxgl.NavigationControl());
        };
        // Create bounds for map around map routes.
        const setMapBounds = () => {
            const mapBounds = new mapboxgl.LngLatBounds();
            const transportRoutes = props.mapTransport.flatMap((route) =>
                route
                    .filter((location) => location)
                    .map((location) => location.coordinates)
            );
            transportRoutes.forEach((location) => {
                mapBounds.extend(location);
            });
            map.current.fitBounds(mapBounds, {
                padding: 50,
            });
        };
        // Fly to first activity location (to be used if there are
        // no map routes).
        const flyToActivityLocation = () => {
            map.current.flyTo({
                center: [
                    props.mapActivities[0].coordinates[0],
                    props.mapActivities[0].coordinates[1],
                ],
                essential: true,
                zoom: 12,
            });
        };

        // Check if there are map routes to create map bounds, if not,
        // fly to first activity location. (some one-day tours only have
        // one activity location and no transport routes)
        if (props.mapTransport && props.mapTransport.length) {
            renderMap();
            setMapBounds();
        } else if (props.mapActivites && !props.mapTransport.length) {
            renderMap();
            flyToActivityLocation();
        } else {
            renderMap();
        }
    }, [props.mapTransport]);

    useEffect(() => {
        // Switch map style on dark-mode toggle.
        const switchMapStyle = () => {
            map.current.setStyle(
                darkMode.value
                    ? process.env.NEXT_PUBLIC_MAPBOX_STYLE_DARK
                    : process.env.NEXT_PUBLIC_MAPBOX_STYLE_LIGHT
            );
        };
        switchMapStyle();
    }, [darkMode.value]);

    useEffect(() => {
        // Create geoJson map layer for map routes.
        let features, source, updatedSource, layer;
        const parseRoutesFeatures = () => {
            const transportRoutes = props.mapRoutes.filter(
                (route) => route.routes.length
            );
            features = transportRoutes
                .flatMap((route) =>
                    route.routes[0].legs.map((leg) =>
                        leg.steps.map((step) => ({
                            type: "Feature",
                            geometry: {
                                type: "LineString",
                                coordinates: step.geometry.coordinates.map(
                                    (coords) => [coords[0], coords[1]]
                                ),
                            },
                        }))
                    )
                )
                .flat();
        };
        const parseRoutesSource = () => {
            source = geoJson.geoJson(features);
        };
        const parseRoutesLayer = () => {
            layer = geoJson.routeLayer;
        };
        const updateRoutesSource = () => {
            updatedSource = geoJson.updatedSource(features);
        };
        const checkForMapSource = () => {
            if (map.current.getSource("route")) {
                map.current.removeLayer("route");
                map.current.getSource("route").setData(updatedSource);
                map.current.addLayer(layer);
            } else {
                map.current.addSource("route", source);
                map.current.addLayer(layer);
            }
        };
        const renderMapRoutes = () => {
            map.current.on("load", () => {
                checkForMapSource();
            });
        };
        const renderMapStyle = () => {
            map.current.on("style.load", function () {
                checkForMapSource();
            });
        };

        if (props.mapRoutes) {
            parseRoutesFeatures();
            parseRoutesSource();
            parseRoutesLayer();
            updateRoutesSource();
            renderMapRoutes();
            renderMapStyle(); // re-add map routes layer after dark-mode map style toggle
        }
    }, [props.mapRoutes, darkMode.value]);

    useEffect(() => {
        // Loop through mapMarkers to create JSON data for all
        // accommodation in selected tour.
        let features, source;
        const parseAccomFeatures = () => {
            features = props.mapAccom.map((accom) => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: accom.coordinates,
                },
            }));
        };
        const parseAccomSource = () => {
            source = geoJson.geoJson(features);
        };
        const renderAccomMarkers = () => {
            source.data.features.forEach((feature) => {
                const el = document.createElement("div");
                el.className = "accomMarker";
                new mapboxgl.Marker(el)
                    .setLngLat(feature.geometry.coordinates)
                    .addTo(map.current);
            });
        };

        if (props.mapAccom) {
            parseAccomFeatures();
            parseAccomSource();
            renderAccomMarkers();
        }
    }, [props.mapAccom]);

    useEffect(() => {
        // Loop through mapMarkers to create JSON data for all
        // activities in selected tour.
        let features, source;
        const parseActivityFeatures = () => {
            features = props.mapActivities.map((activity) => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: activity.coordinates,
                },
            }));
        };
        const parseActivitySource = () => {
            source = geoJson.geoJson(features);
        };
        const renderActivityMarkers = () => {
            source.data.features.forEach((feature) => {
                const el = document.createElement("div");
                el.className = "activityMarker";
                new mapboxgl.Marker(el)
                    .setLngLat(feature.geometry.coordinates)
                    .addTo(map.current);
            });
        };

        if (props.mapActivities) {
            parseActivityFeatures();
            parseActivitySource();
            renderActivityMarkers();
        }
    }, [props.mapActivities]);

    return <MapDiv ref={mapContainer} />;
};

export default Map;
