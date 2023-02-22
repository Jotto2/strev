import CreateActivity from '@/components/CreateActivity'
import Navbar from '@/components/Navbar'
import React from 'react'


export default function opprett() {
  return (
    <div className='pb-32'>
      <h1>Ny Aktivitet</h1>
      <Navbar activeProp={1} />
      <CreateActivity />
    </div>
  )
}
