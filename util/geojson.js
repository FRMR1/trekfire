export const routeLayer = {
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

export const geoJson = (features) => {
    return {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: features,
        },
    };
};

export const updatedSource = (features) => {
    return {
        type: "FeatureCollection",
        features: features,
    };
};
