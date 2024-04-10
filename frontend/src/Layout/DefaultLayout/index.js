
// import Header from '../../Header'
import Navigation from '../../components/Navigation'
import './styles.css'

function DefaultLayout({children}) {
    return ( 
        <div >
            <Navigation />
            <div id="container" >
                <div id="content">
                    {children}
                </div>
            </div>
        </div>
     );
}

export default DefaultLayout;
