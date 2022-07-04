import React from "react";
import { Link } from "react-router-dom";

function Home({ entries }) {
  return entries ? (
    <ul>
      {entries.map((entry) => (
        <li key={entry._id}>
          <Link to={`/entry/${entry._id}`}>{entry.entry}</Link>
        </li>
      ))}
    </ul>
  ) : (
    <p>Loading ...</p>
  );
}

export default Home;
