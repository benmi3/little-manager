let timerecordTable = null;

async function doTimeRecord(e) {
  e.preventDefault();

  const startDate = document.getElementById("startDate").value;
  const startTime = document.getElementById("startTime").value;
  const startDateTime = new Date(startDate + " " + startTime)

  const stopDate = document.getElementById("stopDate").value;
  const stopTime = document.getElementById("stopTime").value;
  const stopDateTime = new Date(stopDate + " " + stopTime)

  const place = document.getElementById("place").value;

  const headers = {
    "Content-Type": "application/json",
  };
  const uuid = self.crypto.randomUUID();
  const body = JSON.stringify({
    "jsonrpc": "2.0",
    "id": uuid,
    "method": "create_timerecord",
    "params": {
      "data": {
        "start_time": formatDateToRFC3339(startDateTime),
        "stop_time": formatDateToRFC3339(stopDateTime),
        "place": place
      }
    }
  });
  const res = await fetch("/api/rpc", { headers: headers, method: "POST", body: body })
  const json_res = await res.json()
  if (json_res && json_res["result"]) {
    const newRecord = json_res["result"]["data"]
    if (newRecord) {
      timerecordTable.row.add(newRecord).draw();
    }
  }
}

async function setSTime(start, setTime) {
  const whatTime = start ? "start" : "stop";
  const thisTime = new Date(setTime);
  const x = document.getElementById(`${whatTime}Date`);
  const y = document.getElementById(`${whatTime}Time`);
  x.value = formatDateToYYYYMMDD(thisTime);
  y.value = formatTimeToHHMM(thisTime);
}

// Function to execute when a row is selected
async function handleRowSelection(_e, dt, type, indexes) {
  if (type === 'row') {
    var rowData = dt.rows(indexes).data().toArray();
    setSTime(true, rowData[0]["start_time"])
    setSTime(false, rowData[0]["stop_time"])
  }
}

async function setupPage() {
  const now = new Date(Date.now());
  const prev = new Date(now.getTime());
  prev.setHours(now.getHours() - 1);
  setSTime(true, prev);
  setSTime(false, now);
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


$(document).ready(function () {
  timerecordTable = new DataTable('#timerecordTable', {
    ajax: {
      url: 'api/rpc',
      type: 'POST',
      contentType: 'application/json',
      data: function (_d) {
        const uuid = self.crypto.randomUUID();
        const requestPayload = {
          "jsonrpc": "2.0",
          "id": uuid,
          "method": "list_timerecords",
          "params": {
            "filters": {
            },
            "list_options": {
            }
          }
        };
        return JSON.stringify(requestPayload);
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
    searching: false, // No search box
    ordering: true,  // No column sorting
    paging: false,    // No pagination
    info: false,      // No "Showing x of y entries"

    columnDefs: [
      { targets: 0, checkboxes: { selectRow: true } }
    ],

    columns: [
      {
        data: 'ctime',
        defaultContent: 'N/A',
        render: function (data, type, _row) {
          if (type === 'display' && data) {
            return formatDateTimeYYYYMMDDHHMM(new Date(data));
          }
          return data;
        }
      },
      { data: 'cid', defaultContent: 'N/A' },
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
