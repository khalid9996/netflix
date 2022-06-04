import React, { useEffect, useState } from 'react';
import './nav.css';

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
          if (window.scrollY > 100) {
            handleShow(true);
         } else handleShow(false);
        });

        return () => {
          window.removeEventListener("scroll",handleShow(false));
        };
    }, []);

  return (
    <nav className={`nav ${show && "nav__black"}`}>
        <img 
        className='nav__logo' 
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
        alt="Netflix Logo" />
        <img 
        className='nav__avatar' 
        src="https://download.flaticon.com/download/icon/3177440?icon_id=3177440&author=525&team=525&keyword=User&pack=3177329&style=0&style_id=1222&format=png&color=%23000000&colored=2&size=512&selection=1&premium=0&type=standard&search=avatar" 
        alt="Avatar" />
    </nav>
  )
}

export default Nav;