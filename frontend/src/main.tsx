import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from '@/app/App.tsx'
import { store } from '@/store'
import { listenAuthSession } from '@/store/authSlice'
import { registerClinicalServiceWorker } from '@/lib/serviceWorker'

void store.dispatch(listenAuthSession())
void registerClinicalServiceWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
