import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
    return (
        <nav className='navbar'>
            <ul className='nav-menu'>
                <li>
                    <Link to='/vocabulary'>Vocabulary</Link>
                </li>
                <li>
                    <Link to='/training'>Training</Link>
                </li>
                <li>
                    <Link to='/settings'>Settings</Link>
                </li>
                <li>
                    <Link to='/stats'>Stats</Link>
                </li>
            </ul>
        </nav>
    );
}
