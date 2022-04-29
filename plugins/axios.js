export default function ({ $axios}, inject) {
  const api = $axios.create({
    headers: {
      'Content-Type': 'application/json'
    }
  })
  api.setBaseURL('https://api.quwi.com/v2/')

  inject('api', api)
}