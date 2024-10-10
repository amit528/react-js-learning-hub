import React, { useState, useEffect } from "react";

const UserList = () => {
  // State to hold fetched data and loading/error states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from the JSON file (simulating an API call with promises)
  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        console.log(response);
        
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        
        setData(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); // Also set loading to false if there's an error
      });
  }, []);

  // Event handler to update search query state
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Conditional rendering logic
  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Users List</h1>

      {/* Input field for filtering the user list */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name"
      />

      {/* Conditional rendering based on filtered data */}
      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserList;
