
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const headerButton = item.querySelector('.accordion-header-button');

  headerButton.addEventListener('click', () => {
    // Toggle active class on the clicked item
    item.classList.toggle('active');

    // Close other items
    accordionItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
  });
});

