const columns = [
    { id: 'formattedEventType', label: 'Event Type', align: 'center' },
    { id: 'severity', label: 'Severity', align: 'center',format: (value) => (value.toUpperCase()) },
    {
      id: 'user',
      label: 'User',
      align: 'center'
    },
    {
      id: 'date',
      label: 'Date',
      align: 'center',
      format: (value) => dateFormat(value)
    },
  ];
export default columns
  
const dateFormat = (date) => {
  const inputDate = new Date(date);
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}`;

  const hours = String(inputDate.getUTCHours()).padStart(2, '0');
  const minutes = String(inputDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(inputDate.getUTCSeconds()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const outputDateStr = `${formattedDate} | ${formattedTime}`;
  return outputDateStr
}
