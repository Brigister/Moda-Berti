import React, { useState } from 'react';
import { Router } from './Router';
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

import { UserContext } from './context/UserContext';
import { LoggedUser } from './interfaces/interfaces';


const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    }
  }
});



const App: React.FC = () => {
  //capire come passare setUser con i types
  const [user, setUser] = useState<LoggedUser>({
    token: '',
    isLoggedIn: false,
    isAdmin: false,
  });
  console.log('app', user.token)

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <UserContext.Provider value={{ user, setUser }} >
        <Router />
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  );
}

export default App;
