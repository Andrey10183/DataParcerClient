import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes"

import './App.css';

import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/navbar/Navbar";
import Toggle from "./components/UI/toggle/Toggle";

function App() {

  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles/>
          <BrowserRouter>    
            <div className="container">
              <div className="form-check form-switch float-end">
                <Toggle  
                  label = {theme}
                  callback = {themeToggler}
                />
              </div>
              <h3 className="m-4 d-flex justify-content-center">
                Data Scanner
              </h3>  
              <Navbar />
              <AppRouter />
            </div>
        </BrowserRouter>      
    </ThemeProvider>
  );
}

export default App;
