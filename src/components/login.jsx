import React, { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    // Create a script element for the Visme embed
    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>Welcome to Our Site!</h1>
      <p>Please subscribe to our newsletter:</p>
      <div
        className="visme_d"
        data-title="Newsletter Subscription"
        data-url="1jvrk7pp-newsletter-subscription?fullPage=true"
        data-domain="forms"
        data-full-page="true"
        data-min-height="100vh"
        data-form-id="96453"
      />
    </div>
  );
};

export default Login;
