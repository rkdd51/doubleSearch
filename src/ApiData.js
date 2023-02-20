import "./styles.css";
import { useEffect, useState } from "react";
function ApiData() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const [filteredDataValue, setFilteredDataValue] = useState(filteredData);

  const apiCall = async () => {
    const data = await fetch("https://fakestoreapi.com/products");
    const value = await data.json();
    setAllData(value);
    setFilteredData(value);
  };

  useEffect(() => {
    apiCall();
  }, []);

  const handleSearchName = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = allData.filter((data) => {
      return data.title.toLowerCase().search(value.toLowerCase()) !== -1;
    });
    setFilteredData(result);
  };
  const handleSearchDescription = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    if (result.length === 0) {
      result = allData.filter((data) => {
        return (
          data.description.toLowerCase().search(value.toLowerCase()) !== -1
        );
      });
      setFilteredData(result);
    } else {
      setFilteredData(setFilteredDataValue(filteredDataValue));
    }
  };
  return (
    <div className="App">
      <input
        type="text"
        onChange={(event) => handleSearchName(event)}
        placeholder="Title"
      />
      &nbsp;
      <input
        type="text"
        onChange={(event) => handleSearchDescription(event)}
        placeholder="Description"
      />
      {filteredData?.map((val) => {
        return (
          <>
            <div>
              <li>{val.title}</li>
              <li>{val.description}</li>
              <hr />
            </div>
          </>
        );
      })}
    </div>
  );
}
export default ApiData;
