// @ts-nocheck
import React, { useState, useEffect } from 'react'
import YMap from './utils.map'
import style from './style.scss'

const YaMap = (props) => {
  const { mapSettings, data } = props
  const [mapData, setMapData] = useState({ info: [], maps: null })
  const [ymapsLoad, setYmapsLoad] = useState(false)
  const [addMap, setAddMap] = useState({})
  const [itemInfo, setItemInfo] = useState(null)
  const [centerPoint, setCenterPoint] = useState(mapSettings.startCenter)
  const [currZoom, setCurrZoom] = useState(mapSettings.startZoom)

  let isMounted = true

  const openCurrentItem = (el) => {
    addMap.setCenter(el.markCoordinates, 15)
    setItemInfo(el)
  }

  const onMapInit = () => {
    const map = new window.ymaps.Map(
      'MyMap',
      {
        center: centerPoint,
        zoom: currZoom,
        controls: mapSettings.controls
      },
      {
        suppressMapOpenBlock: true
      }
    )

    map.events.add('actiontick', () => {
      const actualCenter = map._yandexState._model.center.map(Number).reverse()
      setCenterPoint(actualCenter)
    })
    map.events.add('boundschange', (event) => {
      setCurrZoom(event.get('oldZoom'))
    })

    setAddMap(map)
  }

  useEffect(() => {
    try {
      const objectManager = new window.ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true
      })

      objectManager.add(mapData.maps)
      addMap.geoObjects.add(objectManager)
      objectManager.objects.events.add('click', (e: any) => {
        const currentObj =
          e.originalEvent.currentTarget._objectsById[e.get('objectId')].data
        openCurrentItem(currentObj)
      })
    } catch (e) {
      console.log('e === ', e)
    }
  }, [addMap])

  useEffect(() => {
    if (mapData.info.length && window.ymaps) {
      window.ymaps.ready(onMapInit)
    }
  }, [mapData.info, window.ymaps])

  const fetchData = async () => {
    const addressCollection = {
      type: 'FeatureCollection',
      features: []
    }

    data.forEach((el: any) => {
      const { markCoordinates, id } = el

      if (el.markCoordinates) {
        const newAddressObject = {
          type: mapSettings.dataType,
          id,
          data: el,
          geometry: {
            type: 'Point',
            coordinates: markCoordinates
          },
          properties: mapSettings.dataProperties,
          options: {
            iconLayout: 'default#image',
            iconImageHref: mapSettings.pointImage,
            iconImageSize: mapSettings.pointImageSize
          }
        }
        addressCollection.features.push(newAddressObject)
      }
    })
    if (isMounted) setMapData({ info: data, maps: addressCollection })
  }

  useEffect(() => {
    if (mapData.maps) {
      YMap.init(() => setYmapsLoad(true))
    }
  }, [mapData.maps])

  useEffect(() => {
    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <React.Fragment>
      <div className={style.map__box}>
        <h1 className={style.map__title}>{mapSettings.mapTitle}</h1>
        {ymapsLoad && <div id='MyMap' className={style.map} />}
        {ymapsLoad && (
          <div className={style.map__items}>
            <h2>{mapSettings.listTitle}</h2>
            {!itemInfo &&
              mapData.info.map((el) => (
                <div
                  key={el.id}
                  className={style.map__items__el}
                  onClick={() => {
                    openCurrentItem(el)
                  }}
                >
                  <h3 style={{ cursor: 'pointer' }}>
                    <img src={mapSettings.pointImage} />
                    {el.locationName}
                  </h3>
                  <p style={{ fontWeight: '500' }}>{el.markAddress}</p>
                  {el.markInfo && <p>{el.markInfo}</p>}
                </div>
              ))}
            {itemInfo && (
              <div>
                <div className={style.map__items__full}>
                  <p
                    className={style.map__items__full__close}
                    onClick={() => {
                      setItemInfo(null)
                      addMap.setCenter(centerPoint, currZoom)
                    }}
                  >
                    <img
                      src={mapSettings.closeImage}
                      style={{
                        width: mapSettings.closeImageSize[0],
                        height: mapSettings.closeImageSize[1]
                      }}
                    />
                  </p>
                  <div className={style.map__items__el}>
                    <h3>
                      <img src={mapSettings.pointImage} />
                      {itemInfo.locationName}
                    </h3>
                    <p style={{ fontWeight: '500' }}>{itemInfo.markAddress}</p>
                    {itemInfo.markInfo && <p>{itemInfo.markInfo}</p>}
                  </div>

                  {itemInfo.fullInfo && (
                    <div className={style.map__items__full__box}>
                      {itemInfo.fullInfo}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default YaMap
