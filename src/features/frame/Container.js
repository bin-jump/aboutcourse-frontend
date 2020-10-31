import React from 'react';
import Header from './components/Header';
import Side from './components/Side';
import './Container.less';

export default function Container(props) {
  const { children } = { ...props };

  return (
    <div style={{ height: '100%', background: '#f4f6f8' }}>
      <Header />
      <div style={{ display: 'flex' }}>
        <Side />
        <div className="frame-app-content">{children}</div>
      </div>
    </div>
  );
}
