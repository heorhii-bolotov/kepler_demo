const {BigQuery} = require('@google-cloud/bigquery');

const CONFIG = {
    LOCATION: 'us-west1',
    GCP_CREDENTIALS: {
        credentials: {
            "client_id": "32555940559.apps.googleusercontent.com",
            "client_secret": "ZmssLNjJy2998hD4CTg2ejr2",
            "refresh_token": "1//098MguckVDTZBCgYIARAAGAkSNwF-L9Iroa1LmKC_kDPBvJFma1OH6fo-yNHtO_BheRvJq017gaHt0VFaNfytX_FVOqJD-a7_Wmw",
            "type": "authorized_user"
        },
        projectId: 'playground-s-11-e9a7f078',
    },
    DATASETS_PARAMS: {
        orders: {
            sqlQuery: `SELECT * FROM demo.Orders;`,
            fields: [
                {
                    "name": "order_id",
                    "format": "",
                    "type": "integer"
                },
                {
                    "name": "created_at",
                    "format": "YYYY-M-D H:m:s",
                    "type": "timestamp"
                },
                {
                    "name": "order_picked_up_at",
                    "format": "YYYY-M-D H:m:s",
                    "type": "timestamp"
                },
                {
                    "name": "completed_by_supplier_at",
                    "format": "YYYY-M-D H:m:s",
                    "type": "timestamp"
                },
                {
                    "name": "user_id",
                    "format": "",
                    "type": "integer"
                },
                {
                    "name": "price",
                    "format": "",
                    "type": "real"
                },
                {
                    "name": "supplier_id",
                    "format": "",
                    "type": "integer"
                },
                {
                    "name": "supplier",
                    "format": "",
                    "type": "string"
                },
                {
                    "name": "supplier_type",
                    "format": "",
                    "type": "string"
                },
                {
                    "name": "supplier_longitude",
                    "format": "",
                    "type": "real"
                },
                {
                    "name": "supplier_latitude",
                    "format": "",
                    "type": "real"
                },
                {
                    "name": "order_longitude",
                    "format": "",
                    "type": "real"
                },
                {
                    "name": "order_latitude",
                    "format": "",
                    "type": "real"
                }
            ]
        },
        delivery_areas: {
            sqlQuery: `SELECT * FROM demo.Areas;`,
            fields: [
                {
                    "name": "delivery_area",
                    "format": "",
                    "type": "string"
                },
                {
                    "name": "borders",
                    "format": "",
                    "type": "geojson"
                },
                {
                    "name": "created_at",
                    "format": "YYYY-M-D H:m:s",
                    "type": "timestamp"
                },
                {
                    "name": "city",
                    "format": "",
                    "type": "string"
                },
                {
                    "name": "country",
                    "format": "",
                    "type": "string"
                },
            ]
        }
    }
};

const bigquery = new BigQuery(CONFIG.GCP_CREDENTIALS);

const _fetchData = async (query, location = CONFIG.LOCATION) => {
    const [rows] = await bigquery.query({query, location});
    return rows.map(row =>
        Object.values(row)
            .map(value =>
                value && typeof value === 'object' ? value.value : value
            )
    );
}

async function fetchDatasets(configs = CONFIG.DATASETS_PARAMS) {
    const datasets = {};
    for (const datasetName of Object.keys(configs)) {
        const config = configs[datasetName];
        const fields = config.fields;
        const rows = await _fetchData(config.sqlQuery);
        datasets[datasetName] = {fields, rows};
    }
    return datasets;
}

export default fetchDatasets;

// fetchDatasets().then(data => console.log(data.orders)).catch(console.error)