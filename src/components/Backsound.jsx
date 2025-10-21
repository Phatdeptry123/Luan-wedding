import React from "react";
import PauseTwoToneIcon from "@mui/icons-material/PauseTwoTone";
import PlayArrowTwoToneIcon from "@mui/icons-material/PlayArrowTwoTone";
import { Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";

/**
 *
 * @returns React.ReactElement
 */
const Backsound = () => {
  const audioRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [isPlay, setPlay] = React.useState(true); // ✅ Mặc định là phát nhạc
  const [constraints, setConstraints] = React.useState({});

  /**
   * Toggle giữa phát / tạm dừng
   */
  const toggleAudio = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay((prev) => !prev);
  };

  /**
   * Auto play nhạc khi load component
   */
  React.useEffect(() => {
    const audio = audioRef.current;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => setPlay(true))
        .catch(() => setPlay(false)); // Nếu bị chặn autoplay
    }
  }, []);

  /**
   * Cập nhật giới hạn drag khi resize
   */
  React.useLayoutEffect(() => {
    const updateConstraints = () => {
      const domRect = containerRef.current.getBoundingClientRect();
      const { top, bottom, left, right } = domRect;

      setConstraints({
        top: -top,
        bottom: window.innerHeight - bottom,
        left: -left,
        right: window.innerWidth - right,
      });
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <Box
      ref={containerRef}
      component={motion.div}
      drag
      dragConstraints={constraints}
      boxShadow={8}
      sx={{
        position: "fixed",
        zIndex: 2000,
        top: "50%",
        left: 10,
        transform: "translateY(-50%)",
        backgroundColor: "rgba(213, 206, 163, 0.7)",
        borderRadius: "50%",
        p: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <audio
        ref={audioRef}
        preload="true"
        loop
        autoPlay
        style={{ display: "none" }}
      >
        <source src="/assets/audio/backsound.mp3" type="audio/mp3" />
      </audio>

      <IconButton
        onClick={toggleAudio}
        color="secondary"
        sx={{ backgroundColor: "text.primary" }}
        aria-label="Play button"
        id="playButton"
        role="button"
        title="Play button"
        size="small"
      >
        {isPlay ? <PauseTwoToneIcon /> : <PlayArrowTwoToneIcon />}
      </IconButton>
    </Box>
  );
};

export default Backsound;
