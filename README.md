# Accessible Responsive Menu System

ADA Accessible Responsive menus that are voice over and keyboard compatible. For now follow menu Markup with ID and classes and more documentation will come later.

## Example

https://zaneray.github.io/ada-responsive-menu/

## Getting Started

This project compiles SASS files as well as fires up a node server that supports live reloading. Run the following commands to install and fire up a live server.

`npm install`

`npm run dev`

## Intro

This creates an accessible menu system that supports keyboard commands as well as voiceover technology and works at mobile and desktop. The navigation supports 2 levels of subnavigation. At Mobile all the subnavigation collapses into an accordion style navigation at desktop the deepest level is visible.

As much as possible the javascript and CSS is bound to the aria attributes that describe elements that expend and collapse.

## Required Elements and Attributes

Currently there are elements that are required by the CSS and JS to make this menu work.

### Mobile Menu Elements

#### Menu Toggle

```
<button class="menu-toggle" id="menu-toggle" aria-haspopup="true" aria-label="Open Menu"></button>
```

This is the mobile menu toggle, or "Hamburger" style menu. the id is bound to the javascript, `aria-haspopup` indicates that it has a submenu and `aria-label` is what is read aloud since there is not content in the button. This also triggers some classes on the body (`menu-show` & `menu-slide-in`) to show the submenu and control the overflow of the page while the menu is open.

#### Menu Overlay

```
<div id="menu-overlay" class="menu-overlay">
        <button class="primary-menu-close" id="menu-close" aria-label="Close Menu" title="Close Menu"></button>
      </div>
```

This lives in the DOM below the `nav` element. This creates an overlay that can be clicked or touched at mobile as well as closes the desktop navigation. The `button` element inside is focusable by screen readers.

#### Controlling Focus!!

This part is crucial to focusing a screen reader on the menu and nothing else. Any elements on the page that are outside of the menu currently need to hava a class of `sr-menu-open-hide` which javascript then gives `aria-hidden="false"` when the menu is open. Ideally your markup is simple enough that the menu is one element and the rest of the page content is another element that has this class.

### Navigation Elements

#### Primary Navigation

```
<nav
  id="primary-menu"
  class="primary-menu"
  aria-label="Primary Navigation">
...
</nav>
```

The `nav#primary-menu` element is bound to by the javascript for triggering focus when the menu opens and other supporting functions.

#### List Items with Subnavigation

The `li.has-submenu` class is used by javascript to identify elements that have submenus.

#### Buttons and Anchors

```
<a
  href="#shop"
  class="menu-button"
  role="button"
  aria-expanded="false"
  aria-haspopup="true">
  Shop
</a>
```

Top level links are `anchor` elements that would theoretically be indexed by search engines but we give them a `role=button` to indicate to the screen reader that this is a button that triggers the submenu. These links are not followed by users. When clicked or triggered, javascript changes `aria-expanded="true"`

Alternately if an `anchor` element is not needed a `button` element may also be used.

#### Submenus

```
<ul
  class="submenu-list"
  aria-expanded="false"
  aria-hidden="true"
  aria-label="Shop Subnavigation">
...
</ul>
```

Submenu are expanded/collapsed based the sibling button or anchor being clicked/selected. Javscript updates the `aria-expanded` and `aria-hidden` attributes. The `aria-label` notifies the screen reader the topic of the subnavigation.

#### Sub-Submenus

This was a complicated aspect of making a menu that functioned as an accordion at mobile but had the sub-submenus visible to desktop users, while still making it accessible to screen readers. It repurposes much of the javascript from submenus with a couple minor changes.

```
 <li class="menu-list-item submenu-list-item has-submenu">
    <button
      class="submenu-button"
      aria-expanded="false"
      aria-haspopup="true">Shirts</button>
    <ul
      class="sub-submenu-list"
      aria-expanded="false"
      aria-label="Shirts Subnavigation">
      <li class="sub-submenu-list-item">
        <a href="#shirts" class="menu-link submenu-link submenu-link-heading">Shop All Shirts</a>
      </li>
      <li class="sub-submenu-list-item">
        <a href="#buttondowns" class="menu-link submenu-link">Button Downs</a>
      </li>
      ...
    </ul>
  </li>
```

A `button` element is always used here to trigger expanding and collapsing of the sub-submenu because to mobile users this will only function as a toggle. At desktop dimensions we hide the `button` toggle and expand the subnavigation with a like to view the whole parent category as well and a style that distinquishes it. `.submenu-link-heading` and "Shop all Shirts"

## Known Issues

- At Desktop the screen reader reads the `sub-submenu-list` as collapsed but can still navigate through the subnavigation.
