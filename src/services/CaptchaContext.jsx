// CaptchaContext.jsx
import { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

export const CaptchaContext = createContext({
  captchaCompleted: false,
  handleCaptchaCompletion: () => {},
});

export const CaptchaProvider = ({ children }) => {
  const [captchaCompleted, setCaptchaCompleted] = useState(false);

  useEffect(() => {
    const captchaResponse = localStorage.getItem('captchaCompleted');
    setCaptchaCompleted(captchaResponse === 'true');
  }, []);

  const handleCaptchaCompletion = (captchaResponse) => {
    // Check if the captchaResponse is valid
    if (captchaResponse) {
      localStorage.setItem('captchaCompleted', 'true');
      setCaptchaCompleted(true);
    }
  };

  return (
    <CaptchaContext.Provider value={{ captchaCompleted, handleCaptchaCompletion }}>
      {children}
    </CaptchaContext.Provider>
  );
};
CaptchaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};