import { Outlet } from 'react-router-dom'
import SideBar from './sideBar'

function DashboardLayout() {
    return (
        <div className='dashboard-container'>
            <div className='dashboard-sidebar'>
                <SideBar />
            </div>
            <div className='dashboard-outlet'>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout
