document.addEventListener("DOMContentLoaded", () => {
    let zIndexCounter = 1000;

    function openPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = "block";
            popup.style.zIndex = zIndexCounter++;
        }
    }

    function closePopup(popup) {
        popup.style.display = "none";
    }

    function makePopupDraggable(header) {
        let isDragging = false;
        let offsetX, offsetY;
        const popup = header.parentElement;

        header.addEventListener("mousedown", (event) => {
            isDragging = true;
            offsetX = event.clientX - popup.offsetLeft;
            offsetY = event.clientY - popup.offsetTop;
            popup.style.zIndex = zIndexCounter++; // Traz para frente ao iniciar o arrasto

            document.addEventListener("mousemove", dragPopup);
            document.addEventListener("mouseup", () => {
                isDragging = false;
                document.removeEventListener("mousemove", dragPopup);
            });
        });

        function dragPopup(event) {
            if (isDragging) {
                popup.style.left = `${event.clientX - offsetX}px`;
                popup.style.top = `${event.clientY - offsetY}px`;
            }
        }
    }

    // Eventos para pop-ups
    document.querySelectorAll(".open-popup").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const popupId = button.getAttribute("data-popup");
            openPopup(popupId);
        });
    });

    document.querySelectorAll(".close-popup").forEach(button => {
        button.addEventListener("click", () => {
            const popup = button.closest(".popup");
            if (popup) {
                closePopup(popup);
            }
        });
    });

    document.querySelectorAll(".popup").forEach(popup => {
        popup.addEventListener("mousedown", () => {
            popup.style.zIndex = zIndexCounter++;
        });
    });

    document.querySelectorAll(".popup-header").forEach(header => {
        makePopupDraggable(header);
    });

    // Menu Responsivo
    window.toggleMenu = function() { // Tornando a função global para o onclick funcionar no HTML
        let menu = document.querySelector('.menu');
        menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    }

    // Trocar Cor do Menu
    window.trocarCor = function(event) { // Tornando a função global para o onclick funcionar no HTML
        let menuIconBars = event.currentTarget.querySelectorAll('.cor');

        menuIconBars.forEach(div => {
            if (div.classList.contains('ativa')) {
                div.style.backgroundColor = '';
                div.classList.remove('ativa');
            } else {
                div.style.backgroundColor = '#00ff2a';
                div.classList.add('ativa');
            }
        });
    }

    document.querySelectorAll('.cor').forEach(div => {
        div.parentElement.addEventListener('click', trocarCor);
    });
});

const botaoAlternar = document.getElementById('alternar-estilos');
const folhaEstilos = document.getElementById('folha-estilos');

botaoAlternar.addEventListener('click', () => {
  if (folhaEstilos.href.endsWith('style-dark.css')) {
    folhaEstilos.href = 'style-light.css';
  } else {
    folhaEstilos.href = 'style-dark.css';
  }
});