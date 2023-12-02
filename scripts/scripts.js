if (!localStorage.getItem("savedCard")) {
  localStorage.setItem("savedCard", "[]")
}

let cards = document.querySelectorAll(".card");
const cardsContainer = document.getElementById("cards-container");
const addCard = document.getElementById("add-card");

//Local storage
let localStorageInfo = JSON.parse(localStorage.getItem("savedCard"));
let ids = 1;

localStorageInfo.forEach((card) => {
  const newCard = document.createElement("div");
  newCard.classList.add("card");

  newCard.innerHTML = ""
  newCard.innerHTML += `
    <div class="title-container">
        <div class="delete-btn"><img src="img/icons/delete-icon.svg" alt="Eliminar tarjeta"
                title="Eliminar tarjeta"></div>
        <input class="title" type="text" value="${card.title}" data-id="${ids++}">
        <input class="subtitle" type="text" value="${card.subtitle}">
    </div>
    <div class="content-container">
        <textarea name="content" class="content" placeholder="Contenido...">${card.content}</textarea>
    </div>
    <div class="options-container">
        <div>
            <img src="img/icons/img-icon.svg" class="icon add-image-btn" alt="Agregar imagen"
                title="Agregar imagen">
            <img src="img/icons/file-icon.svg" class="icon" alt="Agregar archivo" title="Agregar archivo">
            <img src="img/icons/color-icon.svg" class="icon" alt="Cambiar color" title="Cambiar color">
            <img src="img/icons/size-icon.svg" class="icon" alt="Cambiar tamaño" title="Cambiar tamaño">
        </div>
    </div>`;
    let contentContainer = newCard.querySelector(".content-container");
    let content = newCard.querySelector(".content");
    if (card.image !== "") {
      const newImage = document.createElement("img");
      newImage.classList.add("cardImg");
      newImage.src = card.image;
      newImage.setAttribute("data-position", card.positionImg);
      if (card.positionImg === "top") {
        contentContainer.insertBefore(newImage, content);
      }
      else if(card.positionImg === "bottom"){
        contentContainer.insertBefore(newImage, null);
      }
    }
  cardsContainer.insertBefore(newCard, addCard);
});

let addImageBtn = document.querySelectorAll(".add-image-btn");

//UPDATE
function updateCard() {
  cards = document.querySelectorAll(".card");
  let inputs = []
  cards.forEach(card => {
    inputs = card.querySelectorAll("input, textarea");
    let title = card.querySelector(".title");
    let id = title.dataset.id;
    let subtitle = card.querySelector(".subtitle");
    let content = card.querySelector(".content");
    let contentContainer = card.querySelector(".content-container");
    let image = ""
    if (contentContainer.querySelector("img")) {
      image = contentContainer.querySelector("img");
    }
    else{
      image = ""
    }

    inputs.forEach(element => {
      element.addEventListener("input", ()=>{
        let newInfo ={
          id: id,
          title: title.value,
          subtitle: subtitle.value,
          content: content.value,
          image: image.src,
          positionImg: image.dataset.position,
          primaryColor: "",
          secondaryColor: "",
        };
        for (let i = 0; i < localStorageInfo.length; i++) {
          if (localStorageInfo[i].id === id) {
            localStorageInfo.splice(i, 1, newInfo);
            localStorage.setItem("savedCard", JSON.stringify(localStorageInfo))
          }
        }
      })
    });
  });
}
updateCard()

//ADD
const addCardBtn = document.getElementById("plus-card");

addCardBtn.addEventListener("click", () => {
  //Agrega tarjeta
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = `
    <div class="title-container">
        <div class="delete-btn"><img src="img/icons/delete-icon.svg" alt="Eliminar tarjeta" title="Eliminar tarjeta"></div>
        <input class="title" type="text" value="Título" data-id="${ids++}">
        <input class="subtitle" type="text" value="Subtítulo"> 
    </div>
    <div class="content-container">
        <textarea name="content" class="content" placeholder="Contenido..."></textarea>
    </div>
    <div class="options-container">
        <div>
        <img src="img/icons/img-icon.svg" class="icon add-image-btn" alt="Agregar imagen" title="Agregar imagen">
            <img src="img/icons/file-icon.svg" class="icon" alt="Agregar archivo" title="Agregar archivo">
            <img src="img/icons/color-icon.svg" class="icon" alt="Cambiar color" title="Cambiar color">
            <img src="img/icons/size-icon.svg" class="icon" alt="Cambiar tamaño" title="Cambiar tamaño">
        </div>
    </div>`;

  cardsContainer.insertBefore(newCard, addCard);
  cards = document.querySelectorAll(".card");

  //Actualuiza local storage
  localStorageInfo = []
  cards.forEach((card) => {
    let title = card.querySelector(".title");
    let id = title.dataset.id;
    let subtitle = card.querySelector(".subtitle");
    let content = card.querySelector(".content");
    
    localStorageInfo.push({
      id: id,
      title: title.value,
      subtitle: subtitle.value,
      content: content.value,
      image: "",
      positionImg: "",
      primaryColor: "",
      secondaryColor: "",
    });

    localStorage.setItem("savedCard", JSON.stringify(localStorageInfo))
  });

  addImageBtn = document.querySelectorAll(".add-image-btn");
  deleteCard();
  addImage();
  updateCard()
});

//DELETE
function deleteCard() {
  const deleteCardBtn = document.querySelectorAll(".delete-btn");
  deleteCardBtn.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.parentNode.remove();
      let id = button.parentNode.parentNode.querySelector(".title").dataset.id;
      for (let i = 0; i < localStorageInfo.length; i++) {
        if (localStorageInfo[i].id === id) {
          localStorageInfo.splice(i, 1);
          localStorage.setItem("savedCard", JSON.stringify(localStorageInfo))
        }
      }
    });
  });
}
deleteCard();

//AUTOAJUSTAR ALTO DE TEXTAREA
let textareaList = document.querySelectorAll(".content");
textareaList.forEach((element) => {
  element.addEventListener("input", () => {
    element.style.height = `${element.scrollHeight}px`;
  });
});

//AGREGAR IMAGEN
const addImageFormCont = document.getElementById("add-image-container");
const addImageForm = document.getElementById("add-image-form");
const quitAddImageForm = document.getElementById("quit-add-image-form");
const inputImage = document.getElementById("input-image");

quitAddImageForm.addEventListener("click", () => {
  addImageFormCont.style.display = "none";
});

function addImage() {
  cards = document.querySelectorAll(".card");
  let imageUrl = "";
  let imgName = document.getElementById("image-name");

  inputImage.addEventListener("change", () => {
    const fr = new FileReader();
    fr.readAsDataURL(inputImage.files[0]);
    imgName.innerHTML = inputImage.files[0].name;
    imgName.style.color="#000";
    fr.addEventListener("load", () => {
      imageUrl = fr.result;
    });
  });
  cards.forEach(card => {
    let addImgBtn = card.querySelector(".add-image-btn");
    let content = card.querySelector(".content");
    let contentContainer = card.querySelector(".content-container");
    let addImgSubmit = document.getElementById("add-img-submit");
    let checkedInput = document.querySelectorAll("input[name='imagePosition']");
    let checked = "";

    checkedInput.forEach(element => {
      element.addEventListener('click', ()=>{
        checked = element.value;
        document.querySelector(".image-position-text").style.color="#000";
      })
    });

    addImgBtn.addEventListener("click", ()=>{
      addImageFormCont.style.display = "flex";
      imgName.innerHTML = "Seleccione una imagen";
      addImageForm.addEventListener("submit", (evento) => {
        evento.preventDefault();
        function positionImg(image) {
          if (checked === "top") {
            contentContainer.insertBefore(image, content);
            image.setAttribute("data-position", "top");
          }
          else if (checked === "bottom") {
            contentContainer.insertBefore(image, null);
            image.setAttribute("data-position", "bottom");
          }
        }
        if (inputImage.value === "") {
          imgName.style.color="#ff2626";
          return;
        }
        else if(checked === ""){
          document.querySelector(".image-position-text").style.color="#ff2626";
          return;
        }
        else{
          if (contentContainer.querySelector("img")) {
            let image = contentContainer.querySelector("img");
            image.src = imageUrl;
            positionImg(image);
          }
          else{
            const newImage = document.createElement("img");
            newImage.classList.add("cardImg");
            newImage.src = imageUrl;
            newImage.setAttribute("data-position", checked);
            positionImg(newImage)
          }
  
          let id = card.querySelector(".title").dataset.id;
          for (let i = 0; i < localStorageInfo.length; i++) {
            if (localStorageInfo[i].id === id) {
              localStorageInfo[i].image = imageUrl;
              localStorageInfo[i].positionImg = checked;
              localStorage.setItem("savedCard", JSON.stringify(localStorageInfo))
            }
          }
          addImageFormCont.style.display = "none";
        }
        addImageForm.submit();
      });
    });
  })
}
addImage();
