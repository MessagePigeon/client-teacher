import { useMount } from 'ahooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../components/LoadingModal';

const Index: React.FC = () => {
  const navigate = useNavigate();
  useMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/send-message');
    } else {
      navigate('/login');
    }
  });
  return <LoadingModal open />;
};

export default Index;
