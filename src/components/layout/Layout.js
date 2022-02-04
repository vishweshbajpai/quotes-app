import Footer from './Footer';
import classes from './Layout.module.css'
import MainNavigation from './MainNavigation';


const Layout = (props) => {
    return (
        <>
        <MainNavigation/>
        <main className={classes.main}>
            {props.children}
        </main>
        <Footer/>
        </>
    )
}

export default Layout;