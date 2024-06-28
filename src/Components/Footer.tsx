import React from 'react'

function Footer(): JSX.Element {
  return (
    <footer className='mt-auto text-center'>
      <p>
        Build with React, based on{' '}
        <a target='_blank' rel='noopener noreferrer' href='https://github.com/kozakdenys/qr-code-styling'>
          QR Code Styling JS library.
        </a>
        {' - '}{' '}
        <a target='_blank' rel='noopener noreferrer' href='https://github.com/awran5/custom-qr-code-styling'>
          Custom QR Code Styling.
        </a>
        {' - '}{' '}
        <a target='_blank' rel='noopener noreferrer' href='https://github.com/awran5/custom-qr-code-styling'>
          (c) 2024 Les Ailes du Mont-Blanc
        </a>
      </p>
    </footer>
  )
}

export default Footer
