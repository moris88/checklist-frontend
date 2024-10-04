import ReactDOM from 'react-dom/client'
import Redirect from './Redirect.tsx'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

ReactDOM.createRoot(root).render(<Redirect />)
