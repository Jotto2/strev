import Navbar from '@/app/Navbar'
import MyProfileCard from '@/app/MyProfileCard'
import ExternalProfileCard from '@/app/ExternalProfileCard'

export default function profil() {
  return (
    <div>
      <MyProfileCard />
      <ExternalProfileCard />
      <Navbar activeProp={4} />
    </div>
  )
}