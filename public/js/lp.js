var LP = [];
var base_url;
async function getURL() {
  base_url = await $.get(`/lp/url`);
}
$(document).ready(function () {
  getURL();
  updateCostTime();
  $("#info-result").hide();
  $("#detail-course").hide();
  $("#execute").click(async function () {
    await getLP();
  });
});
async function getLP() {
  console.log("start");
  LP = await $.get(`/lp/execute`);
  $("#lp-body").empty();
  let counter = 1;
  LP.forEach((element) => {
    $("#lp-body").append(`
      <tr id="${counter}" class="lp">
        <th>${counter++}</th>
        <th>
          <button id= "${counter}-detail"class="btn btn-success">Detail</button>
        </th>
      </tr>
    `);
  });
  await detailLP(0);
  $(".lp").each(function () {
    $(this).click(async function () {
      const id = parseInt($(this).attr("id"));
      await detailLP(id);
    });
  });
}

async function detailLP(index) {
  let courses = [];
  LP[index].path.forEach((element) => {
    courses = [...courses, ...element];
  });
  const result = await $.post(`/lp/info`, { courses });
  $("#amount-courses").text(result.course);
  $("#amount-redundant").text(result.lor);
  $("#amount-duplicate").text(result.lod);
  $("#amount-cost").text(result.cost);
  $("#amount-time").text(result.time);
  $("#lp-img").attr("src", `${base_url}${LP[index].visualization}`);
  $("#course-container").empty();
  courses.forEach((element) => {
    $("#course-container").append(`
      <div class="btn btn-success text-light course mb-2" >${element}</div>
    `);
  });

  loadDetailCourse();
  $("#info-result").show();
}

function loadDetailCourse() {
  $(".course").each(function () {
    $(this).click(async function () {
      console.log(true);
      const result = await $.get(`/lp/course?id=${$(this).text()}`);
      console.log(result);
      $("#name").text(result.name);
      $("#link").text(result.link);
      $("#link").attr("href", result.link);
      $("#cost-c").text(result.cost);
      $("#time-c").text(result.time);
      $("#rating").text(result.rating || 0);
      $("#enroll").text(result.enroll || 0);
      $("#detail-course").show();
    });
  });
}

function updateCostTime() {
  $("#submit").click(async function () {
    let time = 0;
    let cost = 0;
    if ($("#value").val() == "") {
      return;
    }
    if ($("#time").is(":checked")) {
      time = $("#value").val();
    } else {
      cost = $("#value").val();
    }

    const result = await $.get(`/lp/update?time=${time}&cost=${cost}`);
    if (result.msg == "success") {
      alert("Success!");
    } else {
      alert("Fail!");
    }
  });
}
