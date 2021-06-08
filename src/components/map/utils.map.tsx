// @ts-nocheck

const axios = require('axios')

const apiKey = '3b8bec1e-0616-4a7a-b366-1c316f4a8363'

class YMap {
  ymaps = null

  static init = (onload) => {
    const uri = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU&coordorder=longlat`
    YMap.script = document.createElement('script')
    YMap.script.type = 'text/javascript'
    YMap.script.onload = onload
    YMap.script.src = uri
    document.head.appendChild(YMap.script)
  }

  static geocode = async (geostring) => {
    const url = `https://geocode-maps.yandex.ru/1.x?apikey=${apiKey}&geocode=${geostring}&format=json`
    const geoResponce = await axios.get(encodeURI(url))
    const {
      response: { GeoObjectCollection: geoResult }
    } = geoResponce.data
    return geoResult.featureMember[0].GeoObject.Point.pos
  }
}

export default YMap
