import GeoPoint from "../src/GeoPoint";

const LAT_DEG = 40.689604;
const LON_DEG = -74.04455;
const LAT_RAD = 0.7101675611326549;
const LON_RAD = -1.2923211906575673;

describe("GeoPoint (Constructor)", () => {

    describe('new GeoPoint(lat, lon, inRadians)', () => {

        it('should throw and error if latitude is not valid', () => {
          let error;
          try {
            // @ts-ignore
            new GeoPoint();
          } catch (e) {
            error = e;
          }
          expect(error instanceof Error).toBeTruthy();
          expect(error.message).toBe('Invalid latitude');
        });
      
        it('should throw and error if longitude is not valid', () => {
          let error;

          try {
            // @ts-ignore
            new GeoPoint(LAT_DEG);
          } catch (e) {
            error = e;
          }

          expect(error instanceof Error).toBeTruthy();
          expect(error.message).toBe('Invalid longitude');
        });
      
        it('should convert latitude and longitude in degrees to radians', () => {
          const point = new GeoPoint(LAT_DEG, LON_DEG, false);  
  
          expect(point._radLat).toBe(LAT_RAD);
          expect(point._radLon).toBe(-1.2923211906575673);
        });
      
        it('should convert latitude and longitude in radians to degrees', () => {
          const point = new GeoPoint(LAT_RAD, -1.2923211906575673, true);
          expect(point._degLat).toBe(LAT_DEG);
          expect(point._degLon).toBe(LON_DEG);
        });
      
        it('should default to latitude and longitude in degrees', () => {
          const point = new GeoPoint(LAT_DEG, LON_DEG);    
          expect(point._radLat).toBe(LAT_RAD);
          expect(point._radLon).toBe(-1.2923211906575673);
        });
      
        it('should throw an error if the latitude is out of bounds', function() {
          let error;
          try {
            // @ts-ignore
            new GeoPoint(200, LON_DEG);
          } catch (e) {
            error = e;
          }
          expect(error instanceof Error).toBeTruthy();
          expect(error.message).toBe('Latitude out of bounds');
        });
      
        it('should throw an error if the longitude is out of bounds', () => {
          let error;
          try {
            new GeoPoint(LAT_DEG, 200);
          } catch (e) {
            error = e;
          }
          expect(error instanceof Error).toBeTruthy();
          expect(error.message).toBe('Longitude out of bounds');
        });
      
      });
    });
