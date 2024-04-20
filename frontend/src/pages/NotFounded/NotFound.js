import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="h-[100vh] w-[100vw] flex justify-center">
            <div className="flex flex-col items-center justify-center">
                <p className="text-[20vh] font-black">Oops!!</p>
                <p className="text-[3vh] font-bold">404 - PAGE NOT FOUND</p>
                <Link
                    to="/"
                    className="font-semibold py-[10px] px-[15px] mt-3 text-white bg-blue-600 rounded-[40px]"
                >
                    GO TO LOGIN PAGE
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
