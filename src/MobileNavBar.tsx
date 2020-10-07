import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import MenuIcon from '@material-ui/icons/Menu';
import './MobileNavBar.css';
import { Link, withRouter } from 'react-router-dom';

interface MobileNavBarWithRouterProps {
    history: { push: Function }
}

function MobileNavBar({ history }: MobileNavBarWithRouterProps) {

    const [showMenu, setShowMenu] = useState(false);

    const handleOpenMenuClick = () => setShowMenu(!showMenu);

    const handleLinkClick = (location: string) => {
        setShowMenu(false);
        history.push(location);
    };


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
                    <li onClick={() => handleLinkClick('/vocabulary')}>
                        <Link to='/vocabulary' className='nav-link'>Vocabulary</Link>
                    </li>
                    <li onClick={() => handleLinkClick('/training')}>
                        <Link to='/training' className='nav-link'>Training</Link>
                    </li>
                    <li onClick={() => handleLinkClick('/settings')}>
                        <Link to='/settings' className='nav-link'>Settings</Link>
                    </li>
                    <li className="last" onClick={() => handleLinkClick('/stats')}>
                        <Link to='/stats' className='nav-link'>Sign out</Link>
                    </li>
                </ul>
            </CSSTransition>
        </>
    );
}

export default withRouter(MobileNavBar);