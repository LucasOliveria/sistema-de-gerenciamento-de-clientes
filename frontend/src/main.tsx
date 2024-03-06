import ReactDOM from 'react-dom/client'
import Context from './context/context.tsx'
import './index.css'
import Home from './pages/Home/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context>
    <Home />
  </Context>
)
