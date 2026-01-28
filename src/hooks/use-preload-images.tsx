import { useEffect, useState } from "react";

type UsePreloadImagesResult = {
  loaded: boolean;
  progress: number; // 0 → 1
  error: boolean;
};

export function usePreloadImages(imageUrls: string[]): UsePreloadImagesResult {
  const [loadedCount, setLoadedCount] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (imageUrls.length === 0) return;

    let isCancelled = false;

    setLoadedCount(0);
    setError(false);

    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        if (!isCancelled) {
          setLoadedCount((c) => c + 1);
        }
      };

      img.onerror = () => {
        if (!isCancelled) {
          setError(true);
          setLoadedCount((c) => c + 1);
        }
      };
    });

    return () => {
      isCancelled = true;
    };
  }, [imageUrls]);

  const loaded = loadedCount === imageUrls.length;
  const progress = imageUrls.length === 0 ? 1 : loadedCount / imageUrls.length;

  return { loaded, progress, error };
}
