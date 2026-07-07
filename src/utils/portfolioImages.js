export function getPortfolioImagePaths(imgPath) {
  const normalized = imgPath.replace(/\.webp$/i, "");

  return {
    thumb: `${normalized}-480.webp`,
    medium: `${normalized}-800.webp`,
    full: imgPath,
  };
}
