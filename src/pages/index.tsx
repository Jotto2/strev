import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import Activity from '@/components/Activity'
import CreateActivity from '@/components/CreateActivity'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='pb-32'>
      <h1>Hjem</h1>
      <Navbar activeProp={0} />
      <Activity />
      <CreateActivity />
    </div>
  )
}
