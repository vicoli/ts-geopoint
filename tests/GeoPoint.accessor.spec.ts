import GeoPoint from "../src/GeoPoint";

const LAT_DEG = 40.689604;
const LON_DEG = -74.04455;
const LAT_RAD = 0.7101675611326549;
const LON_RAD = -1.2923211906575673;

describe("GeoPoint (Accessor)", () => {
  describe(".latitude(inRadians)", () => {
    it("should return the latitude in radians if inRadians is true", () => {
      const point = new GeoPoint(LAT_DEG, LON_DEG);
      expect(point.latitude(true)).toBe(LAT_RAD);
    });

    it("should return the latitude in degrees if inRadians is false", () => {
      const point = new GeoPoint(LAT_DEG, LON_DEG);
      expect(point.latitude(false)).toBe(LAT_DEG);
    });

    it("should return the latitude in degrees by default", function () {
      var point = new GeoPoint(LAT_DEG, LON_DEG);
      expect(point.latitude()).toBe(LAT_DEG);
    });
  });

  describe(".longitude(inRadians)", function () {
    it("should return the longitude in radians if inRadians is true", function () {
      const point = new GeoPoint(LAT_DEG, LON_DEG);
      expect(point.longitude(true)).toBe(LON_RAD);
    });

    it("should return the longitude in degrees if inRadians is false", function () {
      const point = new GeoPoint(LAT_DEG, LON_DEG);
      expect(point.longitude(false)).toBe(LON_DEG);
    });

    it("should return the longitude in degrees by default", function () {
      const point = new GeoPoint(LAT_DEG, LON_DEG);
      expect(point.longitude()).toBe(LON_DEG);
    });
  });
});
