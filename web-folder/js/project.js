// const projectTable = new DataTable('#projectTable');
//
// function setupDataTable() {
//   projectTable
// }


$(document).ready(function () {
  const projectTable = new DataTable('#projectTable', {
    ajax: {
      url: 'api/rpc',
      type: 'POST',
      contentType: 'application/json',
      data: function (_d) {
        // This function should return the JSON string to be sent as the request body.
        // 'd' is an object DataTables sends for server-side processing (you can ignore it here if not needed).
        // Customize the payload according to what your 'api/rpc' endpoint expects.
        const requestPayload = {
          "jsonrpc": "2.0",
          "id": 1,
          "method": "list_projects",
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
          return [jsonResponse.result];
        }

        console.error("Unexpected API response format:", jsonResponse);
        return [];
      },
      error: function (xhr, errorType, thrownError) {
        if (thrownError == "Forbidden") window.location.href = "login.html"
        // Handle AJAX errors (e.g., network issue, server error)
        console.error("Error fetching data for projectTable:", errorType, thrownError);
        console.error("Response Text:", xhr.responseText);
        $('#projectTable tbody td').text('Error loading data.');
      }
    },
    searching: false, // No search box
    ordering: false,  // No column sorting
    paging: false,    // No pagination
    info: false,      // No "Showing x of y entries"

    // 'columns' option is not needed here because we are not asking DataTables
    // to render columns in the traditional way.

    drawCallback: function (settings) {
      const api = this.api();
      const data = api.rows().data();

      if (data && data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          const projectData = data[index];

          // Manually update the content of your <td> elements using the data-key attributes
          $('#projectTable tbody td[data-key="projectName"]').text(projectData.projectName ?? 'N/A');
          $('#projectTable tbody td[data-key="projectOwner"]').text(projectData.projectOwner ?? 'N/A');
          $('#projectTable tbody td[data-key="projectCreation"]').text(projectData.projectCreation ?? 'N/A');
          $('#projectTable tbody td[data-key="projectUpdated"]').text(projectData.projectUpdated ?? 'N/A');
        }
      } else {
        if (!settings.jqXHR || settings.jqXHR.status === 200) { // Check if not an ajax error
          $('#projectTable tbody td').text('No data available.');
        }
      }
    },

  });

  // If you need to reload the data at some point (e.g., after an action):
  // projectTable.ajax.reload();
});
