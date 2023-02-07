import { getSession } from 'next-auth/react'
import React from 'react'
import BookingDetail from '../../components/booking/BookingDetail'
import { bookingDetails } from '../../redux/actions/bookingAction'
import {wrapper} from '../../redux/store'
import Layout from '../../components/layout/Layout'

const BookingDetails = () => {
  return (
    <div>
        <Layout title="Booking Details || BOOKIT">
            <BookingDetail />
        </Layout>
    </div>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, params}) => {
    const session = await getSession({req})
    
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await store.dispatch(bookingDetails(req.headers.cookie, req, params.id))

    
})

export default BookingDetails
