import Navbar from '@/app/Navbar'
import ProfileCard from '@/app/ProfileCard'

export default function profil() {
  return (
    <div>
      <ProfileCard />
      <Navbar activeProp={4} />
    </div>
  )
}