import image from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';
const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1>Online Grocery</h1>
            <HeaderCartButton></HeaderCartButton>
        </header>
        <div className={classes['main-image']}>
            <img src={image} alt="A one stop store for all indian gorcery" />
        </div>
    </Fragment>;
 };
export default Header;