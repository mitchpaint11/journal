import { useContext } from "react";
import StoreContext from "../store";
import EntryListItem from "./EntryListItem";

function EntryList() {
  const {
    store: { entries },
  } = useContext(StoreContext);
  //   const { entries } = store;

  return entries ? (
    <ul>
      {entries.map((entry) => (
        <EntryListItem id={entry._id} text={entry.entry} />
      ))}
    </ul>
  ) : (
    <p>Loading ...</p>
  );
}

export default EntryList;
