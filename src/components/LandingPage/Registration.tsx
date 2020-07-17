// Libraries imports
import React, { useState } from 'react';
import axios from 'axios';
// Relative imports
import styles from './Registration.module.scss';
import store from '../../store/store';
import { addKey, addName } from '../../store/userInfo';

const Registration = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const registerUser = async () => {
    if (name.length > 2) {
      const apiKeyResponse = await axios.post(
        'http://178.128.206.150:7000/register_candidate'
      );

      const apikey = apiKeyResponse.data.apikey;

      await axios.post('http://178.128.206.150:7000/player', {
        apikey,
        name,
      });

      store.dispatch(addKey({ apikey }));
      store.dispatch(addName({ name }));
    } else {
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome!</h1>
      <h2>Please enter your name</h2>
      <div className={styles.nameWrapper}>
        <input
          className="input"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="button is-danger" onClick={registerUser}>
          REGISTER
        </button>
      </div>
    </div>
  );
};

export default Registration;
