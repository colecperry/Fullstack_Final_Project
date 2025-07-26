/**
 * index.js
 * 
 * This is the entry point for the React application.
 * It sets up the root React DOM render tree, wraps the app in routing and state management providers,
 * and starts the rendering of the main <App /> component.
 * 
 * Key integrations:
 * - React Router (BrowserRouter) for client-side navigation
 * - Recoil for global state management
 * - Semantic UI for styling
 * - Web Vitals reporting for performance analytics
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

// Import global styles and UI framework
import './assets/index.css';
import 'semantic-ui-css/semantic.min.css';

// Import the root app component and performance tool
import App from './components/App';
import reportWebVitals from './assets/reportWebVitals';

// Import routing provider
import { BrowserRouter as Router } from 'react-router-dom';

// Import Recoil for state management
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

// Create a React root and render the application inside the DOM element with id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router> {/* Enables client-side routing */}
    <RecoilRoot> {/* Wraps the app in global Recoil state context */}
      <React.Suspense fallback={<div>loading...</div>}> {/* Handles code-splitting or lazy loading */}
        <App /> {/* Main app component */}
      </React.Suspense>
    </RecoilRoot>
  </Router>
);

// Start measuring performance metrics (optional)
// You can log them to console or send to an analytics endpoint
reportWebVitals();
