document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll(".menu a");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            menu.classList.remove("active");
        });
    });
});



const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.card');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentPosition = 0; // Posição atual do carrossel

nextButton.addEventListener('click', () => {
  // Verifica se está no último card
  if (currentPosition === cards.length - 1) {
    currentPosition = 0; // Volta para o primeiro card
  } else {
    currentPosition++; // Avança para o próximo card
  }
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  // Verifica se está no primeiro card
  if (currentPosition === 0) {
    currentPosition = cards.length - 1; // Volta para o último card
  } else {
    currentPosition--; // Retrocede para o card anterior
  }
  updateCarousel();
});

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentPosition * 100}%)`;
}