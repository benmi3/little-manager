const OK = true;
const NG = false;

function formatDateToYYYYMMDD(dateItem) {
  const year = dateItem.getFullYear();
  const month = (dateItem.getMonth() + 1).toString().padStart(2, '0');
  const day = dateItem.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTimeToHHMM(dateItem) {
  const hours = dateItem.getHours().toString().padStart(2, '0');
  const minutes = dateItem.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatDateTimeYYYYMMDDHHMM(dateItem) {
  const date = formatDateToYYYYMMDD(dateItem);
  const time = formatTimeToHHMM(dateItem);
  return `${date} ${time}`
}

function formatDateToRFC3339(dateItem) { const isoString = dateItem.toISOString(); return isoString.slice(0, 19) + 'Z'; }

function getFirstDayMonth(dateItemIn) {
  const dateItemOut = new Date(dateItemIn);
  dateItemOut.setDate(1);
  return dateItemOut;
}

function validateTime(startTime, stopTime) {
  try {
    return startTime.getTime() > stopTime.getTime() ? NG : OK
  }
  catch (e) {
    console.log("ValidateTimeError:", e)
    return NG
  }
}

