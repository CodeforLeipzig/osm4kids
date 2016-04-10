# API-description of the OSM4KIDS-backend.
This Api returns geojson (http://geojson.org/geojson-spec.html#examples)
## Endpoint for playgrounds: this endpoint returns a GEOJSON formatted list of all playgrounds in Leipzig.
### List all available playgrounds [/api/v1/playground]

```json
{
   "type":"FeatureCollection",
   "features":[
      {
         "uuid":"88a01638-a962-4b16-887a-8a23f09a102d",
         "type":"Feature",
         "geometry":{
            "type":"Point",
            "coordinates":[
               "12.3754144",
               "51.3254938"
            ]
         }
      },
      {
         "uuid":"7b7b201f-d0c1-447d-9991-e0f44c760a3f",
         "type":"Feature",
         "geometry":{
            "type":"Point",
            "coordinates":[
               "12.337419",
               "51.319833"
            ]
         }
      }
   ]
}
   ```


### Detailed Information of a playground [/api/v1/playground/7b7b201f-d0c1-447d-9991-e0f44c760a3f]

Request: [/api/v1/playground/88a01638-a962-4b16-887a-8a23f09a102d]

Response:
```json
      {
         "uuid":"88a01638-a962-4b16-887a-8a23f09a102d",
         "type":"Feature",
         "properties":{
            "name":"Spielplatz Körnerplatz",
            "url": "http://www.leipzig.de/detailansicht-adresse/spielplatz-koernerplatz/",
            "address":{
               "street":"Körnerplatz",
               "street_number":"",
               "zip":"04107",
               "city":"Leipzig"
            },
            "equipment":[
               "Kletterpyramide",
               "Kletterturm"
            ]
         },
         "geometry":{
            "type":"Point",
            "coordinates":[
               "12.3754144",
               "51.3254938"
            ]
         }
      }
   ```

   _or_

Request: [/api/v1/playground/7b7b201f-d0c1-447d-9991-e0f44c760a3f]

Response:

```json
   {
            "uuid":"7b7b201f-d0c1-447d-9991-e0f44c760a3f",
            "type":"Feature",
            "properties":{
               "name":"Spielplatz Öserstraße",
               "url":"http://www.leipzig.de/detailansicht-adresse/spielplatz-oeserstrasse/",
               "address":{
                  "street":"Öserstraße",
                  "street_number":"39",
                  "zip":"04229",
                  "city":"Leipzig"
               },
               "equipment":[
                  "Gurtsteg",
                  "Rutschturm",
                  "Drehscheibe",
                  "Tischtennisplatte",
                  "Balancierseil",
                  "Streetballkorb"
               ]
            },
            "geometry":{
               "type":"Point",
               "coordinates":[
                  "12.337419",
                  "51.319833"
               ]
            }
         }
   ```
### List available playgrounds with these equipment [/api/v1/playground/Tischtennisplatte]
(later)

### Query playgrounds by QueryString [/api/v1/playground/search?city=Leipzig&equipment=Tischtennisplatte]
(later)