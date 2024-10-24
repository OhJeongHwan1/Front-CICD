import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import MyInfo from "./pages/MyInfo";
import PostingAdd from "./pages/PostingAdd";
import PostingEdit from "./pages/PostingEdit";
import PostingDetail from "./pages/PostingDetail";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Space from "./pages/Space";
import NavigationBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavigationBar />
      <div style={{ padding: "90px 0 0 100px" }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/myInfo" element={<MyInfo />} />
          <Route path="/posting/add" element={<PostingAdd />} />
          <Route path="/posting/edit" element={<PostingEdit />} />
          <Route
            path="/posting/detail/:postingId"
            element={<PostingDetail />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="/register" element={<Register />} />
          <Route path="/space/:id" element={<Space />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
