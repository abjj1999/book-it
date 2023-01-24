import { getSession } from 'next-auth/react'
import React from 'react'
import Login from '../components/auth/Login'
import Layout from '../components/layout/Layout'
const login = () => {
  return (
    <Layout title="Login to BookIt">
        <Login />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession({req: context.req})
  
  if (session) {
      return {
          redirect: {
              destination: '/',
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

export default login
