
$(document).ready(function () {
  const timerecordTable = new DataTable('#timerecordTable', {
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

    columns: [
      {
        data: 'ctime',
        defaultContent: 'N/A',
        render: function (data, type, row) {
          if (type === 'display' && data) {
            return new Date(data).toLocaleDateString();
          }
          return data;
        }
      },
      { data: 'cid', defaultContent: 'N/A' },
      { data: 'place', defaultContent: 'N/A' },
      {
        data: 'start_time',
        defaultContent: 'N/A',
        render: function (data, type, row) {
          if (type === 'display' && data) {
            return new Date(data).toLocaleTimeString();
          }
          return data;
        }
      },
      {
        data: 'stop_time',
        defaultContent: 'N/A',
        render: function (data, type, row) {
          if (type === 'display' && data) {
            return new Date(data).toLocaleTimeString();
          }
          return data;
        }
      }
    ],

    language: {
      emptyTable: "There is no data available.",
      infoEmpty: "No entries to show"
    },


  });

  // If you need to reload the data at some point (e.g., after an action):
  // projectTable.ajax.reload();
});
