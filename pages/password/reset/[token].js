import React from 'react'
import Layout from '../../../components/layout/Layout'
import NewPassword from '../../../components/user/NewPassword'

const resetP = () => {
  return (
    <Layout title="Reset your password">
      <NewPassword />
    </Layout>
  )
}

export default resetP
