// This is an example of data stored inside mongo that represents the path between superga and venaria
angular.module('App').value('FakeBestPath',
    {
        "_id": {
            "src": "2691",
            "dst": "2754"
        },
        "idSource": "2691",
        "idDestination": "2754",
        "edges": [
            {
                "idSource": "2691",
                "idDestination": "SUPERGA",
                "mode": true,
                "cost": 1520,
                "lineId": null,
                "stopsId": []
            },
            {
                "idSource": "SUPERGA",
                "idDestination": "SASSI",
                "mode": false,
                "cost": 8932,
                "lineId": "79",
                "stopsId": [
                    "SUPERGA",
                    "SUPERGA",
                    "FSS3",
                    "FSS2",
                    "FSS1",
                    "SASSI"
                ]
            },
            {
                "idSource": "SASSI",
                "idDestination": "590",
                "mode": true,
                "cost": 800,
                "lineId": null,
                "stopsId": []
            },
            {
                "idSource": "590",
                "idDestination": "477",
                "mode": false,
                "cost": 11022,
                "lineId": "15",
                "stopsId": [
                    "590",
                    "588",
                    "586",
                    "584",
                    "582",
                    "580",
                    "578",
                    "576",
                    "574",
                    "572",
                    "570",
                    "564",
                    "565",
                    "563",
                    "477"
                ]
            },
            {
                "idSource": "477",
                "idDestination": "28",
                "mode": false,
                "cost": 6780,
                "lineId": "13",
                "stopsId": [
                    "477",
                    "475",
                    "473",
                    "472",
                    "470",
                    "468",
                    "28"
                ]
            },
            {
                "idSource": "28",
                "idDestination": "8220",
                "mode": true,
                "cost": 90,
                "lineId": null,
                "stopsId": []
            },
            {
                "idSource": "8220",
                "idDestination": "8210",
                "mode": false,
                "cost": 9613,
                "lineId": "METRO",
                "stopsId": [
                    "8220",
                    "8219",
                    "8218",
                    "8217",
                    "8216",
                    "8215",
                    "8214",
                    "8213",
                    "8212",
                    "8211",
                    "8210"
                ]
            },
            {
                "idSource": "8210",
                "idDestination": "844",
                "mode": true,
                "cost": 70,
                "lineId": null,
                "stopsId": []
            },
            {
                "idSource": "844",
                "idDestination": "2591",
                "mode": false,
                "cost": 9245,
                "lineId": "37",
                "stopsId": [
                    "844",
                    "844",
                    "843",
                    "840",
                    "839",
                    "837",
                    "2355",
                    "2353",
                    "5078",
                    "5075",
                    "2591"
                ]
            },
            {
                "idSource": "2591",
                "idDestination": "2753",
                "mode": false,
                "cost": 9887,
                "lineId": "32",
                "stopsId": [
                    "2591",
                    "2739",
                    "2741",
                    "1554",
                    "3215",
                    "3141",
                    "3085",
                    "2747",
                    "2749",
                    "2751",
                    "2753"
                ]
            },
            {
                "idSource": "2753",
                "idDestination": "2754",
                "mode": true,
                "cost": 250,
                "lineId": null,
                "stopsId": []
            }
        ],
        "totalCost": 58209
    }
)