import React, { ReactElement } from 'react';
import './header.scss';
import { TrashBinLogo } from '@assets/img';
import { useNavigate } from 'react-router-dom';

const TrashBinWrapper: React.FC<{ children: ReactElement }> = ({ children }: any) => {
    const navigate = useNavigate()

    const onAboutUsClick =()=>{
        navigate('/aboutus');
    };

    const onContactUsClick =()=>{
        navigate('/contactus');
    }
    const onHomeClick =()=>{
        navigate('/');
    }

    return (
        <div>
            <nav className="navbar bg-body-tertiary fixed-top mb-b trashbin-header">
                <div className="container-fluid">
                    <a className="navbar-brand" onClick={onHomeClick}><img src={TrashBinLogo} className='nav-bar-logo' /> Nearby Trash bin</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><a className="navbar-brand" href="/"><img src={TrashBinLogo} className='nav-bar-logo' /> Nearby Trash bin</a></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/profile">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/profile">Logout</a>
                                </li>
                                {/* <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='trashbin-content mx-auto'>
                {children}
            </div>
            <div className='trashbin-footer'>
                <div className="copyright">
                    © 2024 Nearby Trash Bin Identification System
                </div>
                <div className="footer-link">
                    <a className="about-us" onClick={onAboutUsClick}>About us</a>|
                    <a className="contact-us"onClick={onContactUsClick}>Contact us</a>
                </div>
            </div>
        </div>
    )
}

export default TrashBinWrapper