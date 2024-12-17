import React, { ReactElement } from 'react';
import { TrashBinLogo } from 'assets/img';
import { useNavigate } from 'react-router-dom';

import './header.scss';
import { logoutUser } from '@utils/index';

const AdminDashboardLayout: React.FC<{ children: ReactElement }> = ({ children }: any) => {
  const navigate = useNavigate();

  const onAboutUsClick = () => {
    navigate('/aboutus');
  };
  const onContactUsClick = () => {
    navigate('/contactus');
  };
  const onHomeClick = () => {
    navigate('/admin');
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary fixed-top mb-b trashbin-header">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={onHomeClick}>
            <img src={TrashBinLogo} className="nav-bar-logo" /> Nearby Trash bin
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <a className="navbar-brand" href="/admin">
                  <img src={TrashBinLogo} className="nav-bar-logo" /> Nearby Trash bin
                </a>
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/admin">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/customers">
                    Users List
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/trashbins">
                    Bins
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/suggestedbins">
                    Suggested Bins
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="admin/profile">
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{ cursor: 'pointer' }} onClick={logoutUser}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="mx-auto content-wrapper">{children}</div>
      <div className="trashbin-footer">
        <div className="copyright">© 2024 Nearby Trash Bin Identification System</div>
        <div className="footer-link">
          <a className="about-us" onClick={onAboutUsClick}>
            About us
          </a>
          |
          <a className="contact-us" onClick={onContactUsClick}>
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
