document.body.onload = function () {

  // DOM elements used in menu
  let primaryMenu = document.getElementById('primary-menu');
  let htmlBody = document.querySelector('body');
  let srMenuOpenHide = document.querySelectorAll('.sr-menu-open-hide');

  // toggles menu visibility
  function toggleMenu(close) {

    if (htmlBody.classList.contains('menu-show') || close) {
      // Hide the menu
      // slide it out of view
      htmlBody.classList.remove('menu-slide-in');

      // remove aria-hidden on the elements of the page.
      srMenuOpenHide.forEach((el) => {
        el.setAttribute('aria-hidden', 'false');
      });

      setTimeout(() => {
        // then change display of the menu after it is hidden (300ms)
        htmlBody.classList.remove('menu-show');
        closeAllMenus();
      }, 300);

    } else {

      // display the menu first
      htmlBody.classList.add('menu-show');

      setTimeout(() => {
        // then slide in the menu need a delay because you can't slide and display at the same time
        htmlBody.classList.add('menu-slide-in');

        // set aria-hidden on the page.
        primaryMenu.focus();

        // set aria-hidden on the elements of the page w/o focus.
        srMenuOpenHide.forEach((el) => {
          el.setAttribute('aria-hidden', 'true');
        });
      }, 10);

    }
  }

  // closes an individual menu of selected  element
  function closeMenu(el) {
    el.parentNode.classList.remove('open');
    el.setAttribute('aria-expanded', 'false');
    el.nextElementSibling.setAttribute('aria-hidden', 'true');
  }

  // close all the menus. Gets called when mobile nav closes
  function closeAllMenus() {
    let openMenus = document.querySelectorAll(
        '.has-submenu > [aria-expanded=true][aria-haspopup=true]'
    );
    openMenus.forEach((el) => {
      closeMenu(el);
    });
    htmlBody.classList.remove('submenu-open');
  }

  //close menus on pressing escape
  document.addEventListener('keydown', (event) => {

    if (event.defaultPrevented) {
      return;
    }

    // TODO: Handle arrow keys for tab / shift + tab
    switch (event.key) {

      case 'Escape':
        toggleMenu(true);
        closeAllMenus();
        break;

      default:
        return;

    }

  });

  document.addEventListener('click', (event) => {

    // toggle mobile menu
    if (event.target.closest('#menu-toggle, #menu-overlay, #menu-close')) {
      toggleMenu();
      event.stopPropagation();
      return;
    }

    // open close menu items
    if (event.target.matches('.primary-menu [aria-haspopup]')) {

      const targetElement = event.target;

      if (targetElement.getAttribute('aria-expanded') === 'true') {

        // Close the menu
        closeMenu(targetElement);

        htmlBody.classList.remove('submenu-open');

      } else {

        // close sibling menus, need to traverse up the tree to find them
        let siblingMenus = targetElement.parentElement.parentElement.children;

        for (let i = 0; i < siblingMenus.length; i++) {
          if (siblingMenus[i].classList.contains('open')) {
            closeMenu(siblingMenus[i].children[0]);
          }
        }

        // add a class to the body to indicate menus are open in case we need other things styled
        htmlBody.classList.add('submenu-open');

        // open the menu
        targetElement.parentNode.classList.add('open');
        targetElement.setAttribute('aria-expanded', 'true');
        targetElement.nextElementSibling.setAttribute('aria-hidden', 'false');

      }

      event.preventDefault();
      return;
    }

    // if we have a menu open then we close it
    if (
        document.body.classList.contains("submenu-open") &&
        !event.target.closest(".menu-list-item")
    ) {
      closeAllMenus();
    }

    if (event.target.closest(".submenu-close")) {
      closeAllMenus();
    }

  }, false);

};


