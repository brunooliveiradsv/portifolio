document.addEventListener("DOMContentLoaded", () => {
    // Captura todos os links que abrem pop-ups
    document.querySelectorAll(".open-popup").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const popupId = button.getAttribute("data-popup");
            document.getElementById(popupId).style.display = "block";
        });
    });

    // Captura todos os botões de fechar pop-up
    document.querySelectorAll(".close-popup").forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".popup").style.display = "none";
        });
    });

    // Permite arrastar as janelas pop-up
    document.querySelectorAll(".popup-header").forEach(header => {
        let isDragging = false;
        let offsetX, offsetY;
        let popup = header.parentElement;

        header.addEventListener("mousedown", (event) => {
            isDragging = true;
            offsetX = event.clientX - popup.offsetLeft;
            offsetY = event.clientY - popup.offsetTop;

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
    });

    // Efeito de destaque ao redor do mouse no texto
    const textElement = document.querySelector("#section-right p");
    const textContent = textElement.innerHTML;

    // Limpa o conteúdo original e preserva a formatação
    textElement.innerHTML = "";

    // Divide o conteúdo em spans sem perder os espaços
    const parts = textContent.split(/(<[^>]+>|\s+)/g);
    const fragment = document.createDocumentFragment();

    parts.forEach(part => {
        if (part.match(/<[^>]+>/)) {
            const tag = document.createElement("span");
            tag.innerHTML = part;
            fragment.appendChild(tag);
        } else if (part.match(/\s+/)) {
            const space = document.createTextNode(" ");
            fragment.appendChild(space);
        } else {
            part.split("").forEach(char => {
                const span = document.createElement("span");
                span.textContent = char;
                span.classList.add("text-container");
                fragment.appendChild(span);
            });
        }
    });

    textElement.appendChild(fragment);

    // Efeito de destaque no texto com hover
    const letters = document.querySelectorAll(".text-container");

    document.addEventListener("mousemove", (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        letters.forEach(letter => {
            const rect = letter.getBoundingClientRect();
            const letterX = rect.left + rect.width / 2;
            const letterY = rect.top + rect.height / 2;

            const distance = Math.sqrt((mouseX - letterX) ** 2 + (mouseY - letterY) ** 2);
            const radius = 30;

            if (distance < radius) {
                letter.classList.add("highlight");
            } else {
                letter.classList.remove("highlight");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    let zIndexCounter = 1000; // Define um valor inicial alto para o z-index

    // Captura todos os links que abrem pop-ups
    document.querySelectorAll(".open-popup").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const popupId = button.getAttribute("data-popup");
            const popup = document.getElementById(popupId);

            if (popup) {
                popup.style.display = "block";

                // Define o maior z-index para a pop-up recém-aberta
                popup.style.zIndex = zIndexCounter++;
            }
        });
    });

    // Captura todos os botões de fechar pop-up
    document.querySelectorAll(".close-popup").forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".popup").style.display = "none";
        });
    });

    // Permite trazer a pop-up para frente ao clicar nela
    document.querySelectorAll(".popup").forEach(popup => {
        popup.addEventListener("mousedown", () => {
            popup.style.zIndex = zIndexCounter++;
        });
    });

    // Permite arrastar as janelas pop-up
    document.querySelectorAll(".popup-header").forEach(header => {
        let isDragging = false;
        let offsetX, offsetY;
        let popup = header.parentElement;

        header.addEventListener("mousedown", (event) => {
            isDragging = true;
            offsetX = event.clientX - popup.offsetLeft;
            offsetY = event.clientY - popup.offsetTop;

            // Sempre traz a pop-up para frente ao clicar
            popup.style.zIndex = zIndexCounter++;

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
    });
});
function toggleMenu() {
    let menu = document.querySelector('.menu');
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
}