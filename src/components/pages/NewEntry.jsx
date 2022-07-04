import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NewEntry({ addEntry }) {
  const { category } = useParams();
  const [entry, setEntry] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const id = await addEntry(category, entry);
    nav(`/entry/${id}`);
  }

  return (
    <>
      <h2>New Entry in {category}</h2>
      <form className="container" onSubmit={submit}>
        <div>
          <textarea
            required
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows="10"
            className="form-control"
          ></textarea>
        </div>
        <button className="btn btn-primary mt-2">Create Entry</button>
      </form>
    </>
  );
}

export default NewEntry;
