import { useNavigate } from 'react-router-dom';
import LogoIcon from '../assets/logo.svg'

const Logo = () => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/')}>
            <img src={LogoIcon} alt="logo" />
        </div>

    )
}
export default Logo;