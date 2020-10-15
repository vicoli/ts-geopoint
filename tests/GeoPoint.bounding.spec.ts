import GeoPoint from "../src/GeoPoint";

const LAT_DEG = 40.689604;
const LON_DEG = -74.04455;
const DISTANCE = 20;
const SW_LAT_MI = 40.40014088820039;
const SW_LON_MI = -74.42630141845927;
const SW_DIST_MI = 28.314943918527167;
const NE_LAT_MI = 40.97906711179962;
const NE_LON_MI = -73.66279858154073;
const NE_DIST_MI = 28.25351161423632;
const SW_LAT_KM = 40.50973996113307;
const SW_LON_KM = -74.28175887602288;
const SW_DIST_KM = 28.303340493130648;
const NE_LAT_KM = 40.86946803886694;
const NE_LON_KM = -73.80734112397712;
const NE_DIST_KM = 28.2651684254543;
const RADIUS_KM = 6371.01;

describe("GeoPoint (Bounding)", () => {

    describe('.boundingCoordinates(distance, radius, inKilometers)', () => {

it('should throw an error if the distance is not valid', () => {
    const point = new GeoPoint(LAT_DEG, LON_DEG);
    ['foo', 0/0, void 0, -1, 0].forEach((value: any) => {
        let error;
        try {
            point.boundingCoordinates(value);
        } catch (e) {
            error = e;
        }

        expect(error instanceof Error).toBeTruthy();
        expect(error.message).toBe('Invalid distance');
    });
    });

    it('should return an array containing the lower and upper points', function() {
        
        const point = new GeoPoint(LAT_DEG, LON_DEG);
        const coordinates = point.boundingCoordinates(DISTANCE);

        expect(Array.isArray(coordinates)).toBeTruthy;
        expect(coordinates.length).toBe(2);
        expect(coordinates[0] instanceof GeoPoint).toBeTruthy();
        expect(coordinates[1] instanceof GeoPoint).toBeTruthy();
    });

    it('should calculate the bounding coordinates in miles if inKilometers is false', function() {
    const point = new GeoPoint(LAT_DEG, LON_DEG);
    const coordinates = point.boundingCoordinates(DISTANCE);

        expect(Array.isArray(coordinates)).toBeTruthy();
    expect(coordinates.length).toBe(2);
    expect(coordinates[0].latitude()).toBe(SW_LAT_MI);
    expect(coordinates[0].longitude()).toBe(SW_LON_MI);
    expect(point.distanceTo(coordinates[0], false)).toBe(SW_DIST_MI);
    expect(coordinates[1].latitude()).toBe(NE_LAT_MI);
    expect(coordinates[1].longitude()).toBe(NE_LON_MI);
    expect(point.distanceTo(coordinates[1], false)).toBe(NE_DIST_MI);
    });

    it('should calculate the bounding coordinates in kilometers if inKilometers is true', function() {
    const point = new GeoPoint(LAT_DEG, LON_DEG);
    const coordinates = point.boundingCoordinates(DISTANCE, GeoPoint.EARTH_RADIUS_KM);

    expect(Array.isArray(coordinates)).toBeTruthy();
    expect(coordinates.length).toBe(2);
    expect(coordinates[0].latitude()).toBe(SW_LAT_KM);
    expect(coordinates[0].longitude()).toBe(SW_LON_KM);
    expect(point.distanceTo(coordinates[0], true)).toBe(SW_DIST_KM);
    expect(coordinates[1].latitude()).toBe(NE_LAT_KM);
    expect(coordinates[1].longitude()).toBe(NE_LON_KM);
    expect(point.distanceTo(coordinates[1], true)).toBe(NE_DIST_KM);
    });

    it('should calculate the bounding coordinates in miles by default', function() {
    const point = new GeoPoint(LAT_DEG, LON_DEG);
    const coordinates = point.boundingCoordinates(DISTANCE);

    expect(Array.isArray(coordinates)).toBeTruthy();
    expect(coordinates.length).toEqual(2);
    expect(coordinates[0].latitude()).toEqual(SW_LAT_MI);
    expect(coordinates[0].longitude()).toEqual(SW_LON_MI);
    expect(point.distanceTo(coordinates[0], false)).toEqual(SW_DIST_MI);
    expect(coordinates[1].latitude()).toEqual(NE_LAT_MI);
    expect(coordinates[1].longitude()).toEqual(NE_LON_MI);
    expect(point.distanceTo(coordinates[1], false)).toEqual(NE_DIST_MI);
    });

    it('should accept an optional radius', () => {
        const point = new GeoPoint(LAT_DEG, LON_DEG);
        const coordinates = point.boundingCoordinates(DISTANCE, RADIUS_KM);

        expect(Array.isArray(coordinates)).toBeTruthy();
        expect(coordinates.length).toBe(2);
        expect(coordinates[0].latitude()).toBe(SW_LAT_KM);
        expect(coordinates[0].longitude()).toBe(SW_LON_KM);
        expect(point.distanceTo(coordinates[0], true)).toBe(SW_DIST_KM);
        expect(coordinates[1].latitude()).toBe(NE_LAT_KM);
        expect(coordinates[1].longitude()).toBe(NE_LON_KM);
        expect(point.distanceTo(coordinates[1], true)).toBe(NE_DIST_KM);
    });

    });
});
