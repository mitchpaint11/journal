import React from "react";
import { Link } from "react-router-dom";

function EntryListItem({ id, text }) {
  return (
    <li key={id}>
      <Link to={`/entry/${id}`}>{text}</Link>
    </li>
  );
}

export default EntryListItem;
