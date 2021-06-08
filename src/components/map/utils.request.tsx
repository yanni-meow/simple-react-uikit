// @ts-nocheck

import axios from 'axios'

export default function request(url, action = 'get', data = {}, query = '') {
  console.log('url === ', url)
  console.log('action === ', action)
  console.log('data === ', data)
  console.log('query === ', query)
  const body = { data }
  const ip = '/server'

  // Удаление первого и последнего пробела.
  Object.keys(body.data).forEach((key) => {
    if (typeof body.data[key] === 'string')
      body.data[key] = body.data[key].trim()
  })

  let currentData = body
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem('token')
    // console.log('token === ', token);

    let addres = `${ip}/${url}?action=${action}&token=${token}&${query}`
    if (url.indexOf('public') !== -1) {
      addres = `${ip}/${url}`
      currentData = data
    }
    axios({
      method: 'post',
      url: addres,
      data: currentData
    }).then(
      (res) => {
        const { data: resData } = res
        if (
          resData.error &&
          (resData.error.code === '204' || resData.error.code === '202')
        ) {
          // window.localStorage.removeItem('token');
          // window.localStorage.removeItem('role');
          // window.location.reload();
        }
        resolve(res)
      },
      (err) => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('role')
        window.location.reload()
        reject(err)
      }
    )
  })
}
