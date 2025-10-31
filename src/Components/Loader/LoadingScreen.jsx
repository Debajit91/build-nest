import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Logo from "../../../public/Logo.png";

function LoadingScreen({ isOpen = true, message = "Loading…", progress }) {
  const prefersReduced = useReducedMotion();

  const backdrop = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  };

  const card = {
    initial: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.98, filter: "blur(2px)" },
    transition: { duration: 0.25, ease: "easeOut" }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          {...backdrop}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-background/60 backdrop-blur-sm"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <motion.div
            key="card"
            {...card}
            className="flex w-[min(92vw,22rem)] flex-col items-center gap-4 rounded-2xl border bg-card p-6 shadow-xl dark:shadow-black/30"
          >
            {/* Logo pulse */}
            <motion.img
              src={Logo}
              alt="App logo"
              className="w-24 h-24 object-contain p-2"
              animate={
                prefersReduced ? {} : { opacity: [0.6, 1, 0.6], scale: [0.98, 1, 0.98] }
              }
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />

            {/* Spinner OR progress */}
            {typeof progress === "number" ? (
              <div className="w-full">
                <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{message}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full bg-primary"
                    style={{
                      width: `${Math.min(Math.max(progress, 0), 100)}%`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                    transition={{ type: "tween", duration: 0.3 }}
                  />
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">{message}</p>
                <div
                  className="w-10 h-10 border-4 border-primary/70 border-t-transparent rounded-full"
                  aria-hidden="true"
                >
                  <motion.div
                    className="w-full h-full rounded-full border-4 border-transparent border-t-primary"
                    animate={prefersReduced ? {} : { rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                  />
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
