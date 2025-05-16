import { Timestamp } from 'firebase/firestore';

export function dateToTimestamp (dateString) {
  const date = new Date(dateString);
  return Timestamp.fromDate(date);
}
