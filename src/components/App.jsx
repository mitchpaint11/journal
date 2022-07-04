import { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Nav from "./Nav";
import CategorySelection from "./pages/CategorySelection";
import Home from "./pages/Home";
import NewEntry from "./pages/NewEntry";
import ShowEntry from "./pages/ShowEntry";

const initialState = {
  entries: [],
  categories: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setEntries":
      return {
        ...state,
        entries: action.data,
      };
    case "addEntry":
      return {
        ...state,
        entries: [...state.entries, action.data],
      };
    default:
      return state;
  }
}

function App() {
  // const [entries, setEntries] = useState([])
  const [store, dispatch] = useReducer(reducer, initialState);
  const { entries } = store;

  useEffect(() => {
    async function getEntries() {
      const res = await fetch("http://localhost:4000/api/v1/entries");
      // setEntries(await res.json());
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
    // setEntries([...entries, returnedEntry]);
    dispatch({
      type: "addEntry",
      data: returnedEntry,
    });
    return returnedEntry._id;
  }

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home entries={entries} />} />
        <Route path="/category" element={<CategorySelection />} />
        <Route path="/entry/:id" element={<ShowEntryWrapper />} />
        <Route
          path="/entry/new/:category"
          element={<NewEntry addEntry={addEntry} />}
        />
        <Route path="*" element={<h4>Page not found!</h4>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
