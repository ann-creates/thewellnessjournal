import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// The curly braces {} are critical. They must match the component name exactly.
import { WellnessJournal } from './WellnessJournal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WellnessJournal />
  </React.StrictMode>
);