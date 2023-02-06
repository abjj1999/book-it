import { getSession } from 'next-auth/react'
import React from 'react'
import MyBookings from '../../components/booking/MyBookings'
import { myBookings } from '../../redux/actions/bookingAction'
import {wrapper} from '../../redux/store'
import Layout from '../../components/layout/Layout'
const me = () => {
  return (
    <Layout title="My Booking || BOOKIT">
      <MyBookings />
    </Layout>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({req}) => {
    const session = await getSession({req})
    
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await store.dispatch(myBookings(req.headers.cookie, req))

    
})
export default me
