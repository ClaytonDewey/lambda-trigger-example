import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import './App.css';

const App = () => {
  const [user, updateUser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => updateUser(user))
      .catch((err) => console.error(err));
  }, []);
  let isAdmin = false;
  if (user) {
    const {
      signInUserSession: {
        idToken: { payload },
      },
    } = user;
    console.log('payload: ', payload);
    if (
      payload['cognito:groups'] &&
      payload['cognito:groups'].includes('Admin')
    ) {
      isAdmin = true;
    }
  }
  return (
    <Authenticator>
      {({ signOut }) => (
        <div className='App'>
          <header>
            <h1>Hello World</h1>
            {isAdmin && <p>Welcome, Admin</p>}
          </header>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
};

export default App;
