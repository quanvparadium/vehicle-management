
// import Header from '../../Header'
import Navigation from '../../components/Navigation'
import './styles.css'

function DefaultLayout({children}) {


    return ( 
        <div className='web'>
            <Navigation />
            <div className='container'>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
     );
}

export default DefaultLayout;
