import React from 'react';
import Footer from './Footer';

const LayoutProvider = ({ children }) => {
  return (
    <div className="app-container">
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutProvider;
