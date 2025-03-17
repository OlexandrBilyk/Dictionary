const addInput = document.getElementById("addInput");
const addBtn = document.getElementById("addBtn");
const dictionary = document.getElementById("dictionary");

let words = JSON.parse(localStorage.getItem("dictionary")) || [];

function renderWords() {
  dictionary.innerHTML = "";
  words.forEach((word, i) => {
    dictionary.insertAdjacentHTML(
      "beforeend",
      `
      <li class="dictionary__item">
        ${word} 
        <button type="button" class="delete-btn" data-index="${i}">❌</button>
      </li>
      `
    );
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      deleteWord(index);
    });
  });
}

addBtn.addEventListener("click", () => {
  const newWord = addInput.value.trim();
  if (newWord && !words.includes(newWord)) {
    words.push(newWord);
    localStorage.setItem("dictionary", JSON.stringify(words));
    addInput.value = "";
    renderWords();
  }
});

function deleteWord(index) {
  words.splice(index, 1);
  localStorage.setItem("dictionary", JSON.stringify(words));
  renderWords();
}

renderWords();
