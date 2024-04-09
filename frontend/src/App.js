import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes';
import { privateRoutes } from './routes';
import DefaultLayout from './Layout/DefaultLayout'
import { Fragment } from 'react';

function App() {

  return (
      <div className="App" >
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout

            const Page = route.component;
            return <Route key={index} path={route.path} element=
              {<Layout>
                <Page />
              </Layout>
              } />;
          })}

        </Routes>
      </div>
  );
}

export default App;
