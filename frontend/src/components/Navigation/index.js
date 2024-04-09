import { Link } from 'react-router-dom';
import './styles.css';
import images from '../../assets/images';

function Navigation() {
    return (
            <div className="Navigation">

                <ul className="block">
                    <li className="item">
                        <Link to="/vehicle" className='Link'>Vehicle</Link>
                    </li>
        
                    <li className="item">
                        <Link to="/driver" className='Link'>Driver</Link>
                    </li>
        
                    <li className="item">
                        <Link to="/trip" className='Link'>Trip</Link>
                    </li>
                </ul>
    
                <ul className="block">
                    <li className="item">
                        <Link to="/login" className='Link'>Login</Link>
                    </li>

                    <li className="item">
                        <Link to="/"> <img src={images.home} alt="Home" width="26" height="24" /> </Link>
                    </li>
                </ul>
          </div>
    );
}

export default Navigation;