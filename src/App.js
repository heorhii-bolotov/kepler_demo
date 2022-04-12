import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskMiddleware} from "react-palm/tasks";
import {Provider, useDispatch} from "react-redux";
import KeplerGl from "kepler.gl";
import useSwr from "swr";
import fetchDatasets from "./utils";
import {addDataToMap} from "kepler.gl/actions";

const reducers = combineReducers({
  keplerGl: keplerGlReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function App() {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  );
}

function Map() {
    const dispatch = useDispatch();

    // console.log(process.env.REACT_APP_MAPBOX_API)
    // console.log(process.env.GCP_CREDENTIALS)

    const { data } =
      useSwr("orders", async () =>
          await fetchDatasets(), {
          revalidateOnFocus: false,
          shouldRetryOnError: false
      });

  React.useEffect(() => {
    if (data) {
        // console.log(data)
        dispatch(
          addDataToMap({
            datasets: [
                {
                    info: {
                        label: "Orders",
                        id: "orders"
                    },
                    data: data.orders
                },
                {
                    info: {
                        label: "Delivery Areas",
                        id: "delivery_areas"
                    },
                    data: data.delivery_areas
                }
            ],
            option: {
              centerMap: true,
              readOnly: false
            },
            config: {
                "visState": {
                    "filters": [
                        {
                            "dataId": [
                                "orders"
                            ],
                            "id": "6k01a3pc8",
                            "name": [
                                "created_at"
                            ],
                            "type": "timeRange",
                            "value": [
                                1633996848000,
                                1634066551000
                            ],
                            "enlarged": false,
                            "plotType": "histogram",
                            "animationWindow": "free",
                            "yAxis": null,
                            "speed": 1
                        }
                    ],
                    "layers": [
                        {
                            "id": "om05397",
                            "type": "cluster",
                            "config": {
                                "dataId": "orders",
                                "label": "Price Density",
                                "color": [
                                    248,
                                    149,
                                    112
                                ],
                                "highlightColor": [
                                    252,
                                    242,
                                    26,
                                    255
                                ],
                                "columns": {
                                    "lat": "order_latitude",
                                    "lng": "order_longitude"
                                },
                                "isVisible": false,
                                "visConfig": {
                                    "opacity": 0.3,
                                    "clusterRadius": 40,
                                    "colorRange": {
                                        "name": "Uber Viz Diverging 2",
                                        "type": "diverging",
                                        "category": "Uber",
                                        "colors": [
                                            "#00939C",
                                            "#65B3BA",
                                            "#A2D4D7",
                                            "#FEEEE8",
                                            "#F5B097",
                                            "#E17449",
                                            "#C22E00"
                                        ]
                                    },
                                    "radiusRange": [
                                        0,
                                        10
                                    ],
                                    "colorAggregation": "average"
                                },
                                "hidden": false,
                                "textLabel": [
                                    {
                                        "field": null,
                                        "color": [
                                            255,
                                            255,
                                            255
                                        ],
                                        "size": 18,
                                        "offset": [
                                            0,
                                            0
                                        ],
                                        "anchor": "start",
                                        "alignment": "center"
                                    }
                                ]
                            },
                            "visualChannels": {
                                "colorField": null,
                                "colorScale": "quantile"
                            }
                        },
                        {
                            "id": "by16n19",
                            "type": "cluster",
                            "config": {
                                "dataId": "orders",
                                "label": "Popular Suppliers",
                                "color": [
                                    248,
                                    149,
                                    112
                                ],
                                "highlightColor": [
                                    252,
                                    242,
                                    26,
                                    255
                                ],
                                "columns": {
                                    "lat": "order_latitude",
                                    "lng": "order_longitude"
                                },
                                "isVisible": false,
                                "visConfig": {
                                    "opacity": 0.3,
                                    "clusterRadius": 30,
                                    "colorRange": {
                                        "name": "Uber Viz Qualitative 4",
                                        "type": "qualitative",
                                        "category": "Uber",
                                        "colors": [
                                            "#12939A",
                                            "#DDB27C",
                                            "#88572C",
                                            "#FF991F",
                                            "#F15C17",
                                            "#223F9A",
                                            "#DA70BF",
                                            "#125C77",
                                            "#4DC19C",
                                            "#776E57",
                                            "#17B8BE",
                                            "#F6D18A",
                                            "#B7885E",
                                            "#FFCB99",
                                            "#F89570",
                                            "#829AE3",
                                            "#E79FD5",
                                            "#1E96BE",
                                            "#89DAC1",
                                            "#B3AD9E"
                                        ]
                                    },
                                    "radiusRange": [
                                        1,
                                        10
                                    ],
                                    "colorAggregation": "mode"
                                },
                                "hidden": false,
                                "textLabel": [
                                    {
                                        "field": null,
                                        "color": [
                                            255,
                                            255,
                                            255
                                        ],
                                        "size": 18,
                                        "offset": [
                                            0,
                                            0
                                        ],
                                        "anchor": "start",
                                        "alignment": "center"
                                    }
                                ]
                            },
                            "visualChannels": {
                                "colorField": null,
                                "colorScale": "quantile"
                            }
                        },
                        {
                            "id": "qqslzk",
                            "type": "heatmap",
                            "config": {
                                "dataId": "orders",
                                "label": "Orders Density",
                                "color": [
                                    255,
                                    153,
                                    31
                                ],
                                "highlightColor": [
                                    252,
                                    242,
                                    26,
                                    255
                                ],
                                "columns": {
                                    "lat": "order_latitude",
                                    "lng": "order_longitude"
                                },
                                "isVisible": true,
                                "visConfig": {
                                    "opacity": 0.83,
                                    "colorRange": {
                                        "name": "Global Warming",
                                        "type": "sequential",
                                        "category": "Uber",
                                        "colors": [
                                            "#5A1846",
                                            "#900C3F",
                                            "#C70039",
                                            "#E3611C",
                                            "#F1920E",
                                            "#FFC300"
                                        ]
                                    },
                                    "radius": 5
                                },
                                "hidden": false,
                                "textLabel": [
                                    {
                                        "field": null,
                                        "color": [
                                            255,
                                            255,
                                            255
                                        ],
                                        "size": 18,
                                        "offset": [
                                            0,
                                            0
                                        ],
                                        "anchor": "start",
                                        "alignment": "center"
                                    }
                                ]
                            },
                            "visualChannels": {
                                "weightField": null,
                                "weightScale": "linear"
                            }
                        },
                        {
                            "id": "1fj7vui",
                            "type": "geojson",
                            "config": {
                                "dataId": "delivery_areas",
                                "label": "Delivery Areas",
                                "color": [
                                    248,
                                    149,
                                    112
                                ],
                                "highlightColor": [
                                    252,
                                    242,
                                    26,
                                    255
                                ],
                                "columns": {
                                    "geojson": "borders"
                                },
                                "isVisible": true,
                                "visConfig": {
                                    "opacity": 0.8,
                                    "strokeOpacity": 0.8,
                                    "thickness": 0.5,
                                    "strokeColor": [
                                        229,
                                        229,
                                        228
                                    ],
                                    "colorRange": {
                                        "name": "Global Warming",
                                        "type": "sequential",
                                        "category": "Uber",
                                        "colors": [
                                            "#5A1846",
                                            "#900C3F",
                                            "#C70039",
                                            "#E3611C",
                                            "#F1920E",
                                            "#FFC300"
                                        ]
                                    },
                                    "strokeColorRange": {
                                        "name": "Global Warming",
                                        "type": "sequential",
                                        "category": "Uber",
                                        "colors": [
                                            "#5A1846",
                                            "#900C3F",
                                            "#C70039",
                                            "#E3611C",
                                            "#F1920E",
                                            "#FFC300"
                                        ]
                                    },
                                    "radius": 10,
                                    "sizeRange": [
                                        0,
                                        10
                                    ],
                                    "radiusRange": [
                                        0,
                                        50
                                    ],
                                    "heightRange": [
                                        0,
                                        500
                                    ],
                                    "elevationScale": 5,
                                    "enableElevationZoomFactor": true,
                                    "stroked": true,
                                    "filled": false,
                                    "enable3d": false,
                                    "wireframe": false
                                },
                                "hidden": false,
                                "textLabel": [
                                    {
                                        "field": null,
                                        "color": [
                                            255,
                                            255,
                                            255
                                        ],
                                        "size": 18,
                                        "offset": [
                                            0,
                                            0
                                        ],
                                        "anchor": "start",
                                        "alignment": "center"
                                    }
                                ]
                            },
                            "visualChannels": {
                                "colorField": null,
                                "colorScale": "quantile",
                                "strokeColorField": null,
                                "strokeColorScale": "quantile",
                                "sizeField": null,
                                "sizeScale": "linear",
                                "heightField": null,
                                "heightScale": "linear",
                                "radiusField": null,
                                "radiusScale": "linear"
                            }
                        },
                        {
                            "id": "xneo0oj",
                            "type": "arc",
                            "config": {
                                "dataId": "orders",
                                "label": "Delivery Routes",
                                "color": [
                                    158,
                                    215,
                                    159
                                ],
                                "highlightColor": [
                                    252,
                                    242,
                                    26,
                                    255
                                ],
                                "columns": {
                                    "lat0": "supplier_latitude",
                                    "lng0": "supplier_longitude",
                                    "lat1": "order_latitude",
                                    "lng1": "order_longitude"
                                },
                                "isVisible": true,
                                "visConfig": {
                                    "opacity": 0.8,
                                    "thickness": 1,
                                    "colorRange": {
                                        "name": "Global Warming",
                                        "type": "sequential",
                                        "category": "Uber",
                                        "colors": [
                                            "#5A1846",
                                            "#900C3F",
                                            "#C70039",
                                            "#E3611C",
                                            "#F1920E",
                                            "#FFC300"
                                        ]
                                    },
                                    "sizeRange": [
                                        0,
                                        10
                                    ],
                                    "targetColor": [
                                        240,
                                        109,
                                        109
                                    ]
                                },
                                "hidden": false,
                                "textLabel": [
                                    {
                                        "field": null,
                                        "color": [
                                            255,
                                            255,
                                            255
                                        ],
                                        "size": 18,
                                        "offset": [
                                            0,
                                            0
                                        ],
                                        "anchor": "start",
                                        "alignment": "center"
                                    }
                                ]
                            },
                            "visualChannels": {
                                "colorField": null,
                                "colorScale": "quantile",
                                "sizeField": null,
                                "sizeScale": "linear"
                            }
                        }
                    ],
                    "interactionConfig": {
                        "tooltip": {
                            "fieldsToShow": {
                                "orders": [
                                    {
                                        "name": "created_at",
                                        "format": null
                                    },
                                    {
                                        "name": "price",
                                        "format": null
                                    },
                                    {
                                        "name": "supplier_type",
                                        "format": null
                                    },
                                    {
                                        "name": "supplier",
                                        "format": null
                                    },
                                    {
                                        "name": "order_picked_up_at",
                                        "format": null
                                    },
                                    {
                                        "name": "completed_by_supplier_at",
                                        "format": null
                                    },
                                    {
                                        "name": "order_id",
                                        "format": null
                                    }
                                ],
                                "delivery_areas": [
                                    {
                                        "name": "delivery_area",
                                        "format": null
                                    },
                                    {
                                        "name": "created_at",
                                        "format": null
                                    },
                                    {
                                        "name": "city",
                                        "format": null
                                    },
                                    {
                                        "name": "country",
                                        "format": null
                                    }
                                ]
                            },
                            "compareMode": false,
                            "compareType": "absolute",
                            "enabled": true
                        },
                        "brush": {
                            "size": 0.5,
                            "enabled": false
                        },
                        "geocoder": {
                            "enabled": false
                        },
                        "coordinate": {
                            "enabled": false
                        }
                    },
                    "layerBlending": "normal",
                    "splitMaps": [],
                    "animationConfig": {
                        "currentTime": null,
                        "speed": 1
                    }
                },
                "mapState": {
                    "bearing": 0,
                    "dragRotate": false,
                    "latitude": 50.328076648906126,
                    "longitude": 28.3708480367975,
                    "pitch": 0,
                    "zoom": 9.522668173044464,
                    "isSplit": false
                },
                "mapStyle": {
                    "styleType": "dark",
                    "topLayerGroups": {},
                    "visibleLayerGroups": {
                        "label": true,
                        "road": true,
                        "border": true,
                        "building": true,
                        "water": true,
                        "land": true,
                        "3d building": false
                    },
                    "threeDBuildingColor": [
                        9.665468314072013,
                        17.18305478057247,
                        31.1442867897876
                    ],
                    "mapStyles": {}
                }
            }
          })
      );
    }
  }, [dispatch, data]);

  return (
    <KeplerGl
      id="bi"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
