export default function removeDefaultBtn(element) {
  if(element.length === undefined) {
    removebtn(element);
  } else {
    element.forEach(btn => {
      removebtn(btn);
    });
  }
}

function removebtn(btn) {
  const brandLink = btn.querySelector('.button');
    if (brandLink) {
      brandLink.className = '';
      brandLink.closest('.button-container').className = '';
    }
}