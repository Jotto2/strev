import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/app/Navbar'
import Activity from '@/app/Activity'
import CreateActivity from '@/app/CreateActivity'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>Strev</h1>
      <Navbar />
    </div>
  )
}
