export function calctime(Due: string) {
  const today = new Date();
  const targetDate = new Date(Due);
  const diffTime = targetDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.abs(daysLeft);
}

export function parseCustomTimestamp(ts: string): Date {
  if (!/^\d{17}$/.test(ts)) {
    throw new Error("Invalid timestamp format. Expected YYYYMMDDHHMMSSmmm");
  }

  const year = Number(ts.substring(0, 4));
  const month = Number(ts.substring(4, 6)) - 1; // 0-based
  const day = Number(ts.substring(6, 8));
  const hour = Number(ts.substring(8, 10));
  const minute = Number(ts.substring(10, 12));
  const second = Number(ts.substring(12, 14));
  const ms = Number(ts.substring(14, 17));

  return new Date(year, month, day, hour, minute, second, ms);
}

export function calctime_2(Due: string) {
  const today = new Date();
  const targetDate = parseCustomTimestamp(Due);

  const isToday =
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate();

  if (isToday) {
    let hours = targetDate.getHours();
    const minutes = targetDate.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  } else {
    const month = (targetDate.getMonth() + 1).toString().padStart(2, "0");
    const day = targetDate.getDate().toString().padStart(2, "0");
    const year = targetDate.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
  }
}

export function calctime_3(Due: string): string {
  const today = new Date();
  const targetDate = parseCustomTimestamp(Due);

  const isToday =
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate();

  if (isToday) {
    return "Today";
  } else {
    const month = (targetDate.getMonth() + 1).toString().padStart(2, "0");
    const day = targetDate.getDate().toString().padStart(2, "0");
    const year = targetDate.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
  }
}

export function isSameDay(ts1: string, ts2: string): boolean {
  const d1 = ts1.substring(0, 8);
  const d2 = ts2.substring(0, 8);
  return d1 === d2;
}

export function extractTimeAMPM(timestamp: string): string {
  const date = parseCustomTimestamp(timestamp);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}

export function generateLocalTempId(): string {
  const now = new Date();
  return (
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0") +
    String(now.getMilliseconds()).padStart(3, "0")
  );
}
