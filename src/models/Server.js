import axios from 'axios'

export default axios.create({
  // baseURL: process.env.REACT_APP_API_SERVER,
  // headers: {'X-Key-Inflection': 'camel'},  // camel case keys // created by Olive Branch on server side, not currently in use
  timeout: 30000,
})

