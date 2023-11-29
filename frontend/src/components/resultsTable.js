function ResultsTable({ selectedAttributes, fetchedData }) {
  return (
    <div className="tableContainer">
      <h3> Show results </h3>
      <table className="table">
        <thead>
          <tr>
            {selectedAttributes?.map((attribute) => (
              <th key={attribute}>{attribute}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fetchedData?.length > 0 ? (
            fetchedData.map((rowData, index) => (
              <tr key={index}>
                {selectedAttributes?.map((fetchedData) => (
                  <td key={fetchedData}>{rowData?.[fetchedData]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={selectedAttributes?.length}>
                {fetchedData ? 'No data available' : 'Fetching data...'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;
