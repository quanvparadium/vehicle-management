import Navigation from "../../components/Navigation/Navbar";

function DefaultLayout({ children, setLogin }) {
    return (
        <div>
            <Navigation setLogin={setLogin} />
            <div id="container">
                <div className="mx-auto max-w-[1440px] px-2 sm:px-6 lg:px-8 bg-white">
                    <div className="relative flex items-center justify-center ">
                        <div className="w-full" id="content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
