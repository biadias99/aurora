export function formatToDate () {
  function formatTimestampToDate (timestamp) {
    if (!timestamp || typeof timestamp.seconds !== 'number') return '';

    const date = new Date(timestamp.seconds * 1000);

    return (
      String(date.getMonth() + 1).padStart(2, '0') + '/' +
      String(date.getDate()).padStart(2, '0') + '/' +
      date.getFullYear()
    );
  }

  return {
    formatTimestampToDate,
  };
}
