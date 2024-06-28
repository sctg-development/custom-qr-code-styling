import React from 'react'

function Header(): JSX.Element {
  return (
    <header className='header bg-dark text-light'>
      <div className='container'>
        <div className='d-flex justify-content-between align-items-center py-3'>
          <div className='qr-logo'>
            <h1 className='h5 mb-0 fw-light'>
              <span className='fw-bolder'>ADMB</span> QR CODE GENERATOR
            </h1>
          </div>
          <a target='_blank' rel='noopener noreferrer' href='https://lesailesdumontblanc.com'>
            <img src="/admb-white.svg" alt="ADMB" width="50" height="50" />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
