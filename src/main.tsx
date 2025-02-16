import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './Pages/HomePage.tsx'
import CharacterPage from './Pages/CharacterPage.tsx';
import NotFoundPage from './Pages/NotFoundPage.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/character/:characterId",
        element: <CharacterPage />,
        errorElement: <NotFoundPage />
    }
]);


createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
