import React from 'react'
import {getSession} from 'next-auth/react'
import Layout from "../../components/layout/Layout"
import Profile from '../../components/user/Profile'
const UpdateProfliePage = () => {
  return (
    <Layout title="Update profile">
      <Profile />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
    const session = await getSession({req: context.req})
    
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

export default UpdateProfliePage
