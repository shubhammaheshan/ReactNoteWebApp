import logo from './logo.svg';
import './App.css';

function Header () {
  return (
    <>
      <div className='header'>
        <img src={logo} alt='logo' width='70' height='30'/>
        <h1>Google Keep</h1>
      </div>
    </>
  );
  
};

export default Header;