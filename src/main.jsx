import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react"; // 이후 주석 제거하면 새로고침 시에도 값 유지.
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./global.css";

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
