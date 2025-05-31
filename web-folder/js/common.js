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

function getLastDayMonth(dateItemIn) {
  const dateItemOut = new Date(dateItemIn);
  dateItemOut.setMonth(dateItemOut.getMonth() + 1);
  dateItemOut.setDate(0);
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


function createRpcRequestBody(requestMethod, params) {
  const uuid = self.crypto.randomUUID();
  const body = JSON.stringify({
    "jsonrpc": "2.0",
    "id": uuid, // TODO: add user-id after UUID for bug request handeling
    "method": requestMethod,
    "params": params
  });
  return body;
}


// function storeUserName(username) {
//   localStorage.setItem("username", username);
// }

function getUserName(_userId) {
  return localStorage.getItem("username")
}
