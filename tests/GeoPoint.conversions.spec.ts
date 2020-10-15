import GeoPoint from "../src/GeoPoint";

const LAT_DEG = 40.689604;
const LON_DEG = -74.04455;
const LAT_RAD = 0.7101675611326549;
const LON_RAD = -1.2923211906575673;

describe("GeoPoint (Conversions)", () => {
  describe(".degreesToRadians(value)", () => {
    it("should throw an error if the value is not a number", () => {
      ["foo", 0 / 0, void 0].forEach((value: any) => {
        var error;
        try {
          GeoPoint.degreesToRadians(value);
        } catch (e) {
          error = e;
        }

        expect(error instanceof Error).toBeTruthy();
        expect(error.message).toBe("Invalid degree value");
      });
    });

    it("should convert degrees to radians", function () {
      expect(GeoPoint.degreesToRadians(0)).toBe(0);
      expect(GeoPoint.degreesToRadians(45)).toBe(Math.PI / 4);
      expect(GeoPoint.degreesToRadians(90)).toBe(Math.PI / 2);
      expect(GeoPoint.degreesToRadians(135)).toBe((3 * Math.PI) / 4);
      expect(GeoPoint.degreesToRadians(180)).toBe(Math.PI);
      expect(GeoPoint.degreesToRadians(225)).toBe((5 * Math.PI) / 4);
      expect(GeoPoint.degreesToRadians(270)).toBe((3 * Math.PI) / 2);
      expect(GeoPoint.degreesToRadians(315)).toBe((7 * Math.PI) / 4);
      expect(GeoPoint.degreesToRadians(360)).toBe(2 * Math.PI);
      expect(GeoPoint.degreesToRadians(450)).toBe(Math.PI / 2 + Math.PI * 2);
      expect(GeoPoint.degreesToRadians(540)).toBe(Math.PI + Math.PI * 2);
      expect(GeoPoint.degreesToRadians(810)).toBe(
        Math.PI / 2 + Math.PI * 2 * 2
      );
    });
  });

  describe(".radiansToDegrees(value)", () => {
    it("should throw an error if the value is not a number", () => {
      ["foo", 0 / 0, void 0].forEach((value) => {
        let error;
        try {
          // @ts-ignore
          GeoPoint.radiansToDegrees(value);
        } catch (e) {
          error = e;
        }

        expect(error instanceof Error).toBeTruthy();
        expect(error.message).toBe("Invalid radian value");
      });
    });

    it("should convert radians to degrees", function () {
      expect(GeoPoint.radiansToDegrees(0)).toBe(0);
      expect(GeoPoint.radiansToDegrees(Math.PI / 4)).toBe(45);
      expect(GeoPoint.radiansToDegrees(Math.PI / 2)).toBe(90);
      expect(GeoPoint.radiansToDegrees((3 * Math.PI) / 4)).toBe(135);
      expect(GeoPoint.radiansToDegrees(Math.PI)).toBe(180);
      expect(GeoPoint.radiansToDegrees((5 * Math.PI) / 4)).toBe(225);
      expect(GeoPoint.radiansToDegrees((3 * Math.PI) / 2)).toBe(270);
      expect(GeoPoint.radiansToDegrees((7 * Math.PI) / 4)).toBe(315);
      expect(GeoPoint.radiansToDegrees(Math.PI * 2)).toBe(360);
      expect(GeoPoint.radiansToDegrees(Math.PI / 2 + Math.PI * 2)).toBe(450);
      expect(GeoPoint.radiansToDegrees(Math.PI + Math.PI * 2)).toBe(540);
      expect(GeoPoint.radiansToDegrees(Math.PI / 2 + Math.PI * 2 * 2)).toBe(
        810
      );
    });
  });

  describe(".milesToKilometers(value)", () => {
    it("should throw an error if the value is not a number", () => {
      ["foo", 0 / 0, void 0].forEach( (value: any) => {
        let error;
        try {
          GeoPoint.milesToKilometers(value);
        } catch (e) {
          error = e;
        }
        expect(error instanceof Error).toBeTruthy();
        expect(error.message).toBe("Invalid mile value");
      });
    });

    it("should convert miles to kilometers", () => {
      expect(GeoPoint.milesToKilometers(1)).toBe(1.6093439999999999);
      expect(GeoPoint.milesToKilometers(5)).toBe(8.046719999999999);
    });
  });

  describe(".kilometersToMiles(value)", () => {
    it("should throw an error if the value is not a number", () => {
      ["foo", 0 / 0, void 0].forEach((value: any) => {
        let error;
        try {
          GeoPoint.kilometersToMiles(value);
        } catch (e) {
          error = e;
        }

        expect(error instanceof Error).toBeTruthy();
        expect(error.message).toBe("Invalid kilometer value");
      });
    });

    it("should convert miles to kilometers", () => {
      expect(GeoPoint.kilometersToMiles(1)).toBe(0.621371192237334);
      expect(GeoPoint.kilometersToMiles(5)).toBe(3.1068559611866697);
    });
  });
});
