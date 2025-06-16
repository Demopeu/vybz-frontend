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

export function formatAmount(amount: number, unit: string): string {
  return amount.toLocaleString('ko-KR') + unit;
}

export function categorizeAndFormatDate(dateString: string) {
  const today = new Date();
  const targetDate = new Date(dateString);
  const diffTime = today.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  let category = '';
  let timeAgo = '';
  
  if (diffDays === 0) {
    category = '오늘';
    timeAgo = '오늘';
  } else if (diffDays === 1) {
    category = '어제';
    timeAgo = '1일 전';
  } else if (diffDays <= 7) {
    category = '최근 7일';
    timeAgo = `${diffDays}일 전`;
  } else if (diffDays <= 30) {
    category = '최근 30일';
    timeAgo = `${diffDays}일 전`;
  } else {
    category = '이전 활동';
    timeAgo = `${diffDays}일 전`;
  }
  
  return { category, timeAgo };
}