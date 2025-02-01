import React from 'react';
import ReactDOM from 'react-dom/client';

import './components/global.css';

import TodoApp from './components/app/app';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<TodoApp />);
