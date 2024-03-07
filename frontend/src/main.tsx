import ReactDOM from 'react-dom/client'
import Context from './context/context.tsx'
import './index.css'
import Home from './pages/Home/index.tsx'
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context>
    <Home />
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Flip}
    />
  </Context>
)
