import { Navigate, Outlet} from 'react-router-dom'
import { useAuth } from './context/authContext'
import './ProtectedRoute.css'

function ProtectedRoute() {
    const { isLoading ,isAuthenticated } = useAuth();

    if (isLoading) return <div className='loadingContainer'> <h1 className='title'>Loading...</h1> </div>
    if ( !isLoading && !isAuthenticated) return <Navigate to="/" replace />;

    return <Outlet/>;
}

export default ProtectedRoute;