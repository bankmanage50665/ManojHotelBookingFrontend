import { useEffect } from "react";

const PIXEL_ID = "2032173333967673";

const MetaPixel = () => {
  useEffect(() => {
    // Initialize Meta Pixel
    const initPixel = () => {
      // Create fbq function if it doesn't exist
      if (!window.fbq) {
        window.fbq = function () {
          window.fbq.callMethod
            ? window.fbq.callMethod.apply(window.fbq, arguments)
            : window.fbq.queue.push(arguments);
        };
      }

      // Initialize queue if needed
      if (!window._fbq) {
        window._fbq = window.fbq;
      }

      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = "2.0";
      window.fbq.queue = window.fbq.queue || [];

      // Load the Facebook pixel script
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);

      // Initialize and track PageView
      window.fbq("init", PIXEL_ID);
      window.fbq("track", "PageView");
    };

    // Add noscript pixel
    const addNoScript = () => {
      const noscript = document.createElement("noscript");
      const img = document.createElement("img");
      img.height = 1;
      img.width = 1;
      img.style.display = "none";
      img.src = `https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      document.body.appendChild(noscript);
    };

    // Cleanup function to remove noscript element
    const cleanup = () => {
      const noscript = document.querySelector(
        'noscript img[src*="facebook.com/tr"]'
      );
      if (noscript) {
        noscript.parentElement.remove();
      }
    };

    initPixel();
    addNoScript();

    // Clean up when component unmounts
    return cleanup;
  }, []);

  return null;
};

export default MetaPixel;
