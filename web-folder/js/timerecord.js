let timerecordTable = null;

async function doTimeRecord(e) {
  e.preventDefault();

  // Hidden parameter section --
  const updateFlag = document.getElementById("updateFlag").value;
  const selectedValueEl = document.getElementById("selectedValue");
  const selectedValue = selectedValueEl.value ? JSON.parse(selectedValueEl.value) : {};
  // Start date --
  const startDate = document.getElementById("startDate").value;
  const startTime = document.getElementById("startTime").value;
  const startDateTime = new Date(startDate + " " + startTime)
  // Stop date --
  const stopDate = document.getElementById("stopDate").value;
  const stopTime = document.getElementById("stopTime").value;
  const stopDateTime = new Date(stopDate + " " + stopTime)
  if (validateTime(startDateTime, stopDateTime) === NG) {
    alert("TimeValidation Error")
    return;
  }
  // Place --
  const place = document.getElementById("place").value;
  // TODO: implement regex for place
  //
  //
  const submitButton = document.getElementById("timerecordSubmit");
  if (updateFlag != "" && selectedValue != {}) {
    showHoverDialog(`Do you wish to update the entry for ${selectedValue["ctime"]} or create new?`,
      submitButton,
      { func: handleUpdateAction, params: [updateFlag, startDateTime, stopDateTime, place], textContent: "UPDATE" },
      { func: handleCreateAction, params: [startDateTime, stopDateTime, place], textContent: "CREATE" })
  } else {
    return await handleCreateAction(startDateTime, stopDateTime, place);
  }
  return;
}

async function handleCreateAction(startDateTime, stopDateTime, place) {
  params = {
    "data": {
      "start_time": formatDateToRFC3339(startDateTime),
      "stop_time": formatDateToRFC3339(stopDateTime),
      "place": place
    }
  };
  const res = await doTimeRecordReq(params, "create_timerecord");
  const json_res = await res.json()
  if (json_res && json_res["result"]) {
    const newRecord = json_res["result"]["data"]
    if (newRecord) {
      timerecordTable.row.add(newRecord).draw();
    }
  }
  return;
}

async function handleUpdateAction(id, startDateTime, stopDateTime, place) {
  const selectedValue = JSON.parse(document.getElementById("selectedValue").value ?? "");
  const data = {};
  if (startDateTime != selectedValue["start_time"]) data["start_time"] = formatDateToRFC3339(stopDateTime);
  if (stopDateTime != selectedValue["stop_time"]) data["stop_time"] = formatDateToRFC3339(stopDateTime);
  if (place != selectedValue["place"]) data["place"] = place;
  if (!data) {
    // no reason to update if no values has changed
    return;
  }
  params = {
    "id": Number(id),
    "data": data,
  };
  const res = await doTimeRecordReq(params, "update_timerecord");
  // TODO: instead of adding, you need to find existing, then edit that
  const json_res = await res.json()
  if (json_res && json_res["result"]) {
    const newRecord = json_res["result"]["data"]
    if (newRecord) {
      // timerecordTable.row.add(newRecord).draw();
      timerecordTable.ajax.reload();
    }
  }
  return;
}


async function doTimeRecordReq(params, requestMethod) {
  const headers = {
    "Content-Type": "application/json",
  };
  const uuid = self.crypto.randomUUID();
  const body = createRpcRequestBody(requestMethod, params);
  return await fetch("/api/rpc", { headers: headers, method: "POST", body: body });
}

function setSTime(start, setTime) {
  const whatTime = start ? "start" : "stop";
  const thisTime = new Date(setTime);
  const x = document.getElementById(`${whatTime}Date`);
  const y = document.getElementById(`${whatTime}Time`);
  x.value = formatDateToYYYYMMDD(thisTime);
  y.value = formatTimeToHHMM(thisTime);
}


function setPlace(place) {
  const placeEl = document.getElementById("place");
  placeEl.value = place;
}

async function setupPage() {
  const now = new Date(Date.now());
  const prev = new Date(now.getTime());
  prev.setHours(now.getHours() - 1);
  setSTime(true, prev);
  setSTime(false, now);
}

async function resetForm() {
  setPlace("");
  return setupPage();
}


function populatePlaceDatalist(dataTable) {
  const placeOptionsDatalist = document.getElementById('placeOptions');
  if (!placeOptionsDatalist) {
    console.warn("Datalist with ID 'placeOptions' not found.");
    return;
  }

  // Clear existing options to prevent duplicates
  placeOptionsDatalist.innerHTML = '';

  const uniquePlaces = new Set();
  dataTable.rows().every(function () {
    const rowData = this.data();
    if (rowData && rowData.place) {
      uniquePlaces.add(rowData.place);
    }
  });

  // Add each unique place as an option to the datalist
  uniquePlaces.forEach(place => {
    const option = document.createElement('option');
    option.value = place;
    placeOptionsDatalist.appendChild(option);
  });
}

function timerecordFormatData(data) {
  if (!data) return data;
  const row_struct = { ctime: "", id: "", start_time: "", stop_time: "", place: "" }
  const startdate = new Date(data[0]["ctime"]);
  const enddate = new Date(data[-1]["stop_time"]);
  const iteratordate = getFirstDayMonth(startdate);
  const new_array = new Array();
  while (iteratordate.getMonth() < enddate.getMonth() + 1) {
    console.log("add another day");
    const item = new row_struct;
    item.ctime = formatDateTimeYYYYMMDDHHMM(iteratordate);
    new_array.push(item);
    iteratordate.setDate(iteratordate.getDate() + 1);
  }

  return new_array
}

function updateFlagSet(val) {
  document.getElementById("updateFlag").value = val;

}

function updateFlagReset() {
  updateFlagSet("")
}

function selectedValueSet(val) {
  document.getElementById("selectedValue").value = val;
}

async function handleRowSelection(_e, dt, type, indexes) {
  if (type === 'row') {
    var rowData = dt.rows(indexes).data().toArray();
    setSTime(true, rowData[0]["start_time"]);
    setSTime(false, rowData[0]["stop_time"]);
    setPlace(rowData[0]["place"]);
    updateFlagSet(rowData[0]["id"]);
    selectedValueSet(JSON.stringify(rowData[0]));
  }
}

$(document).ready(function () {
  timerecordTable = new DataTable('#timerecordTable', {
    ajax: {
      url: 'api/rpc',
      type: 'POST',
      contentType: 'application/json',
      data: function (_d) {
        const today = new Date(Date.now());
        const firstDay = getFirstDayMonth(today);
        const lastDay = getLastDayMonth(today);
        const gte = formatDateToRFC3339(firstDay);
        const lte = formatDateToRFC3339(lastDay);
        const params = {
          "filters": {
            "start_time": { "$gte": gte, "$lte": lte },
          },
          "list_options": {
            "order_bys": "start_time",
            "limit": 300,
          }
        };
        return createRpcRequestBody("list_timerecords", params);
      },
      dataSrc: function (jsonResponse) {
        if (jsonResponse && jsonResponse.result && jsonResponse.result.data) {
          return jsonResponse.result.data;
        }

        console.error("Unexpected API response format:", jsonResponse);
        return [];
      },
      error: function (xhr, errorType, thrownError) {

        if (thrownError == "Forbidden") window.location.href = "signin.html"

        // Handle AJAX errors (e.g., network issue, server error)
        console.error("Error fetching data for projectTable:", errorType, thrownError);
        console.error("Response Text:", xhr.responseText);
        $('#projectTable tbody td').text('Error loading data.');
      }
    },
    searching: false, // search box
    ordering: true,   // column sorting
    paging: false,    // pagination
    info: false,      // "Showing x of y entries"

    columnDefs: [
      { targets: 0, checkboxes: { selectRow: true } }
    ],

    columns: [
      {
        data: 'start_time',
        defaultContent: 'N/A',
        render: function (data, type, _row) {
          if (type === 'display' && data) {
            return formatDateToYYYYMMDD(new Date(data));
          }
          return data;
        }
      },
      {
        data: 'cid',
        defaultContent: 'N/A',
        render: function (data, type, _row) {
          if (type === 'display' && data) {
            return getUserName(data);
          }
          return data;
        }
      },
      { data: 'place', defaultContent: 'N/A' },
      {
        data: 'start_time',
        defaultContent: 'N/A',
        render: function (data, type, _row) {
          if (type === 'display' && data) {
            return formatDateTimeYYYYMMDDHHMM(new Date(data));
          }
          return data;
        }
      },
      {
        data: 'stop_time',
        defaultContent: 'N/A',
        render: function (data, type, _row) {
          if (type === 'display' && data) {
            return formatDateTimeYYYYMMDDHHMM(new Date(data));
          }
          return data;
        }
      }
    ],

    language: {
      emptyTable: "There is no data available.",
      infoEmpty: "No entries to show"
    },

    select: {
      style: 'single',
      selector: 'td:first-child'
    },

    // This 'initComplete' callback is crucial for populating the datalist
    initComplete: function () {
      populatePlaceDatalist(timerecordTable);
    }


  });
  // Bind the 'select' event to your function
  timerecordTable.on('select', handleRowSelection);
  setupPage();

  // If you need to reload the data at some point (e.g., after an action):
  // projectTable.ajax.reload();
});
