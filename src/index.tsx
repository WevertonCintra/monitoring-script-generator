import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Global } from './styles/global'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <>
    <App />
    <Global />
  </>
)
