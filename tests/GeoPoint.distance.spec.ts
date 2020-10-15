import GeoPoint from "../src/GeoPoint";

const LAT_DEG = 40.689604;
const LON_DEG = -74.04455;
const LAT_DEG2 = 38.890298;
const LON_DEG2 = -77.035238;
const DISTANCE_MI = 201.63714020616294;
const DISTANCE_KM = 324.503521805324;

describe("GeoPoint (distance)", () => {

  describe(".distanceTo(point, inKilometers)", () => {

    it("should throw an error if the point is not a GeoPoint", () => {
      const point = new GeoPoint(LAT_DEG, LON_DEG);
      ["foo", 0 / 0, void 0].forEach((value: any) => {
        let error;
        try {
          point.distanceTo(value);
        } catch (e) {
          error = e;
        }

        expect(error instanceof Error).toBeTruthy();
        expect(error.message).toBe("Invalid GeoPoint");
      });
    });

    it("should return the distance if inKilometers is false", () => {
      const point = new GeoPoint(LAT_DEG, LON_DEG);
      const point2 = new GeoPoint(LAT_DEG2, LON_DEG2);
      const distance = point.distanceTo(point2, false);

      expect(distance).toBe(DISTANCE_MI);
    });

    it("should return the distance in kilometers if inKilometers is true", () => {
      const point = new GeoPoint(LAT_DEG, LON_DEG);
      const point2 = new GeoPoint(LAT_DEG2, LON_DEG2);
      const distance = point.distanceTo(point2, true);

      expect(distance).toBe(DISTANCE_KM);
    });

    it("should return the distance in miles by default", () => {
      const point = new GeoPoint(LAT_DEG, LON_DEG);
      const point2 = new GeoPoint(LAT_DEG2, LON_DEG2);
      const distance = point.distanceTo(point2);

      expect(distance).toBe(DISTANCE_MI);
    });
  });
});
