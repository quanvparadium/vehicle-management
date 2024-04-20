import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/Route";
import DefaultLayout from "./Layout/DefaultLayout";
import { useState } from "react";

import NotFound from "./pages/NotFounded/NotFound";

function App() {
    const [logined, setLogined] = useState(false);

    const setChange = () => {
        setLogined(!logined);
    };

    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<Page setChange={setChange} />}
                        />
                    );
                })}
                {logined &&
                    privateRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
