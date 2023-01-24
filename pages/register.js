import { getSession } from 'next-auth/react'
import React from 'react'
import Register from '../components/auth/Register'
import Layout from '../components/layout/Layout'

const register = () => {
  return (
    <Layout title="Register | BookIT">
        <Register />
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

export default register
