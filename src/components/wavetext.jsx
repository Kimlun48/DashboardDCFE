
// import styled, { keyframes } from 'styled-components';

// const waveAnimation = keyframes`
//   0% { transform: translateY(0); }
//   20% { transform: translateY(-10px); }
//   40% { transform: translateY(0); }
//   60% { transform: translateY(10px); }
//   80% { transform: translateY(0); }
//   100% { transform: translateY(-10px); 
// }
// `;

// const stretchAnimation = keyframes`
//   0%, 100% {
//     transform: scaleY(1);
//   }
//   50% {
//     transform: scaleY(1.5);
//   }
// `;

// const WaveText = styled.span`
//   display: inline-block;
//   animation: ${stretchAnimation} 1.5s infinite;
//   animation-delay: ${props => props.delay || '6s'};
// `;

// export default WaveText;
import React from "react";
import { Wave } from "react-animated-text";

const exampleStyle = {
  display: "inline-block",
  border: "1px solid #ccc",
  marginBottom: "1em",
  padding: "2em 1em 1em 1em",
  width: "80%",
  fontSize: "1.5rem"
};

const codeDivStyle = {
  backgroundColor: "#eee",
  marginTop: "2em",
  padding: "1px 1em",
  overflow: "scroll",
  fontSize: "1rem"
};

const codeStyle = {
  textAlign: "left"
};

export default WaveText = () => (
  <div style={exampleStyle}>
    <Wave text="LOADING DATA" effect="fadeOut" effectChange={1.0} />

    <div style={codeDivStyle}>
      <pre style={codeStyle}>
        &lt;Wave
        <br />
        &nbsp;&nbsp;text="LOADING DATA"
        <br />
        &nbsp;&nbsp;effect="fadeOut"
        <br />
        &nbsp;&nbsp;effectChange={1.0}
        <br />
        /&gt;
      </pre>
    </div>
  </div>
);

