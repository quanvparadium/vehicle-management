import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/Route";
import DefaultLayout from "./Layout/DefaultLayout";
import { useState } from "react";
import Cookies from "js-cookie";

import NotFound from "./pages/NotFounded/NotFound";

function App() {
    const [login, setLogin] = useState(
        Cookies.get("login") === "true" ? true : false
    );
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<Page setLogin={setLogin} />}
                        />
                    );
                })}
                {login &&
                    privateRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout setLogin={setLogin}>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                {/* {privateRoutes.map((route, index) => {
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
                })} */}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
