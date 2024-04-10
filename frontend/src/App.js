import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./Layout/DefaultLayout";

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
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
            </Routes>
        </div>
    );
}

export default App;
