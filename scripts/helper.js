export default function removeDefaultBtn(element) {
    const brandLink = element.querySelector('.button');
    if (brandLink) {
      brandLink.className = '';
      brandLink.closest('.button-container').className = '';
    }
}