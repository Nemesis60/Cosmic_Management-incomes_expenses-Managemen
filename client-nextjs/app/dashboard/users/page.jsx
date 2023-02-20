import Layout from '@/components/Layout'
import Users from '../users'

export default function page() {


    return (
        <div>
            <Layout>
                <div className='users-container'>
                    <Users />
                </div>
            </Layout>
        </div>
    )
}
