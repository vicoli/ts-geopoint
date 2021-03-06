# Geographic Point

GeoPoint represents a geographic point for node.js and the browser, and provides distance between points and radius bounding box calculations.

## Installation

```bash
    npm install ts-geopoint 
```

## Usage

```js
const GeoPoint = require('ts-geopoint');
const statueOfLiberty = new GeoPoint(40.689604, -74.04455);
```

```typescript
import { GeoPoint } from 'ts-geopoint';
const statueOfLiberty = new GeoPoint(40.689604, -74.04455);
```

## Constructor options

* `latitude`: Latitude
* `longitude`: Longitude
* `inRadians`: `true` if the latitude and longitude are in radians, defaults to `false`

## Methods

* `.latitude(inRadians)`: Return the point's latitude. By default, the latitude is in degrees, unless `inRadians` is `true`
* `.longitude(inRadians)`: Return the point's longitude. By default, the longitude is in degrees, unless `inRadians` is `true`
* `.distanceTo(point, inKilometers)`: Calculate the distance to another `GeoPoint` instance. By default, the distance is calculated in miles, unless `inKilometers` is `true`
* `.boundingCoordinates(distance, radius, inKilometers)`: Calculates the bounding coordinates of `distance` from the point and returns an array with the SW and NE points of the bounding box . If `radius` is not provided, the radius of the Earth will be used. The distance is calculated in miles unless `inKilometers` is `true`

## Static Methods

* `GeoPoint.degreesToRadians(value)`: Converts `value` in degrees to radians
* `GeoPoint.radiansToDegrees(value)`: Converts `value` in radians to degrees
* `GeoPoint.milesToKilometers(value)`: Converts `value` in miles to kilometers
* `GeoPoint.kilometersToMiles(value)`: Converts `value` in kilometers to miles

## Running Tests

Tests can be run with `npm test`.
 
# Credits

- This library is derived from the code presented in [Finding Points Within a Distance of a Latitude/Longitude Using Bounding Coordinates](http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates) by [Jan Philip Matuschek](http://janmatuschek.de/Contact).
- This library is also the javascript port of [node-geopoint](https://github.com/davidwood/node-geopoint).

