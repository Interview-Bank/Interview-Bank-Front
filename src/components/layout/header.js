import interviewBankLogo from './img/logo.svg';
import './header.css';
import React, {useState} from 'react';
import Modal from './modal';

const Header = () => {
    const [modal, setModal] = useState(false);

    function logoClick(e) {
        window.location.reload();
    }

    return (
        <header className="header">
            <div className="contents">
                <div className="logo-image">
                    <img src={interviewBankLogo} onClick={logoClick} alt="logo"/>
                </div>
                <nav className="navigation">
                    <button className="register">회원가입</button>
                    <button className="login" onClick={() => setModal(true)}>로그인</button>
                    {modal && (<Modal
        open={modal}
        onClose={() => {
          setModal(false);
        }}
      />)}
                </nav>
            </div>
        </header>
    )
}

export default Header;

