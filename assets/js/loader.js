// loader remove after 1500ms
setTimeout(() => {
  const loader = document.querySelector(".loader");
  loader.className += " hidden";
}, 1500);
