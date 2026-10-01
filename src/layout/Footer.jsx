import React from 'react'

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div>
          <i className="fas fa-solar-panel" style={{ color: '#f9d342' }}></i>
          {' '}Desa Margalaksana © 2026
        </div>
        <div>
          <i className="fas fa-leaf" style={{ color: '#6ec8e6' }}></i>
          {' '}Hijau, berkelanjutan, bertenaga surya.
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: '#0b1a26',
    color: 'rgba(255,255,255,0.7)',
    padding: '40px 0',
    marginTop: '20px',
    borderTop: '4px solid #f9d342',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

export default Footer