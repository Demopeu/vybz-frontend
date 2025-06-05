export function formatNumberToK(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatNumberToKm(num: number): string {
  if (num >= 1_000_000) {
    return parseFloat((num / 1_000_000).toFixed(1)).toString() + 'm';
  }
  if (num >= 1_000) {
    return parseFloat((num / 1_000).toFixed(1)).toString() + 'k';
  }
  return num.toString();
}

