import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL!

export type RequestType = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

export function Request<T>(path: string, token: string, type: RequestType, params?: any, body?: T) {
  console.log({ baseURL, path, token, type, params, body })
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: `${baseURL}${path}`,
      params: params,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        res.status >= 200 && res.status < 300 ? resolve(res.data) : reject(res)
      })
      .catch((err) => {
        console.error(err) // Log the error
        reject(err)
      })
  })
}
