var options = [
  "carrot",
  "broccoli",
  "asparagus",
  "cauliflower",
  "corn",
  "cucumber",
  "green pepper",
  "lettuce",
  "mushrooms",
  "onion",
  "potato",
  "pumpkin",
  "red pepper",
  "tomato",
  "beetroot",
  "brussel sprouts",
  "peas",
  "zucchini",
  "radish",
  "sweet potato",
  "artichoke",
  "leek",
  "cabbage",
  "celery",
  "chili",
  "garlic",
  "basil",
  "coriander",
  "parsley",
  "dill",
  "rosemary",
  "oregano",
  "cinnamon",
  "saffron",
  "green bean",
  "bean",
  "chickpea",
  "lentil",
  "apple",
  "apricot",
  "avocado",
  "banana",
  "blackberry",
  "blackcurrant",
  "blueberry",
  "boysenberry",
  "cherry",
  "coconut",
  "fig",
  "grape",
  "grapefruit",
  "kiwifruit",
  "lemon",
  "lime",
  "lychee",
  "mandarin",
  "mango",
  "melon",
  "nectarine",
  "orange",
  "papaya",
  "passion fruit",
  "peach",
  "pear",
  "pineapple",
  "plum",
  "pomegranate",
  "quince",
  "raspberry",
  "strawberry",
  "watermelon",
  "salad",
  "pizza",
  "pasta",
  "popcorn",
  "lobster",
  "steak",
  "bbq",
  "pudding",
  "hamburger",
  "pie",
  "cake",
  "sausage",
  "tacos",
  "kebab",
  "poutine",
  "seafood",
  "chips",
  "fries",
  "masala",
  "paella",
  "som tam",
  "chicken",
  "toast",
  "marzipan",
  "tofu",
  "ketchup",
  "hummus",
  "chili",
  "maple syrup",
  "parma ham",
  "fajitas",
  "champ",
  "lasagna",
  "poke",
  "chocolate",
  "croissant",
  "arepas",
  "bunny chow",
  "pierogi",
  "donuts",
  "rendang",
  "sushi",
  "ice cream",
  "duck",
  "curry",
  "beef",
  "goat",
  "lamb",
  "turkey",
  "pork",
  "fish",
  "crab",
  "bacon",
  "ham",
  "pepperoni",
  "salami",
  "ribs",
];

var recipeItems = [];
var navbarItem = document.querySelector(".navbar-items");
var recipeContainer = document.querySelector("#recipe-cont");
var item = "pizza";
var loading = document.getElementById("loading");

// Function to add navbar items
function menuItems() {
  for (var i = 0; i < options.length; i++) {
    console.log("Creating items");
    var li = document.createElement("li");
    li.className = "py-3 ps-3 border-bottom fs-3";
    li.id = options[i];

    var span = document.createElement("span");

    var para = document.createElement("p");
    para.innerText = options[i];

    li.append(span, para);
    navbarItem.append(li);

    // Adding event listener to get item name when clicked
    li.addEventListener("click", function () {
      item = this.querySelector("p").innerText;
      console.log("Selected item:", item);
      getRecipeItems().then(function () {
        addItems(recipeItems); // Add items based on the selected category
      });
    });
  }
}
menuItems();

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
// Function to fetch recipe items
function getRecipeItems() {
  //handle loading state
  loading.classList.add("d-block");

  return fetch("https://forkify-api.herokuapp.com/api/search?q=" + item)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("This is the recipe items");
      console.log(data);
      recipeItems = data.recipes;
      loading.classList.replace("d-block", "d-none");
      return recipeItems;
    })
    .catch(function (error) {
      console.error("Error fetching recipes:", error);
    });
}

// Function to add items to the page
function addItems(recipes) {
  console.log("Entered the add items function");

  if (recipes.length === 0) {
    console.log("No recipes available.");
    recipeContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipeContainer.innerHTML = "";

  for (var i = 0; i < recipes.length; i++) {
    console.log("Entered the for loop");
    var recipeColumn = document.createElement("div");
    recipeColumn.className = "col-md-4";
    var recipeBox = document.createElement("div");
    recipeBox.className =
      "recipe-box make-pointer bg-light shadow-lg border rounded";

    var recipeImage = document.createElement("div");
    recipeImage.className = "recipe-img";
    var image = document.createElement("img");
    image.className = "w-100";
    image.src = recipes[i].image_url;

    recipeImage.append(image);

    var recipeContent = document.createElement("div");
    recipeContent.className = "content px-2";
    var recipeTitle = document.createElement("h3");
    recipeTitle.className = "my-3";
    recipeTitle.innerText = recipes[i].title;

    var recipePub = document.createElement("p");
    recipePub.innerText = recipes[i].publisher;
    recipeContent.append(recipeTitle, recipePub);

    recipeBox.append(recipeImage, recipeContent);
    recipeColumn.append(recipeBox);
    recipeContainer.append(recipeColumn);
  }
}

// Function to search recipes based on input
function searchRecipes() {
  var searchTerm = document.getElementById("search-bar").value.toLowerCase();
  //filter function used to return items that match the search value
  var filteredRecipes = recipeItems.filter(function (recipe) {
    return recipe.title.toLowerCase().includes(searchTerm);
  });
  addItems(filteredRecipes);
}

// Add event listener to search button
document
  .getElementById("search-button")
  .addEventListener("click", searchRecipes);

// show pop up menu
document.getElementById("control-menu").addEventListener("click", function () {
  const menu = document.getElementById("menu");
  if (menu.style.left === "0px") {
    menu.style.animation = "slideOut 0.3s forwards";
    setTimeout(() => {
      menu.style.left = "-100%";
    }, 300);
  } else {
    menu.style.left = "0";
    menu.style.animation = "slideIn 0.3s forwards";
  }
});

// Initial load
getRecipeItems().then(function () {
  addItems(recipeItems);
});
