import { auth } from 'lib/firebase';

function LogoutButton() {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return <button onClick={handleLogout}>Log out</button>;
}

export default LogoutButton;
