import { useState, useCallback } from 'react';
import axios from 'axios';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios({
        url: requestConfig.url,
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        data: requestConfig.body ? requestConfig.body : null,
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Request failed!');
      }

      applyData(response.data);
    } catch (err) {
      setError(err.response.data.message || 
        (err.response.data.keyValue.nickName && `${err.response.data.keyValue.nickName} ya existe en ShareMe`) || 
        (err.response.data.keyValue.email && `${err.response.data.keyValue.email} ya existe en ShareMe`) || 
        'Something went wrong!'
      );
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
