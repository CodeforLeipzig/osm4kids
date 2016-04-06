# Endpoint for SchoolsThis Endpoint gives a JSON formatted list of all Schools in Leipzig.
## Playgrounds
### List available playgrounds [/api/v1/playground]

```json
   [{
            "uuid": "88a01638-a962-4b16-887a-8a23f09a102d",
    		"type": "Feature",
    		"properties": {
    			"name": "Druckerei (Lützner Straße 29)",
    			"url": "druckerei",
    			"link": "",
    			"address": {
    				"street": "Lütznerstr.",
    				"street_number": "29",
    				"zip": "04177",
    				"city": "Leipzig"
    			},
    			"equipment": [
                       "Tischtennisplatte",
                       "Klettergerüst",
                       "Rutsche"
                   ]
            },
    		"geometry": {
    			"type": "Point",
    			"coordinates": [
    				"12.3341",
    				"51.3358"
    			]
    		}
    	},
    	{
    	    "uuid": "7b7b201f-d0c1-447d-9991-e0f44c760a3f",
    		"type": "Feature",
    		"properties": {
    			"name": "Hildegardstr. 49",
    			"url": "hildegardstr-49",
    			"link": "",
    			"address": {
    				"street": "Hildegardstraße",
    				"street_number": "49",
    				"zip": "04315",
    				"city": "Leipzig"
    			},
                "equipment": [
                       "Tischtennisplatte",
                       "Sandkasten",
                       "Rutsche"
                   ]
    		},
    		"geometry": {
    			"type": "Point",
    			"coordinates": [
    				"12.4072",
    				"51.3458"
    			]
    		}
    	}]

   ```


### Detailed Information of a playground [/api/v1/playground/7b7b201f-d0c1-447d-9991-e0f44c760a3f]

### List available playgrounds with these equipment [/api/v1/playground/Tischtennisplatte]
(later)