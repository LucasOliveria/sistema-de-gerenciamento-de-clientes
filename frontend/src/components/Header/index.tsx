import iconLogo from "../../../public/icon.png";
import './style.css';

function Header() {
  return (
    <header>
      <div className="header-logo">
        <img src={iconLogo} alt="logo" />
        <h2>CM System</h2>
      </div>
    </header>
  )
}

export default Header;
