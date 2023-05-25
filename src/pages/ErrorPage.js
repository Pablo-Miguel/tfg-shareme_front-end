import React from 'react';

import Error from '../components/Error/Error';
import useUser from "../hooks/useUser";
import MainHeader from '../components/MainHeader/MainHeader';

function ErrorPage() {
  const user = useUser();

  return (
    <>
      { user && <MainHeader /> }
      <Error />
    </>
  );
}

export default ErrorPage;
