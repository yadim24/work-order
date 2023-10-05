# vite-starter
GET /api/v1/nomenclatures/
{
    "count": 13,
    "next": "http://localhost:8000/api/v1/nomenclatures/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "code": "00-0000007",
            "name": "Фольпэт 0,015/0,012 х 775"
        },
        ...
    ]
}


GET /api/v1/workorders/

{
    "count": 14,
    "next": "http://localhost:8000/api/v1/workorders/?page=2",
    "previous": null,
    "results": [
        {
            "id": 4,
            "number": "П.П.-102.1",
            "start_date": null,
            "material": {
                "id": 1,
                "code": "00-0000007",
                "name": "Фольпэт 0,015/0,012 х 775"
            },
            "product": {
                "id": 2,
                "code": "00-0000008",
                "name": "ФТЛ Т 85 ПП/ПС/ПЭТ 0,03 х 470"
            },
            "is_finished": false
        },
        ...
    ]
}

GET /api/v1/workorders/4/products/

[
    {
        "id": 18,
        "serial": "61862-RND",
        "weight": "55.000",
        "date": "2022-12-26T11:43:09.664741+03:00"
    },
    {
        "id": 19,
        "serial": "31675-RND",
        "weight": "100.000",
        "date": "2022-12-26T11:43:35.767300+03:00"
    },
    {
        "id": 20,
        "serial": "55227-RND",
        "weight": "545.000",
        "date": "2022-12-26T11:43:51.898110+03:00"
    },
    ...
]