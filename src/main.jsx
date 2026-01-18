import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { polyfill } from 'mobile-drag-drop'
import 'mobile-drag-drop/default.css'
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour'

// Fix dnd on mobile devices (the majority issues interface showed on IOS)
polyfill({
  holdToDrag: 150,
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
})

window.addEventListener('touchmove', function() {}, {passive: false});
//
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
