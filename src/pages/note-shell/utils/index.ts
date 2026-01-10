export const getBrowserInfo = (): string => {
  const ua = navigator.userAgent;
  let browser = "Unknown";

  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("MSIE") || ua.includes("Trident"))
    browser = "Internet Explorer";

  return browser;
};
