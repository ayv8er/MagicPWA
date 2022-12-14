import { useState } from 'react';
import { Magic } from 'magic-sdk';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [emailAddress, setEmailAddress] = useState('')
  const [storedValue, setStoredValue] = useState('')

  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const magic = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
    )
    magic.auth.loginWithMagicLink({
      email: emailAddress
    })
    setEmailAddress('')
  };

  const handleValueChange = (e) => {
    setStoredValue(e.target.value);
  };

  const handleStoreString = (e) => {
    e.preventDefault();
    localStorage.setItem('string', storedValue);
    setStoredValue('');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Next PWA Demo
        </h1>

        <p className={styles.description}>
          Store string value and/or store valid Magic session to local storage.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Store {!storedValue ? 'String' : storedValue} &rarr;</h2>
            <p>Store this string to local storage</p>
            <input
              style={{marginTop: '1rem'}}
              onChange={handleValueChange}
              type='text'
              value={storedValue}
            />
            <button onClick={handleStoreString}>Store</button>
          </div>

          <div className={styles.card}>
            <h2>Store Magic &rarr;</h2>
            <p>Store Magic session to local storage</p>
            <input
              style={{marginTop: '1rem'}}
              onChange={handleEmailChange}
              type='text'
              value={emailAddress}
              />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </main>
    </div>
  )
}
