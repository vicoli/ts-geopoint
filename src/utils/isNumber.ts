/**
 * Check if an object is a valid number
 *
 * @param   {Number}    value   Value to check
 * @return  {Boolean}   true if a number and not NaN
 */
const isNumber = (value: any): Boolean => {
  return toString.call(value) === '[object Number]' && value === +value;
}

export default isNumber;
