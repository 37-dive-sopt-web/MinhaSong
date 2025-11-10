export function sortGameHistory (history) {
  return history.sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level;
    }
    return a.clearTime - b.clearTime;
  })
};