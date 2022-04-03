import { LoadingModal } from '@mpigeon/client-shared';
import { useMount } from 'ahooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage: React.FC = () => {
  const navigate = useNavigate();
  useMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/register-code');
    } else {
      navigate('/login');
    }
  });

  return <LoadingModal open />;
};

export default IndexPage;