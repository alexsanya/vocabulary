import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
    return (
        <nav className='navbar'>
            <ul className='nav-menu'>
                <li>
                    <Link to='/vocabulary' className='nav-link'>Vocabulary</Link>
                </li>
                <li>
                    <Link to='/training' className='nav-link'>Training</Link>
                </li>
                <li>
                    <Link to='/settings' className='nav-link'>Settings</Link>
                </li>
                <li>
                    <Link to='/stats' className='nav-link'>Stats</Link>
                </li>
            </ul>
        </nav>
    );
}
