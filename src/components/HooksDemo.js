import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, List, ListItem } from '@mui/material';

const HooksDemo = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data.slice(0, 5));
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4">Hooks Demo</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {posts.map(post => (
            <ListItem key={post.id}>{post.title}</ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default HooksDemo;
