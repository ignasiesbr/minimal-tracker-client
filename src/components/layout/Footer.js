import React from 'react'
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__logo-box">
                <svg className="footer__icon">
                    <use xlinkHref="/sprite.svg#icon-ballot"></use>
                </svg>
                <span>Minimal Tracker</span>
            </div>

            <div className="footer__footer">
                <ul className="footer-list">
                    <li className="footer-list__item">
                        <Link to="/" className="footer-list__link">Company</Link>
                    </li>
                    <li className="footer-list__item">
                        <Link to="/about" className="footer-list__link">About</Link>
                    </li>
                    <li className="footer-list__item">
                        <Link to="/terms" className="footer-list__link">Terms</Link>
                    </li>
                </ul>
                <p className="footer__copyright">Built by Ignasi Espinosa</p>
            </div>
        </footer>
    )
}

export default Footer
