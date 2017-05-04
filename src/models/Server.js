import axios from 'axios'

export default axios.create({
  // baseURL: process.env.REACT_APP_API_SERVER,
  headers: {'X-Key-Inflection': 'camel'},  // camel case keys
  timeout: 30000,
})

