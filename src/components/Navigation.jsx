import { Link } from 'react-router-dom';
import { HomeIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';

function Navigation() {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="flex justify-around">
        <Link to="/" className="flex flex-col items-center py-2 px-4">
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center py-2 px-4">
          <ClockIcon className="h-6 w-6" />
          <span className="text-xs">History</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center py-2 px-4">
          <UserIcon className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;