import React, { useState , useEffect } from 'react';
import { NavLink,Link ,useHistory} from 'react-router-dom';

import './sidebar.css';
import logo from '../assests/svg/logo2.svg';
import { Home as HomeIcon, Notifications as BellIcon, AccountCircle as UserIcon,
   MailOutline as EnvelopeIcon, ChatBubbleOutline as CommentsIcon, BookmarkBorder as BookmarkIcon,
    BarChart as ChartBarIcon, Settings as CogIcon, Brightness4 as MoonIcon, Search as SearchIcon, ChevronLeft as ChevronLeftIcon,
     ChevronRight as ChevronRightIcon } from '@material-ui/icons';


const Sidebar = ({mydata}) => {
  const [isOpen, setIsOpen] = useState(true); // State to track sidebar visibility
  const [data, setdata] = useState(null); // State to track sidebar visibility

console.log(mydata)
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const sidebarLinks = [
    { icon: HomeIcon, label: 'Home', path: '/home' },
    { icon: BellIcon, label: 'Notifications', path: '/notifications' },
  
    { icon: EnvelopeIcon, label: 'Messages', path: '/messages' },
    { icon: CommentsIcon, label: 'Community', path: '/community' },
    { icon: BookmarkIcon, label: 'SavedPosts', path: '/SavedPosts' },
    { icon: ChartBarIcon, label: 'Dashboard', path: '/dashboard' },
    { icon: CogIcon, label: 'Settings', path: '/settings' }, // Corrected path to '/settings'
  ];
  useEffect(() => {
    console.log("mydata",mydata)
    setdata(mydata)
  }, [mydata])
  
  if(mydata && mydata.user_name){
    sidebarLinks.push({ icon: UserIcon, label: 'Profile', path: '/profile/'+mydata.user_name })

  }
  return (
    <div>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
       
        {isOpen && <span className="toggle-label">Toggle Sidebar</span>}
      </button>
      <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <img src={logo} alt="GIF Logo" />
        <ul className="sidebar-links">
          {sidebarLinks.map((link, index) => (
            <li key={index} className="link">
              <Link to={link.path}>
                <span className="icon-container">
                  <link.icon />
                </span>
              
                {isOpen && <span className="label">{link.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
  
    </div>
  );
};

export default Sidebar;
