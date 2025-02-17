document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.querySelector("#section-right p");
    const textContent = textElement.innerHTML;  // Pega o conteúdo HTML, incluindo emojis e tags

    // Limpa o conteúdo original
    textElement.innerHTML = "";

    // RegEx para separar o texto das tags HTML e preservar os espaços
    const parts = textContent.split(/(<[^>]+>|\s+)/g);  // Inclui todas as tags HTML e espaços em branco

    const fragment = document.createDocumentFragment();
    
    parts.forEach(part => {
        if (part.match(/<[^>]+>/)) {
            // Se for uma tag HTML (como <br>, <strong>, etc.), adiciona diretamente ao fragmento
            const tag = document.createElement("span");
            tag.innerHTML = part;
            fragment.appendChild(tag);
        } else if (part.match(/\s+/)) {
            // Se for um espaço em branco (não mostra o código &nbsp;), apenas preserva o espaço
            const space = document.createElement("span");
            space.textContent = " ";  // Apenas insere um espaço simples
            fragment.appendChild(space);
        } else {
            // Se for texto, divide as letras e envolve cada uma em <span>
            part.split("").forEach(char => {
                const span = document.createElement("span");
                span.textContent = char;
                span.classList.add("text-container");
                fragment.appendChild(span);
            });
        }
    });

    textElement.appendChild(fragment);  // Adiciona ao DOM

    const letters = document.querySelectorAll(".text-container");

    document.addEventListener("mousemove", (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        letters.forEach(letter => {
            const rect = letter.getBoundingClientRect();
            const letterX = rect.left + rect.width / 2;
            const letterY = rect.top + rect.height / 2;

            // Calcula a distância do mouse até a letra
            const distance = Math.sqrt((mouseX - letterX) ** 2 + (mouseY - letterY) ** 2);

            // Define um raio para a área de efeito
            const radius = 30;

            if (distance < radius) {
                letter.classList.add("highlight");
            } else {
                letter.classList.remove("highlight");
            }
        });
    });
});
// Referências para os elementos
const openPopupBtn = document.getElementById("open-popup");
const closePopupBtn = document.getElementById("close-popup");
const popup = document.getElementById("popup");
const popupHeader = document.getElementById("popup-header");

// Abrir a janela pop-up
openPopupBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Evita que o link de abertura recarregue a página
    popup.style.display = "block";  // Torna a janela visível
});

// Fechar a janela pop-up
closePopupBtn.addEventListener("click", (event) => {
    event.stopPropagation();  // Evita fechar ao clicar dentro
    popup.style.display = "none";  // Oculta a janela
});

// Impede que cliques dentro da pop-up fechem a janela
popup.addEventListener("click", (event) => {
    event.stopPropagation();
});

// Evita que links dentro da pop-up recarreguem a página
popup.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();  // Impede a navegação
        alert("Você clicou em um link dentro da pop-up!"); // Simula ação sem fechar a pop-up
    });
});

// Permite arrastar a janela pop-up
let isDragging = false;
let offsetX, offsetY;

popupHeader.addEventListener("mousedown", (event) => {
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
