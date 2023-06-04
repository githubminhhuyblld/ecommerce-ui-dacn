import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from "react-redux";
import GlobalStyles from "~/components/GlobalStyles/GlobalStyles.jsx";
import store from "~/store/store.js";


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
        <GlobalStyles>
            <App/>
        </GlobalStyles>
    </Provider>

  // </React.StrictMode>,
)
