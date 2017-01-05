/**
* @Author: shunjinchan
* @Date:   2016-08-15T13:57:53+08:00
* @Last modified by:   shunjinchan
* @Last modified time: 2016-08-15T13:58:25+08:00
*/

/**
 * @param  {String} name
 */
const fileNameSlice = function (name) {
  let fileName = name.slice(0, name.lastIndexOf('.'))
  let kind = name.slice(name.lastIndexOf('.') + 1, name.length)
  let separator = '.'

  return {
    name: fileName,
    kind: kind,
    separator: separator
  }
}

export default {
  fileNameSlice
}
