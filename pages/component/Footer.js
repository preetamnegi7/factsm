import React from 'react'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
const Footer = () => {
    return (
        <div className='ftr'> 
            <footer className={styles.footer}>
        <a
          href="https://factsmantra.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/logo.png" alt="Vercel Logo" width={96} height={96} />
          </span>
        </a>
      </footer>
        </div>
    )
}

export default Footer
