import { useState } from "react";
import { Link } from "react-router-dom";

function CategorySelection() {
  const [categories, setCategories] = useState([
    "Food",
    "Coding",
    "Work",
    "Other",
  ]);

  return (
    <>
      <h2>Please select a category:</h2>
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>
            <Link to={`/entry/new/${cat}`}>{cat}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CategorySelection;
