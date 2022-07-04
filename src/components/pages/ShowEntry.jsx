function ShowEntry({ entry }) {
  return entry ? (
    <>
      <h5>{entry.entry}</h5>
      <p>Posted in {entry.category}</p>
    </>
  ) : (
    <p>Loading ...</p>
  );
}

export default ShowEntry;
