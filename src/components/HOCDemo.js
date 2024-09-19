import React, { useState, useEffect } from 'react';
import withLoading from './withLoading';
import { Typography } from '@mui/material';

const DataComponent = ({ data }) => {
  return (
    <div>
      <Typography variant="h6">Fetched Data</Typography>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

const DataComponentWithLoading = withLoading(DataComponent);

const HOCDemo = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
          setData(json.slice(0, 5));
          setIsLoading(false);
        });
    }, 1500);
  }, []);

  return <DataComponentWithLoading isLoading={isLoading} data={data} />;
};

export default HOCDemo;
