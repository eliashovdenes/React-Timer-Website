import React, { useState, useEffect, useCallback } from 'react';
import { getQuotes } from '../services/quotesService';
import { useSpring, animated } from '@react-spring/web';

function Background() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = useCallback(async () => {
    try {
      const newQuotes = await getQuotes();
      if (newQuotes && newQuotes.length > 0) {
        setQuotes(newQuotes);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, 10000*3); // Fetch new quotes every 30 seconds
    return () => clearInterval(interval);
  }, [fetchQuotes]);

  return (
    <div className="background" style={{ backgroundColor: '#000000' }}>
      {quotes.map((quote, index) => (
        <FloatingQuote key={`${index}-${quote}`} quote={quote} onComplete={fetchQuotes} />
      ))}
    </div>
  );
}

function FloatingQuote({ quote, onComplete }) {
  const [{ x, y, opacity }, api] = useSpring(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    opacity: 0,
    config: { duration: 10000*3 },
  }));

  useEffect(() => {
    api.start({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: 1,
      onRest: () => {
        api.start({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: 0,
          onRest: onComplete,
        });
      },
    });
  }, [api, onComplete]);

  return (
    <animated.div
      className="floating-quote"
      style={{
        position: 'absolute',
        transform: x.to(x => `translate3d(${x}px, ${y.get()}px, 0)`),
        opacity,
      }}
    >
      {quote}
    </animated.div>
  );
}

export default Background;