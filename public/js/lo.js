var urlParams = new URLSearchParams(window.location.search);

$(document).ready(function () {
  $("#search-lo").val(urlParams.get("search") ? urlParams.get("search") : "");
  $("#search-lo-btn").click(function () {
    window.location.href = `/lo?search=${$("#search-lo").val()}`;
  });

  $("#update").click(async function () {
    if ($("#value").val() == "" || $("#level").val() == "") {
      alert("Leaning Object or Level is empty!");
      return;
    }
    const lo = $("#value").val().slice(0, $("#value").val().indexOf(":"));
    const level = $("#level").val();
    const result = await $.get(`/lo/create?lo=${lo}&level=${level}`);
    await reloadTable();
    onRowClick();
    onDeleteClick();
  });
  onRowClick();

  onDeleteClick();
});
function onDeleteClick() {
  $(".delete").each(function () {
    $(this).click(async function () {
      const id = $(this).attr("id").slice(0, $(this).attr("id").indexOf("-"));
      const result = await $.get(`/lo/delete?lo=${id}`);
      await reloadTable();
      onRowClick()
      onDeleteClick()
    });
  });
}

function onRowClick() {
  $(".lo").each(function () {
    $(this).click(function () {
      const id = $(this).attr("id").slice(0, $(this).attr("id").indexOf("-"));
      $("#value").val(id + ":" + $(this).children(`#${id}-value`).text());

      if ($(this).attr("id").indexOf("-has") > 0) {
        $("#level").val($(this).children(`#${id}-level`).text());
      } else {
        $("#level").val("1");
      }
    });
  });
}

async function reloadTable() {
  const loHas = await $.get(`/lo/has`);
  $("#has-body").empty();
  loHas.forEach((element) => {
    $("#has-body").append(`
        <tr class="lo" id="${element.id}-has">
          <th scope="row">${element.id}</th>
          <th id="${element.id}-value">${element.value}</th>
          <th id="${element.id}-level">${element.level}</th>
          <th>
            <div id="${element.id}-delete" class="btn btn-danger delete">Delete</div>
          </th>
        </tr>
      `);
  });
}
