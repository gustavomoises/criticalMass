import "./styles.css";
import menu from "./menu";

const menuItems = menu.items;

console.log(menuItems);
//##4. BONUS: Filtering
//Create checkbox to toggle spicy options. When the checkbox is checked, the spicy options should be visible. It should be checked by default
document.getElementById("menu").innerHTML =
  "<div id='spicyOption'><img  id='spicyImg' src='../assets/spicy.svg' width='30px' alt='Pepper Image' /><label for='myCheck'> Spicy Options</label> <input type='checkbox' id='spicyCheckBox' onClick='spicyFunction()' checked width='30px'></div>";
//## 1. Sorting
//Sort the items in each category by their `menuOrder`
menuItems.sort((a, b) =>
  a.type < b.type
    ? 1
    : a.type === b.type
    ? a.menuOrder > b.menuOrder
      ? 1
      : -1
    : -1
);
// In `index.js`, loop over `menuItems` and categorize them into sections based on each items assigned `type`
menuItems.forEach(createMenu);

//## 2. Rendering
function createMenu(item) {
  //
  if (document.getElementById(item.type) == null) {
    let x = document.createElement("SECTION");
    x.setAttribute("id", item.type);
    //- Render the sorted results into the appropriate container with `index.html`
    document.getElementById("menu").appendChild(x);

    let heading = document.createElement("H1");
    let txt1 = document.createTextNode(
      item.type.charAt(0).toUpperCase() + item.type.slice(1)
    );
    heading.appendChild(txt1);
    document.getElementById(item.type).appendChild(heading);
  }
  let menuItemDiv = document.createElement("DIV");
  //- Render the "spicy" icon next to any menu items where `spicy` is `true`
  if (item.spicy) menuItemDiv.setAttribute("class", "disclaimer spicy");

  menuItemDiv.setAttribute("id", item.type + item.menuOrder);
  // - Format any prices. For example, 8.5 becomes \$8.50
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  let txt2 = document.createTextNode(
    item.name + " " + formatter.format(item.price)
  );
  menuItemDiv.appendChild(txt2);
  let menuItemDetails = document.createElement("UL");
  menuItemDetails.setAttribute("class", "menuItemName");
  let menuItemDescription = document.createElement("li");
  let description = document.createTextNode(item.description);
  menuItemDescription.appendChild(description);
  menuItemDetails.appendChild(menuItemDescription);
  menuItemDiv.appendChild(menuItemDetails);
  document.getElementById(item.type).appendChild(menuItemDiv);
}
