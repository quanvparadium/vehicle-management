// import Header from '../../Header'
import Navigation from "../../components/Navigation/Navbar";

function DefaultLayout({ children }) {
    return (
        <div>
            <Navigation />
            <div id="container">
                <div className="mx-auto max-w-[1440px] px-2 sm:px-6 lg:px-8 bg-white">
                    <div className="relative flex items-center justify-center ">
                        <div id="content">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
