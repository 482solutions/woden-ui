export const unixToString = (uTime) => {
  const time = new Date(uTime * 1000).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
  });
  return time;
}