import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import 'index.css'
import App from 'App'

const container = document.getElementById('root') as HTMLDivElement

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
