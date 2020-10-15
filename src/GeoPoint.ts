import isNumber from "./utils/isNumber";

export default class GeoPoint {
  public static readonly DEG2RAD = Math.PI / 180; // degrees to radian conversion
  public static readonly RAD2DEG = 180 / Math.PI; // radians to degrees conversion
  public static readonly MI2KM = 1.6093439999999999; // miles to kilometers conversion
  public static readonly KM2MI = 0.621371192237334; // kilometers to miles conversion
  public static readonly EARTH_RADIUS_KM = 6371.01; // Earth's radius in km
  public static readonly EARTH_RADIUS_MI = 3958.762079; // Earth's radius in miles
  public static readonly MAX_LAT = Math.PI / 2; // 90 degrees
  public static readonly MIN_LAT = -GeoPoint.MAX_LAT; // -90 degrees
  public static readonly MAX_LON = Math.PI; // 180 degrees
  public static readonly MIN_LON = -GeoPoint.MAX_LON; // -180 degrees
  public static readonly FULL_CIRCLE_RAD = Math.PI * 2; // Full cirle (360 degrees) in radians

  public readonly _radLat: number;
  public readonly _degLat: number;
  public readonly _radLon: number;
  public readonly _degLon: number;

  /**
   * Constructor
   *
   * @param   {Number}    lat         Latitude
   * @param   {Number}    lon         Longitude
   * @param   {Boolean}   inRadians   true if latitude and longitude are in radians
   */
  constructor(lat: number, lon: number, inRadians: boolean = false) {
    const { MAX_LAT, MAX_LON, MIN_LAT, MIN_LON } = GeoPoint;

    if (!isNumber(lat)) {
      throw new Error("Invalid latitude");
    }
    if (!isNumber(lon)) {
      throw new Error("Invalid longitude");
    }
    if (inRadians === true) {
      this._degLat = GeoPoint.radiansToDegrees(lat);
      this._degLon = GeoPoint.radiansToDegrees(lon);
      this._radLat = lat;
      this._radLon = lon;
    } else {
      this._degLat = lat;
      this._degLon = lon;
      this._radLat = GeoPoint.degreesToRadians(lat);
      this._radLon = GeoPoint.degreesToRadians(lon);
    }
    if (this._radLat < MIN_LAT || this._radLat > MAX_LAT) {
      throw new Error("Latitude out of bounds");
    } else if (this._radLon < MIN_LON || this._radLon > MAX_LON) {
      throw new Error("Longitude out of bounds");
    }
  }

  /**
   * Return the latitude
   *
   * @param   {Boolean}   inRadians   true to return the latitude in radians
   * @param   {Number}    latitude
   */
  public latitude(inRadians: boolean = false): number {
    if (inRadians === true) {
      return this._radLat;
    }
    return this._degLat;
  }

  /**
   * Return the longitude
   *
   * @param   {Boolean}   inRadians   true to return the longitude in radians
   * @param   {Number}    longitude
   */
  public longitude(inRadians: boolean = false): number {
    if (inRadians === true) {
      return this._radLon;
    }
    return this._degLon;
  }

  /**
   * Calculates the distance between two points
   *
   * @param   {Object}    point         GeoPoint instance
   * @param   {Boolean}   inKilometers  true to return the distance in kilometers
   * @return  {Number}    distance between points
   */
  public distanceTo(point: GeoPoint, inKilometers: boolean = false) {
    if (!(point instanceof GeoPoint)) {
      throw new Error("Invalid GeoPoint");
    }

    const { EARTH_RADIUS_KM, EARTH_RADIUS_MI } = GeoPoint;
    const radius = inKilometers === true ? EARTH_RADIUS_KM : EARTH_RADIUS_MI;
    const lat1 = this.latitude(true);
    const lat2 = point.latitude(true);
    const lon1 = this.longitude(true);
    const lon2 = point.longitude(true);

    return (
      Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
      ) * radius
    );
  }

  /**
   * Calculate the bouding coordinates
   *
   * @param   {Number}    distance      distance from the point
   * @param   {Number}    radius        optional sphere radius to use
   * @return  {Array}     array containing SW and NE points of bounding box
   */
  public boundingCoordinates(
    distance: number,
    radius: number = GeoPoint.EARTH_RADIUS_MI
  ) {
    if (!isNumber(distance) || distance <= 0) {
      throw new Error("Invalid distance");
    }

    const { MAX_LAT, MIN_LAT, MIN_LON, FULL_CIRCLE_RAD, MAX_LON } = GeoPoint;

    const lat = this.latitude(true);
    const lon = this.longitude(true);
    const radDist = distance / radius;

    let minLat = lat - radDist;
    let maxLat = lat + radDist;

    let minLon: number;
    let maxLon: number;
    let deltaLon: number;

    if (minLat > MIN_LAT && maxLat < MAX_LAT) {
      deltaLon = Math.asin(Math.sin(radDist) / Math.cos(lat));
      minLon = lon - deltaLon;

      if (minLon < MIN_LON) {
        minLon += FULL_CIRCLE_RAD;
      }

      maxLon = lon + deltaLon;

      if (maxLon > MAX_LON) {
        maxLon -= FULL_CIRCLE_RAD;
      }
    } else {
      minLat = Math.max(minLat, MIN_LAT);
      maxLat = Math.min(maxLat, MAX_LAT);
      minLon = MIN_LON;
      maxLon = MAX_LON;
    }

    return [
      new GeoPoint(minLat, minLon, true),
      new GeoPoint(maxLat, maxLon, true),
    ];
  }

  /**
   * Convert degrees to radians
   *
   * @param   {Number}    value   degree value
   * @return  {Number}    radian value
   */
  public static degreesToRadians(value: number): number {
    if (!isNumber(value)) {
      throw new Error("Invalid degree value");
    }

    return value * GeoPoint.DEG2RAD;
  }

  /**
   * Convert radians to degrees
   *
   * @param   {Number}    value   radian value
   * @return  {Number}    degree value
   */
  public static radiansToDegrees(value: number): number {
    if (!isNumber(value)) {
      throw new Error("Invalid radian value");
    }

    return value * GeoPoint.RAD2DEG;
  }

  /**
   * Cnvert miles to kilometers
   *
   * @param   {Number}    value   miles value
   * @return  {Number}    kilometers value
   */
  public static milesToKilometers(value: number): number {
    if (!isNumber(value)) {
      throw new Error("Invalid mile value");
    }

    return value * GeoPoint.MI2KM;
  }

  /**
   * Convert kilometers to miles
   *
   * @param   {Number}    value   kilometer value
   * @return  {Number}    miles value
   */
  public static kilometersToMiles(value: number): number {
    if (!isNumber(value)) {
      throw new Error("Invalid kilometer value");
    }

    return value * GeoPoint.KM2MI;
  }
}
