import Link from 'next/link'
import { FiHome, FiActivity, FiCompass, FiUsers, FiUser } from 'react-icons/fi'

interface Props {
  activeProp: number
}

const Navbar = ({activeProp}: Props) => {
  const iconSize = 35
  const buttons = [
    { href: '/', label: 'Hjem', icon: <FiHome size={iconSize} /> },
    { href: '/program', label: 'Program', icon: <FiActivity size={iconSize} /> },
    { href: '/utforsk', label: 'Utforsk', icon: <FiCompass size={iconSize} /> },
    { href: '/grupper', label: 'Grupper', icon: <FiUsers size={iconSize} /> },
    { href: '/profil', label: 'Profil', icon: <FiUser size={iconSize} /> },
  ]

  return (
    <div className='fixed bottom-0 w-full flex justify-center bg-white border-t-gray-400' >
      <div className='gap-x-9 mx-2 my-3 flex justify-center w-max' >
        {buttons.map((button, index) => (
          <Link
            className={activeProp == index ? 'text-[#F1A095]' : 'text-gray-400 hover:text-[#F1A095] duration-100'}
            key={button.href}
            href={button.href}
            onClick={() => activeProp = index}
          >
            <div className='flex flex-col items-center justify-center' >
              {button.icon}
              <span className='text-xs mt-2' >{button.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Navbar