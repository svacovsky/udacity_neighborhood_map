
const api = "https://api.foursquare.com/v2/"
const client_id = 'ERNKTOGQD2C2K4JI3CD5CNSLRBYD01MURSRLMEZZF4SRFHWY'
const client_secret = 'T4AWDUNV0SXHAXMXFBMHHNHX1DH1IJYIP25P4QH3SIFSP12B'
const version = '20180323'
const limit = '1'

export const get = (venueId) =>
  fetch(`${api}/venues/${venueId}?client_id=${client_id}&client_secret=${client_secret}&v=${version}&limit=${limit}`)
    .then(res =>{
        return res.json().then(data => ({data:data, response:res.status}));
    })
    .then(res => {
          return res.data
    })
