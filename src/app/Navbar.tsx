import { useContext } from 'react';
import { UserContext } from '../lib/context';

// Top navbar
export default function Navbar() {

  const { user, username } = useContext(UserContext)

  return (
    <h1>Navbar</h1>
  )

}