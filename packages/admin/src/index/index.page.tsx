import { LoadingModal } from '@mpigeon/client-shared';
import { useMount } from 'ahooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage: React.FC = () => {
  const navigate = useNavigate();
  useMount(() => {
    const token = localStorage.getItem('token');
    navigate(token ? '/connection' : '/login');
  });

  return <LoadingModal open />;
};

export default IndexPage;
