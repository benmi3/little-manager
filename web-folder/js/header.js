// function createHeader() {
//   const headerDiv = document.getElementById("headerDiv");
//   headerDiv.innerHTML = `
//       <a href="/" class="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
//         <svg class="bi pe-none me-2" width="30" height="24" aria-hidden="true">
//           <use xlink:href="#bootstrap"></use>
//         </svg> <span class="fs-5 fw-semibold">Little-Manager</span> </a>
//       <ul class="list-unstyled ps-0">
//         <li class="mb-1"> <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
//             data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
//             Project
//           </button>
//           <div class="collapse" id="home-collapse" style="">
//             <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//               <li><a href="project.html"
//                   class="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a></li>
//               <li><a href="task.html" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Tasks</a>
//               </li>
//               <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">New</a></li>
//               <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Stats</a></li>
//             </ul>
//           </div>
//         </li>
//         <li class="mb-1"> <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
//             data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
//             Timerecord
//           </button>
//           <div class="collapse" id="dashboard-collapse">
//             <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//               <li><a href="timerecord.html"
//                   class="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a></li>
//               <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Places</a></li>
//               <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Stats</a></li>
//             </ul>
//           </div>
//         </li>
//         <li class="mb-1"> <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
//             data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
//             Group
//           </button>
//           <div class="collapse" id="orders-collapse" style="">
//             <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//               <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a></li>
//               <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">New</a></li>
//               <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Stats</a></li>
//             </ul>
//           </div>
//         </li>
//         <li class="border-top my-3"></li>
//         <li class="mb-1"> <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
//             data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
//             Account
//           </button>
//           <div class="collapse" id="account-collapse">
//             <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//               <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</a></li>
//               <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a></li>
//               <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Sign out</a></li>
//             </ul>
//           </div>
//         </li>
//       </ul>
//   `
//   return;
// }


/**
 * Creates a navigation link (<a> element).
 * @param {string} href The URL for the link.
 * @param {string} text The display text for the link.
 * @param {string} [className='link-body-emphasis d-inline-flex text-decoration-none rounded'] Optional CSS classes.
 * @returns {HTMLAnchorElement} The created anchor element.
 */
function createNavLink(href, text, className = 'link-body-emphasis d-inline-flex text-decoration-none rounded') {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = text;
  link.className = className;
  return link;
}

/**
 * Creates a collapsible menu item with a toggle button and a list of links.
 * @param {string} buttonText The text for the toggle button.
 * @param {string} targetId The ID for the collapsible div.
 * @param {Array<Object>} links An array of link objects, e.g., [{ href: 'project.html', text: 'Overview' }]
 * @returns {HTMLLIElement} The created list item element.
 */
function createCollapsibleMenuItem(buttonText, targetId, links) {
  const li = document.createElement('li');
  li.className = 'mb-1';

  const button = document.createElement('button');
  button.className = 'btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed';
  button.setAttribute('data-bs-toggle', 'collapse');
  button.setAttribute('data-bs-target', `#${targetId}`);
  button.setAttribute('aria-expanded', 'false');
  button.textContent = buttonText;
  li.appendChild(button);

  const collapseDiv = document.createElement('div');
  collapseDiv.className = 'collapse';
  collapseDiv.id = targetId;

  const ul = document.createElement('ul');
  ul.className = 'btn-toggle-nav list-unstyled fw-normal pb-1 small';

  links.forEach(linkData => {
    const liItem = document.createElement('li');
    const link = createNavLink(linkData.href, linkData.text);
    liItem.appendChild(link);
    ul.appendChild(liItem);
  });

  collapseDiv.appendChild(ul);
  li.appendChild(collapseDiv);

  return li;
}

/**
 * Creates and appends the header content to the specified headerDiv.
 */
function createHeader() {
  const headerDiv = document.getElementById("headerDiv");
  if (!headerDiv) {
    console.error('Header div not found. Please ensure an element with id="headerDiv" exists.');
    return;
  }

  // Clear existing content in case it's called multiple times
  headerDiv.innerHTML = '';

  // Create the main brand link
  const brandLink = document.createElement('a');
  brandLink.href = '/';
  brandLink.className = 'd-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.className = 'bi pe-none me-2';
  svg.setAttribute('width', '30');
  svg.setAttribute('height', '24');
  svg.setAttribute('aria-hidden', 'true');

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('xlink:href', '#bootstrap');
  svg.appendChild(use);

  const span = document.createElement('span');
  span.className = 'fs-5 fw-semibold';
  span.textContent = 'Little-Manager';

  brandLink.appendChild(svg);
  brandLink.appendChild(span);
  headerDiv.appendChild(brandLink);

  // Create the main unordered list for navigation
  const mainUl = document.createElement('ul');
  mainUl.className = 'list-unstyled ps-0';

  // Project menu item
  const projectLinks = [
    { href: 'project.html', text: 'Overview' },
    { href: 'task.html', text: 'Tasks' },
    { href: '#', text: 'New' },
    { href: '#', text: 'Stats' }
  ];
  mainUl.appendChild(createCollapsibleMenuItem('Project', 'home-collapse', projectLinks));

  // Timerecord menu item
  const timerecordLinks = [
    { href: 'timerecord.html', text: 'Overview' },
    { href: '#', text: 'Places' },
    { href: '#', text: 'Stats' }
  ];
  mainUl.appendChild(createCollapsibleMenuItem('Timerecord', 'dashboard-collapse', timerecordLinks));

  // Group menu item
  const groupLinks = [
    { href: '#', text: 'Overview' },
    { href: '#', text: 'New' },
    { href: '#', text: 'Stats' }
  ];
  mainUl.appendChild(createCollapsibleMenuItem('Group', 'orders-collapse', groupLinks));

  // Divider
  const dividerLi = document.createElement('li');
  dividerLi.className = 'border-top my-3';
  mainUl.appendChild(dividerLi);

  // Account menu item
  const accountLinks = [
    { href: '#', text: 'Profile' },
    { href: '#', text: 'Settings' },
    { href: '#', text: 'Sign out' }
  ];
  mainUl.appendChild(createCollapsibleMenuItem('Account', 'account-collapse', accountLinks));

  headerDiv.appendChild(mainUl);
}



$(document).ready(function () {
  createHeader();
})
