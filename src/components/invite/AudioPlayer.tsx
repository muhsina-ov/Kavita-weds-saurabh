import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { invite } from "@/config/invite";

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export function AudioPlayer({ autoPlayTrigger }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.65;
    audio.loop = true;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // 1. Attempt autoplay immediately when page opens
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // Browser policy blocked silent autoplay; will unlock on first user gesture
        });
    }

    // 2. Start music on the very first user interaction anywhere on the screen
    const unlockAndPlay = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("pointerdown", unlockAndPlay, { passive: true, once: true });
    window.addEventListener("touchstart", unlockAndPlay, { passive: true, once: true });
    window.addEventListener("click", unlockAndPlay, { passive: true, once: true });
    window.addEventListener("keydown", unlockAndPlay, { passive: true, once: true });

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("pointerdown", unlockAndPlay);
      window.removeEventListener("touchstart", unlockAndPlay);
      window.removeEventListener("click", unlockAndPlay);
      window.removeEventListener("keydown", unlockAndPlay);
    };
  }, []);

  // When envelope is opened, ensure playback starts immediately
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {});
    }
  }, [autoPlayTrigger]);

  const toggle = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(12);
    }
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => {
          console.warn("Audio play failed:", err);
        });
    }
  };

  return (
    <>
      <audio id="invite-bgm" ref={audioRef} src={invite.bgm.src} preload="auto" loop />

      <motion.div
        className="fixed top-4 right-4 z-40 sm:top-6 sm:right-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={
            isPlaying
              ? `Pause background music: ${invite.bgm.title}`
              : `Play background music: ${invite.bgm.title}`
          }
          className="group relative flex items-center gap-2 rounded-full border border-border/70 bg-paper/85 px-3 py-2 shadow-[0_8px_24px_-8px_rgba(60,45,25,0.45)] backdrop-blur-md transition-all hover:bg-paper hover:shadow-[0_12px_28px_-6px_rgba(60,45,25,0.55)] active:scale-95"
        >
          {/* Animated pulsing disc / waveform icon */}
          <div className="relative flex size-6 items-center justify-center rounded-full bg-sepia/15 text-ink">
            {isPlaying ? (
              <motion.div
                className="flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Music className="size-3.5 text-sepia" />
              </motion.div>
            ) : (
              <VolumeX className="size-3.5 text-sepia/60" />
            )}

            {/* Subtle glow ring when playing */}
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-gold/60 animate-ping opacity-35" />
            )}
          </div>

          {/* Equalizer bars or song label */}
          <div className="flex items-center gap-1.5 pr-1">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-sepia/70 rounded-full animate-[bounce_0.8s_infinite_100ms] h-2.5" />
                <span className="w-0.5 bg-sepia/70 rounded-full animate-[bounce_0.8s_infinite_300ms] h-3.5" />
                <span className="w-0.5 bg-sepia/70 rounded-full animate-[bounce_0.8s_infinite_200ms] h-2" />
              </div>
            ) : (
              <Volume2 className="size-3 text-sepia/40" />
            )}

            <span className="caps text-[0.46rem] tracking-widest text-ink/75 group-hover:text-ink">
              {invite.bgm.title}
            </span>
          </div>
        </button>
      </motion.div>
    </>
  );
}
