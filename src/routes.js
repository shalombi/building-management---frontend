import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { MalfunctionApp } from './pages/malfunction-app.jsx'
import { ReviewApp } from './pages/review-app.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { HomePageTailwind } from './pages/home-page-tailwind'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'בית 🏠',
    },
    {
        path: 'malfunction',
        component: <MalfunctionApp />,
        label: 'תקלות'
    },
    {
        path: 'admin',
        component: <AdminApp />,
        label: 'מנהל'
    }
]

export default routes