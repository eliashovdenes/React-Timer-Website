import React, { useState, useEffect, useRef} from 'react';
import { Box, Button, CircularProgress, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const TimerDisplay = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'inline-flex',
    marginBottom: theme.spacing(2),
}));
  
const TimeText = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
}));
  
const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: 50,
    padding: '10px 40px',
    fontSize: '1rem',
    textTransform: 'none',
    margin: theme.spacing(1),
}));
  
const AdjustTimeButton = styled(IconButton)(({ theme }) => ({
    color: '#00bcd4',
    '&:hover': {
      backgroundColor: 'rgba(0, 188, 212, 0.1)',
    },
}));

function Timer() {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime === 0) {
            setIsRunning(false);
            if (audioRef.current) {
              audioRef.current.play()
            }
          }
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleIncrement = () => {
    if (!isRunning && time < 60 * 60) { 
      setTime(prevTime => prevTime + 60);
      setInitialTime(prevTime => prevTime + 60);
    }
  };

  const handleDecrement = () => {
    if (!isRunning && time >= 60) {
      setTime(prevTime => prevTime - 60);
      setInitialTime(prevTime => prevTime - 60);
    }
  };

  const handleStartPause = () => {
    if (time > 0) {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setTime(0);
    setInitialTime(0);
    setIsRunning(false);
  };

  const progress = initialTime > 0 ? (time / initialTime) * 100 : 0;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <TimerDisplay>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={300}
          thickness={4}
          sx={{ color: '#ffffff', backgroundColor: 'transparent' }}
        />
        <TimeText>
          <Typography variant="h2" component="div" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 2 }}>
            {formatTime(time)}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <AdjustTimeButton onClick={handleDecrement} disabled={isRunning || time < 60}>
              <RemoveIcon />
            </AdjustTimeButton>
            <Typography variant="h6" sx={{ mx: 2, color: '#ffffff' }}>
              {Math.floor(time / 60)} min
            </Typography>
            <AdjustTimeButton onClick={handleIncrement} disabled={isRunning || time >= 60 * 60}>
              <AddIcon />
            </AdjustTimeButton>
          </Box>
        </TimeText>
      </TimerDisplay>
      <Box>
        <StyledButton
          variant="contained"
          onClick={handleStartPause}
          sx={{ 
            backgroundColor: '#ffffff', 
            color: '#000000',
            '&:hover': { backgroundColor: '#e0e0e0' } 
          }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </StyledButton>
        <StyledButton
          variant="outlined"
          onClick={handleReset}
          sx={{ 
            color: '#ffffff', 
            borderColor: '#ffffff',
            '&:hover': { borderColor: '#e0e0e0', backgroundColor: 'rgba(255,255,255,0.1)' },
          }}
        >
          Reset
        </StyledButton>
      </Box>
      <audio ref={audioRef} src="/Timer_end.mp3" />
    </Box>
  ); 
}

export default Timer;