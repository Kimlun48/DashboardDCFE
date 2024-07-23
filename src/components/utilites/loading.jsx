import React from 'react';
//import './App.css'; // Import your CSS for animations

const LoadingData = () => {
  return (
    <div style={styles.main}>
      <div style={styles.myCircle}>
        <div style={styles.mainCircle}>
          <div style={styles.circle}></div>
          {/* <div style={styles.circle1}></div> */}
          <div style={styles.mainContent}>
            <h2 style={styles.mainText}>Hi!</h2>
            {/* <ul style={styles.bars}>
              <li style={{...styles.li, ...styles.liFirst}}></li>
              <li style={{...styles.li, ...styles.liSecond}}></li>
              <li style={{...styles.li, ...styles.liThird}}></li>
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  main: {
    display: 'table',
    height: '100vh',
    width: '100%',
    padding: '0px',
    margin: '0px',
    backgroundColor: '#171717',
    color: '#2187e7',
  },
  myCircle: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  mainCircle: {
    position: 'relative',
    maxWidth: '300px',
    maxHeight: '300px',
    margin: 'auto',
  },
  mainContent: {
    position: 'absolute',
    top: '0px',
    height: '100%',
    width: '100%',
  },
  mainText: {
    visibility: 'hidden',
    textAlign: 'center',
    verticalAlign: 'middle',
    marginTop: '50%',
    transform: 'translateY(-50%)',
    color: '#ccc',
    animation: 'fade 3s infinite linear',
    fontSize: '50px',
  },
  circle: {
    backgroundColor: 'rgba(0,0,0,0)',
    opacity: '.9',
    borderRadius: '300px',
    boxShadow: '0 0 75px #2187e7',
    width: '300px',
    height: '300px',
    margin: '0 auto',
    animation: 'spinPulse 2s infinite ease-in-out',
    WebkitAnimation: 'spinPulse 2s infinite ease-in-out',
  },
  circle1: {
    backgroundColor: 'rgba(0,0,0,0)',
    border: '5px solid rgba(0,183,229,0.9)',
    opacity: '.9',
    borderLeft: '5px solid rgba(0,0,0,0)',
    borderRight: '5px solid rgba(0,0,0,0)',
    borderRadius: '250px',
    boxShadow: '0 0 100px #2187e7',
    width: '250px',
    height: '250px',
    margin: '0 auto',
    position: 'absolute',
    top: '20px',
    left: '20px',
    animation: 'spinoffPulse 5s infinite linear',
    WebkitAnimation: 'spinoffPulse 5s infinite linear',
  },
  bars: {
    position: 'fixed',
    zIndex: '3',
    margin: '0 auto',
    left: '0',
    right: '0',
    top: '50%',
    marginTop: '-30px',
    width: '60px',
    height: '60px',
    listStyle: 'none',
  },
  li: {
    backgroundColor: '#FFFFFF',
    width: '10px',
    height: '10px',
    float: 'right',
    marginRight: '5px',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
  },
  liFirst: {
    animation: 'loadbars 0.6s cubic-bezier(0.645,0.045,0.355,1) infinite 0s',
    WebkitAnimation: 'loadbars 0.6s cubic-bezier(0.645,0.045,0.355,1) infinite 0s',
  },
  liSecond: {
    animation: 'loadbars 0.6s ease-in-out infinite -0.2s',
    WebkitAnimation: 'loadbars 0.6s ease-in-out infinite -0.2s',
  },
  liThird: {
    animation: 'loadbars 0.6s ease-in-out infinite -0.4s',
    WebkitAnimation: 'loadbars 0.6s ease-in-out infinite -0.4s',
  },
};

export default LoadingData;
