// Libraries imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Relative imports
import styles from './Registration.module.scss';
import store from '../../store/store';
import { addKey, addInfo } from '../../store/userInfo';
import HTTPRequest from '../../Util/HTTPRequest';

const Registration = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const registerUser = async () => {
    // Checks to see if name input is empty
    if (name.length > 2) {
      // Sends a request for the user API key
      const apiResp = await HTTPRequest.post('/register_candidate');

      const apikey = apiResp.data.apikey;

      // Sends a request to register the user with given the API key
      const registrationResp = await HTTPRequest.post('/player', {
        apikey,
        name,
      });

      const { id } = registrationResp.data;

      // Checks to see if the status code was 200 (successful)
      if (apiResp.status !== 200 || registrationResp.status !== 200) {
        setError('Connection with the server was unsuccessful');
        setTimeout(() => {
          setError('');
        }, 3000);
        return;
      }

      // Saves the API key and user info in the store
      store.dispatch(addKey({ apikey }));
      store.dispatch(addInfo({ name, id }));

      // Redirects user to boards page
      history.push('/boards');
    } else {
      // Displays an error for invalid name input
      // and removes it after 3 seconds
      setError('Please enter a valid name');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome!</h1>
      <h2>Please enter your name</h2>
      <div className={styles.nameWrapper}>
        {error ? (
          <div className={styles.alert}>
            <p>{error}</p>
          </div>
        ) : null}
        <input
          className="input"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="button is-danger is-rounded" onClick={registerUser}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Registration;
