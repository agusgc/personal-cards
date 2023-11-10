let cards = document.querySelectorAll(".card");

//ADD
const addCardBtn = document.getElementById("plus-card");
const cardsContainer = document.getElementById("cards-container");
const addCard = document.getElementById("add-card");

addCardBtn.addEventListener("click", () => {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = `
    <div class="title-container">
        <div class="delete-btn"><img src="img/icons/delete-icon.svg" alt="Eliminar tarjeta" title="Eliminar tarjeta"></div>
        <input class="title" type="text" value="Título">
        <input class="subtitle title" type="text" value="Subtítulo"> 
    </div>
    <div class="content-container">
        <textarea name="content" class="content" placeholder="Contenido..."></textarea>
    </div>
    <div class="options-container">
        <div>
            <img src="img/icons/img-icon.svg" class="icon" alt="Agregar imagen" title="Agregar imagen">
            <img src="img/icons/file-icon.svg" class="icon" alt="Agregar archivo" title="Agregar archivo">
            <img src="img/icons/color-icon.svg" class="icon" alt="Cambiar color" title="Cambiar color">
            <img src="img/icons/size-icon.svg" class="icon" alt="Cambiar tamaño" title="Cambiar tamaño">
        </div>
    </div>`;

  cardsContainer.insertBefore(newCard, addCard);
  cards = document.querySelectorAll(".card");
  deleteCard();
});

//DELETE
function deleteCard() {
  const deleteCardBtn = document.querySelectorAll(".delete-btn");
  deleteCardBtn.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.parentNode.remove();
    });
  });
}
