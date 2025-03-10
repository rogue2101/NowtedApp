import { ApiProvider } from "./components/Context/APIContext";
import MainComponent from "./components/MainComponent";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ApiProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router>
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route
            path="/recent/:folderid/notes/:noteid"
            element={<MainComponent />}
          />
          <Route
            path="folders/folderid/notes/newnote"
            element={<MainComponent />}
          />
          <Route path="/folders/:folderid/notes" element={<MainComponent />} />
          <Route
            path="/folders/:folderid/notes/:noteid"
            element={<MainComponent />}
          />
          <Route path="/favorites/notes" element={<MainComponent />} />
          <Route path="/favorites/notes/:noteid" element={<MainComponent />} />
          <Route path="/trash/notes" element={<MainComponent />} />
          <Route path="/trash/notes/:noteid" element={<MainComponent />} />
          <Route path="/archive/notes" element={<MainComponent />} />
          <Route path="/archive/notes/:noteid" element={<MainComponent />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;
