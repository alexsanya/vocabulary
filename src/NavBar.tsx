import React from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Mode, UserContextData } from './interfaces';
import './NavBar.css';

export default function NavBar() {
    return (
        <UserContext.Consumer>
            { (value: UserContextData) => value.userData ? (
                <NavBarWithContext context={value}/>
            ) : (<></>)}
        </UserContext.Consumer>
    );
}

function NavBarWithContext({ context }: {context: UserContextData}) {
    const { mode, setMode } = context;
    const handleModeSwich = () => 
        (mode === Mode.SHOW_ORIGINAL) ? setMode(Mode.SHOW_TRANSLATION) : setMode(Mode.SHOW_ORIGINAL)
    return (
        <nav className='navbar'>
            <ul className='nav-menu'>
                <li>
                    <div className='nav-link' onClick={handleModeSwich}>
                        Show {mode === Mode.SHOW_ORIGINAL ? 'translation' : 'original'}
                    </div>
                </li>
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
                    <Link to='/stats' className='nav-link'>Sign out</Link>
                </li>
            </ul>
        </nav>
    );
}
