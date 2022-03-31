import { useMount } from 'ahooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage: React.FC = () => {
  const navigate = useNavigate();
  useMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/welcome');
    } else {
      navigate('/login');
    }
  });

  return <div>IndexPage</div>;
};

export default IndexPage;
