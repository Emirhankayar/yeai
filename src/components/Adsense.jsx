import { useEffect } from 'react';
import PropTypes from 'prop-types';

const AdSenseComponent = ({ adClient, adSlot, adFormat, adLayoutKey }) => {
  useEffect(() => {
    try {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format={adFormat}
      data-ad-layout-key={adLayoutKey}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
    />
  );
};

AdSenseComponent.propTypes = {
  adClient: PropTypes.string.isRequired,
  adSlot: PropTypes.string.isRequired,
  adFormat: PropTypes.string,
  adLayoutKey: PropTypes.string,
};

export default AdSenseComponent;