"use client";

import { useEffect, useRef } from "react";

/** Muted ambient loop that only plays while on screen and stays on its poster
 *  frame when the user prefers reduced motion. Decorative — hidden from AT. */
export function AutoVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "120px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      disablePictureInPicture
      aria-hidden="true"
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
