import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Nav from "./Nav";
import CategorySelection from "./pages/CategorySelection";
import Home from "./pages/Home";
import NewEntry from "./pages/NewEntry";
import ShowEntry from "./pages/ShowEntry";
import StoreContext from "../store";
import useStore from "../reducer";

function App() {
  const [store, dispatch] = useStore();
  const { entries } = store;

  useEffect(() => {
    async function getEntries() {
      const res = await fetch("http://localhost:4000/api/v1/entries");
      dispatch({
        type: "setEntries",
        data: await res.json(),
      });
    }
    getEntries();
  }, []);

  function ShowEntryWrapper() {
    const { id } = useParams();
    return <ShowEntry entry={entries.find((entry) => entry._id == id)} />;
  }

  async function addEntry(category, entry) {
    const newEntry = { category, entry };
    const res = await fetch("http://localhost:4000/api/v1/entries", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    });
    const returnedEntry = await res.json();
    dispatch({
      type: "addEntry",
      data: returnedEntry,
    });
    return returnedEntry._id;
  }

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategorySelection />} />
          <Route path="/entry/:id" element={<ShowEntryWrapper />} />
          <Route
            path="/entry/new/:category"
            element={<NewEntry addEntry={addEntry} />}
          />
          <Route path="*" element={<h4>Page not found!</h4>} />
        </Routes>
      </BrowserRouter>
    </StoreContext.Provider>
  );
}

export default App;
