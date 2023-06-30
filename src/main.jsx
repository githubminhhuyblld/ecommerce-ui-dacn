import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { ProSidebarProvider } from "react-pro-sidebar";
import GlobalStyles from "~/components/GlobalStyles/GlobalStyles.jsx";
import store from "~/store/store.js";
import { LanguageContextProvider } from "./context/languageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <LanguageContextProvider>
  <ProSidebarProvider>
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  </ProSidebarProvider>
  </LanguageContextProvider>

  // </React.StrictMode>,
);
