import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import MenuIcon from '@material-ui/icons/Menu';
import './MobileNavBar.css';
import { Link } from 'react-router-dom';

export default function MobileNavBar() {

    const [showMenu, setShowMenu] = useState(false);

    const handleOpenMenuClick = () => setShowMenu(!showMenu);


    return (
        <>
            <nav className='navbar__mobile'>
                <MenuIcon  style={{ color: 'white', cursor: 'pointer', margin: 'auto 10px' }} onClick={handleOpenMenuClick} />
            </nav>
            <CSSTransition
                    in={showMenu}
                    timeout={300}
                    unmountOnExit
                    classNames="mobileBar">
                <ul className='nav-menu-mobile'>
                    <li>
                        <Link to='/vocabulary' className='nav-link' onClick={handleOpenMenuClick}>Vocabulary</Link>
                    </li>
                    <li>
                        <Link to='/training' className='nav-link' onClick={handleOpenMenuClick}>Training</Link>
                    </li>
                    <li>
                        <Link to='/settings' className='nav-link' onClick={handleOpenMenuClick}>Settings</Link>
                    </li>
                    <li className="last">
                        <Link to='/stats' className='nav-link' onClick={handleOpenMenuClick}>Sign out</Link>
                    </li>
                </ul>
            </CSSTransition>
        </>
    );
}
