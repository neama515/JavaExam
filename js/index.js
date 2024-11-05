/// <reference types="../@types/jQuery" />

let linkClicked = false;
let recipes = [];
async function getData(what) {
  $(".loading").removeClass("d-none");
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${what}`
  );
  let apiData = await response.json();
  recipes = apiData.meals;

  displayData();
  $(".loading").addClass("d-none");

  return apiData;
}
async function getDataByLetter(what) {
  $(".loading").removeClass("d-none");

  if (what.trim() === "") {
    recipes = [];
    displayData();
    return;
  }
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${what}`
  );
  let apiData = await response.json();
  recipes = apiData.meals;
  displayData();
  $(".loading").addClass("d-none");

  return apiData;
}
async function getCat() {
  $(".loading").removeClass("d-none");

  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  let apiData = await response.json();

  recipes = apiData.categories;
  $(".loading").addClass("d-none");
  displaycat();

  return apiData;
}
async function getCatDetails(what) {
  $(".loading").removeClass("d-none");

  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${what}`
  );

  let apiData = await response.json();

  recipes = apiData.meals;
  $(".loading").addClass("d-none");

  displayData();

  return apiData;
}

async function getArea(what) {
  $(".loading").removeClass("d-none");

  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  let apiData = await response.json();

  recipes = apiData.meals;

  disArea();
  $(".loading").addClass("d-none");

  return apiData;
}
async function getAreaDetails(what) {
  $(".loading").removeClass("d-none");

  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${what}`
  );

  let apiData = await response.json();

  recipes = apiData.meals;

  displayData();
  $(".loading").addClass("d-none");

  return apiData;
}
async function getIng(what) {
  $(".loading").removeClass("d-none");

  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  let apiData = await response.json();

  recipes = apiData.meals;

  disIng();
  $(".loading").addClass("d-none");

  return apiData;
}
async function getIngDetails(what) {
  $(".loading").removeClass("d-none");

  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${what}`
  );

  let apiData = await response.json();

  recipes = apiData.meals;

  displayData();
  $(".loading").addClass("d-none");

  return apiData;
}
async function getMealDetails(what) {
  $(".loading").removeClass("d-none");

  var response = await fetch(
    `https://themealdb.com/api/json/v1/1/search.php?s=${what}`
  );

  let apiData = await response.json();

  recipes = apiData.meals;
  console.log(recipes);

  $(".loading").addClass("d-none");

  displayMealDetails(recipes);
  return apiData;
}
getMealDetails();
if (!linkClicked) {
  getData("");
}

// ;
$(".mark1").on("click", function () {
  $(".sidebar").css("left", "0px");
  $(this).addClass("d-none");
  $(".mark2").removeClass("d-none");
  // $(".bar ul li").css("top","0px")
  $(".bar ul li").animate({ top: "0px" }, 900);
});

$(".mark2").on("click", function () {
  $(".sidebar").css("left", "-255px");
  $(this).addClass("d-none");
  $(".mark1").removeClass("d-none");
  $(".bar ul li").animate({ top: "300px" }, 500);
});

async function displayData() {
  let cartona = ``;
  for (i = 0; i < recipes.length; i++) {
    cartona += `<div class="px-2 col-sm-3 my-2">
     <div class="card ">
                    <img src="${recipes[i].strMealThumb}" alt="">
                    <div class="layer card d-flex justify-content-center align-items-start p-2">
                        <p >${recipes[i].strMeal}</p>
                    </div>
                </div>
                </div>`;
  }

  $(".row1")[0].innerHTML = cartona;
  $(".row2")[0].innerHTML = cartona;
  $(".row4")[0].innerHTML = cartona;
  $(".row6")[0].innerHTML = cartona;
  $(".row8")[0].innerHTML = cartona;
}
async function displaycat() {
  let cartona = ``;
  for (i = 0; i < recipes.length; i++) {
    cartona += `<div class="px-2 col-sm-3 my-2">
     <div class="card bg-black">
                    <img src="${recipes[i].strCategoryThumb}" alt="">
                    <div class="layer card d-flex justify-content-center align-items-center p-2">
                        <p class="p1">${recipes[i].strCategory}</p>
                        <p class="p2">${recipes[i].strCategoryDescription}</p>
                    </div>
                </div>
                </div>`;
  }

  $(".row3")[0].innerHTML = cartona;
}
function disArea() {
  let cartona = ``;
  for (i = 0; i < recipes.length; i++) {
    cartona += `<div class="px-2 col-sm-3 my-2">
     <div class="card bg-black">
                    <i class="fa-solid fa-house-laptop fa-4x text-center"></i>
                        <h3 class="text-center" >${recipes[i].strArea}</h3>
                </div>
                </div>`;
  }
  $(".row5")[0].innerHTML = cartona;
}
function disIng() {
  let cartona = ``;
  for (i = 0; i < recipes.length; i++) {
    cartona += `<div class="px-2 col-sm-3 my-2">
     <div class="card bg-black">
                    <i class="fa-solid fa-drumstick-bite fa-4x text-center text-white"></i>;
                    <h3 class="text-center text-white" >${recipes[i].strIngredient}</h3>
                     <p class="pIng ">${recipes[i].strDescription}</p>

                </div>
                </div>`;
  }
  $(".row7")[0].innerHTML = cartona;
}

function displayMealDetails(recipes) {
  let ingredientsHTML = "";
  console.log(recipes[0]);
  for (let i = 1; i <= 20; i++) {
    // ingredientsHTML += `<span class="ingredient-badge"></span> `;
    let ingredient = recipes[0][`strIngredient${i}`];
    let measure = recipes[0][`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredientsHTML += `<span class="ingredient-badge">${measure} ${ingredient}</span> `;
    }
  }
  let tags = recipes[0].strTags;
  let arr;
  let tagsCar = ``;

  if (tags != null) {
    arr = tags.split(",");
    for (i = 0; i < arr.length; i++) {
      if (arr[i] != null) {
        tagsCar += `<span>${arr[i]}</span>`;
      }
    }
  }

  let cartona = `
    <div class="col-sm-4 ">
        <img src="${recipes[0].strMealThumb}" class="w-100" alt="">
        <h4>${recipes[0].strMeal}</h4>
    </div>
    <div class="col-sm-6">
        <h4>Instructions</h4>
        <p>${recipes[0].strInstructions}</p>
        <div class="p1 my-2">Area: ${recipes[0].strArea}</div>
        <div class="p22 my-2">Category: ${recipes[0].strCategory}</div>
        <div class="p33 my-2">Recipes:<br>${ingredientsHTML}</div>
        <div class="p4 my-2">Tags:${tagsCar}</div>
        <button type="button" class="btn .btn1 btn-success text-center"><a href="https://www.allrecipes.com/" target="_blank">Source</a></button>
        <button type="button" class="btn .btn2 btn-danger text-center"><a href="https://www.youtube.com/watch?v=-TFf-Zu-xQU" target="_blank">Youtube</a></button>
    </div>`;

  $(".row9")[0].innerHTML = cartona;
}

$(".input1").on("keyup", async function () {
  $(".row2").removeClass("d-none");

  let mealName = $(this).val();
  if (mealName.trim() === "") {
    getData("");
  } else {
    getData(mealName);
  }
});
$(".input2").on("keyup", async function () {
  $(".row2").removeClass("d-none");

  let mealNameLetter = $(this).val();
  if (mealNameLetter.trim() === "") {
    getDataByLetter("a");
  } else {
    getDataByLetter(mealNameLetter);
  }
});

$(".categories").on("click", " .card", function () {
  let text = $(this).find(".p1").text();
  $(".row3").addClass("d-none");
  $(".row4").removeClass("d-none");
  getCatDetails(text);
});
$(".area").on("click", " .card", function () {
  let text = $(this).find("h3").text();
  $(".row5").addClass("d-none");
  $(".row6").removeClass("d-none");
  getAreaDetails(text);
});
$(".ing").on("click", " .card", function () {
  let text1 = $(this).find("h3").text();
  $(".row7").addClass("d-none");
  $(".row8").removeClass("d-none");
  getIngDetails(text1);
});

function showSection(sectionClass) {
  $(".sidebar").css("left", "-255px");
  $(".mark2").addClass("d-none");
  $(".mark1").removeClass("d-none");
  $(".bar ul li").animate({ top: "300px" }, 500);
  $(".cards, .search, .categories, .area, .ing, .contact, .det").addClass(
    "d-none"
  );
  $(sectionClass).removeClass("d-none");
}

$("#search").on("click", function (e) {
  $(".row2").addClass("d-none");
  e.preventDefault();
  showSection(".search");
  getData();
  getDataByLetter();
});

$("#categories").on("click", function (e) {
  e.preventDefault();
  showSection(".categories");
  $(".row3").removeClass("d-none");
  $(".row4").addClass("d-none");

  getCat();
  getCatDetails();
});

$("#area").on("click", function (e) {
  e.preventDefault();
  showSection(".area");
  $(".row5").removeClass("d-none");
  $(".row6").addClass("d-none");
  getArea();
  getAreaDetails();
});

$("#ingredients").on("click", function (e) {
  e.preventDefault();
  showSection(".ing");
  $(".row7").removeClass("d-none");
  $(".row8").addClass("d-none");
  getIng();
  getIngDetails();
});
$("#contact").on("click", function (e) {
  e.preventDefault();
  showSection(".contact");
});
$("body").on("click", ".layer", function (e) {
  e.preventDefault();
  showSection(".det");
  let x = $(this).find("p").text();
  getMealDetails(x);
});
let emailRegex = /^\w{5,15}@(gmail|yahoo)\.com$/i;
let phoneRegex = /^(011|012|015|010)?[0-9]{8}$/i;
let ageRegex = /^(1?[0-9]{1,2}|200)$/i;

let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let age = document.getElementById("age");
let pass = document.getElementById("pass");
let repass = document.getElementById("repass");
let namee = document.getElementById("name");
let val;
let password;
$(".email").on("keyup", function () {
  if (emailRegex.test(email.value) == 0) {
    $(".VE").removeClass("d-none");
  } else {
    $(".VE").addClass("d-none");
  }
  if (val !== "") {
    if (
      repass.value == password &&
      passRegex.test(pass.value) == 1 &&
      ageRegex.test(age.value) == 1 &&
      phoneRegex.test(phone.value) == 1 &&
      emailRegex.test(email.value) == 1
    ) {
      $("#sub").removeAttr("disabled");
    } else {
      $("#sub").Attr("disabled");
    }
  }
});
$("#phone").on("keyup", function () {
  if (phoneRegex.test(phone.value) == 0) {
    $(".VPH").removeClass("d-none");
  } else {
    $(".VPH").addClass("d-none");
  }
  if (val !== "") {
    if (
      repass.value == password &&
      passRegex.test(pass.value) == 1 &&
      ageRegex.test(age.value) == 1 &&
      phoneRegex.test(phone.value) == 1 &&
      emailRegex.test(email.value) == 1
    ) {
      $("#sub").removeAttr("disabled");
    } else {
      $("#sub").Attr("disabled");
    }
  }
});
$("#age").on("keyup", function () {
  if (ageRegex.test(age.value) == 0) {
    $(".VA").removeClass("d-none");
  } else {
    $(".VA").addClass("d-none");
  }
   if (val !== "") {
     if (
       repass.value == password &&
       passRegex.test(pass.value) == 1 &&
       ageRegex.test(age.value) == 1 &&
       phoneRegex.test(phone.value) == 1 &&
       emailRegex.test(email.value) == 1
     ) {
       $("#sub").removeAttr("disabled");
     } else {
       $("#sub").Attr("disabled");
     }
   }
});
$("#pass").on("keyup", function () {
  if (passRegex.test(pass.value) == 0) {
    $(".VP").removeClass("d-none");
  } else {
    $(".VP").addClass("d-none");
    password = pass.value;
  }
   if (val !== "") {
     if (
       repass.value == password &&
       passRegex.test(pass.value) == 1 &&
       ageRegex.test(age.value) == 1 &&
       phoneRegex.test(phone.value) == 1 &&
       emailRegex.test(email.value) == 1
     ) {
       $("#sub").removeAttr("disabled");
     } else {
       $("#sub").Attr("disabled");
     }
   }
});
$("#repass").on("keyup", function () {
  if (repass.value != password) {
    $(".VRP").removeClass("d-none");
  } else {
    $(".VRP").addClass("d-none");
  }
 if (val !== "") {
   if (
     repass.value == password &&
     passRegex.test(pass.value) == 1 &&
     ageRegex.test(age.value) == 1 &&
     phoneRegex.test(phone.value) == 1 &&
     emailRegex.test(email.value) == 1
   ) {
     $("#sub").removeAttr("disabled");
   } else {
     $("#sub").Attr("disabled");
   }
 }
});
$("#name").on("keyup", function () {
  val = this.value.trim();
  if (val !== "") {
    if (
      repass.value == password &&
      passRegex.test(pass.value) == 1 &&
      ageRegex.test(age.value) == 1 &&
      phoneRegex.test(phone.value) == 1 &&
      emailRegex.test(email.value) == 1
    ) {
      $("#sub").removeAttr("disabled");
    } else {
      $("#sub").Attr("disabled");
    }
  }
});
