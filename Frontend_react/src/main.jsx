import { StrictMode } from 'react'
import AuthProvider from './context/AuthProvider.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DepartmentList from './context/DepartmentList.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider >
    <DepartmentList>
      <App />
    </DepartmentList>
  </AuthProvider >,
)
