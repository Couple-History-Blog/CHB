// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/chbLogo.png';
import 'assets/scss/style.scss';


/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = ({ logoStyle }: { logoStyle?: string }) => {
    return (
        <img src={logo} alt="CHB" className={ logoStyle ?? 'layout-logo' }/>
    );
};

export default Logo;
