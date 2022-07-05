
async function getDetailCareer(career_id) {
  $("#list-lo").empty()
  const result = await $.get(`/career/detail?id=${career_id}`)
  const career = $(`#${career_id}-name`).text();
  $("#current").text(`Career: ${career} (${result.length})`)
  result.forEach(element => {
    switch(element.type) {
      case "NEED_FRAMEWORK":
        $("#list-lo").append(`
          <a class="btn btn-secondary mr-2 mb-2 text-light" href="/lo?search=${element.name}">${element.name}</a>
        `)
        break;
    case "NEED_PLATFORM": 
        $("#list-lo").append(`
          <a class="btn btn-danger mr-2 mb-2 text-light" href="/lo?search=${element.name}">${element.name}</a>
        `)
        break;
    case "NEED_KNOWLEDGE": 
        $("#list-lo").append(`
          <a class="btn btn-success mr-2 mb-2 text-light" href="/lo?search=${element.name}">${element.name}</a>
        `)
        break;
    case "NEED_PROGRAMINGLANGUAGE": 
        $("#list-lo").append(`
          <a class="btn btn-primary mr-2 mb-2 text-light" href="/lo?search=${element.name}">${element.name}</a>
        `)
        break;
    case "NEED_TOOL":
        $("#list-lo").append(`
          <a class="btn btn-warning mr-2 mb-2 text-light" href="/lo?search=${element.name}">${element.name}</a>
        `)
        break;
    };
  });
  $("#detail-container").show()
}

async function updateUserCareer(career_id) {
  const result = await $.get(`/career/update?career=${career_id}`)
  const career = $(`#${career_id}-name`).text();
  $('#current-career').text(career)
}

$(document).ready(function () {
  $('#detail-container').hide()
  $(".career-detail").each(function () {
    $(this).click(function () {
      const id = $(this).attr("id").slice(0,$(this).attr("id").indexOf("-"))
      getDetailCareer(id)
    })
  })
  $(".career-update").each(function() {
    $(this).click(function () {
      const id = $(this).attr("id").slice(0,$(this).attr("id").indexOf("-"))
      updateUserCareer(id)
      getDetailCareer(id)
    })
  })
});