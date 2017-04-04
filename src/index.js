import 'babel-polyfill'
import { render } from 'react-dom'

import { Routes } from './components'

render(Routes, document.querySelector('#app'))
