document.body.onload = function() {
  // toggle menu functionality
  var primaryMenu = document.getElementById("primary-menu");
  var htmlBody = document.querySelector("body");
  var srMenuOpenHide = document.querySelectorAll(".sr-menu-open-hide");

  // stop event bubbling on the menu
  primaryMenu.addEventListener("click", function(e) {
    e.stopPropagation();
  });

  // toggles menu visibility
  function toggleMenu(close) {
    if (htmlBody.classList.contains("menu-show") || close) {
      // Hide the menu
      // slide it out of view
      htmlBody.classList.remove("menu-slide-in");

      // remove aria-hidden on the elements of the page.
      srMenuOpenHide.forEach(function(el) {
        el.setAttribute("aria-hidden", "false");
      });

      setTimeout(function() {
        // then change display of the menu after it is hidden (300ms)
        htmlBody.classList.remove("menu-show");
        closeAllMenus();
      }, 300);
    } else {
      // display the menu first
      htmlBody.classList.add("menu-show");

      setTimeout(function() {
        // then slide in the menu need a delay because you can't slide and display at the same time
        htmlBody.classList.add("menu-slide-in");

        // set aria-hidden on the page.
        primaryMenu.focus();

        // set aria-hidden on the elements of the page w/o focus.
        srMenuOpenHide.forEach(function(el) {
          el.setAttribute("aria-hidden", "true");
        });
      }, 10);
    }
  }

  // closes an individual menu of selected  element
  function closeMenu(el) {
    el.parentNode.classList.remove("open");
    el.setAttribute("aria-expanded", "false");
    el.nextElementSibling.setAttribute("aria-expanded", "false");
    el.nextElementSibling.setAttribute("aria-hidden", "true");
  }

  // close all the menus. Gets called when mobile nav closes
  function closeAllMenus() {
    var openMenus = document.querySelectorAll(
      ".has-submenu > [aria-expanded=true][aria-haspopup=true]"
    );
    openMenus.forEach(function(el) {
      closeMenu(el);
    });

    htmlBody.classList.remove("submenu-open");
  }

  // toggles menu visibility
  document.getElementById("menu-toggle").addEventListener("click", function() {
    toggleMenu();
    e.stopPropagation();
  });
  document.getElementById("menu-overlay").addEventListener("click", toggleMenu);

  //close menus on pressing escape
  document.addEventListener("keypress", function(e) {
    e = e || window.event;
    if (e.key === "Escape") {
      toggleMenu(true);
      closeAllMenus();
    }
  });

  // Core Accessible Menu Javascript
  var menuItems = document.querySelectorAll("li.has-submenu");
  Array.prototype.forEach.call(menuItems, function(el, i) {
    el.querySelector(".primary-menu [aria-haspopup]").addEventListener(
      "click",
      function(event) {
        if (this.getAttribute("aria-expanded") === "true") {
          // Close the menu
          closeMenu(this);
          htmlBody.classList.remove("submenu-open");
          // unbind the close all menus
          htmlBody.removeEventListener("click", closeAllMenus);
        } else {
          //close sibling menus, need to traverse up the tree to find them
          var siblingMenus = this.parentElement.parentElement.children;

          // Bind close to the body
          htmlBody.addEventListener("click", closeAllMenus);

          //TODO probably should close submenus as well.
          for (var i = 0; i < siblingMenus.length; i++) {
            if (siblingMenus[i].classList.contains("open")) {
              closeMenu(siblingMenus[i].children[0]);
            }
          }

          // add a class to the body to indicate menus are open in case we need other things styled
          htmlBody.classList.add("submenu-open");

          // open the menu
          this.parentNode.classList.add("open");
          this.setAttribute("aria-expanded", "true");
          this.nextElementSibling.setAttribute("aria-expanded", "true");
          this.nextElementSibling.setAttribute("aria-hidden", "false");
        }
        event.preventDefault();
        return false;
      }
    );
  });
};
