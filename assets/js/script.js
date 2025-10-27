// ^ html Elements

var nameInput = document.querySelector("#nameInput");
var urlInput = document.querySelector("#urlInput");
var containerhtml = document.querySelector("#body");
var btnSubmit = document.querySelector("#Submit");
var errorOverlay = document.querySelector(".errorOverlay");
var closeBtn = document.querySelector(".closeBtn");

// ^ variables

var listBook = [];
if (localStorage.getItem("books") !== null) {
  listBook = JSON.parse(localStorage.getItem("books"));
  displayAllBookMark();
}

var nameRegex = /^\w{3,}$/;
var urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

// ^ Functions

function addBookMark() {
  if (
    valadationInput(nameRegex, nameInput) &&
    valadationInput(urlRegex, urlInput) === true
  ) {
    var bokMark = {
      indexBookBatrk: listBook.length + 1,
      nameBookBatrk: nameInput.value,
      urlBookBatrk: urlInput.value,
    };

    listBook.push(bokMark);
    localStorage.setItem("books", JSON.stringify(listBook));
    displayBookMark(listBook.length - 1);

    clearInputs();
  } else {
    errorOverlay.classList.remove("d-none");
  }
}

function displayBookMark(index) {
  var htmlcontent = `
                    <tr class="border-top border-1 border-0 ">
                        <td class="p-3">${listBook[index].indexBookBatrk}</td>
                        <td>${listBook[index].nameBookBatrk}</td>
                        <td><a href="${listBook[index].urlBookBatrk}" target="_blanck" class="btn btn-info btn-visit"><i class="fa-solid fa-eye pe-2"></i></i>Visite</a></td>
                        <td><button class="btn btn-danger btn-delete" onclick="deletebook(${index})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                    </tr>
                    `;

  containerhtml.innerHTML += htmlcontent;
}
function displayAllBookMark() {
  for (var i = 0; i < listBook.length; i++) {
    displayBookMark(i);
  }
}

function clearInputs() {
  nameInput.value = "";
  urlInput.value = "";
  nameInput.classList.remove("is-valid");
  urlInput.classList.remove("is-valid");
  nameInput.classList.remove("is-invalid");
  urlInput.classList.remove("is-invalid");
}

function deletebook(index) {
  listBook.splice(index, 1);

  localStorage.setItem("books", JSON.stringify(listBook));

  containerhtml.innerHTML = "";
  updateindex();
  displayAllBookMark();
}
function updateindex() {
  for (var i = 0; i < listBook.length; i++) {
    listBook[i].indexBookBatrk = i + 1;
  }
}

function valadationInput(regex, element) {
  if (regex.test(element.value) === true) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");

    return true;
  }

  element.classList.remove("is-valid");
  element.classList.add("is-invalid");

  return false;
}

function hideMessageError() {
  errorOverlay.classList.add("d-none");
}

// ^ Events

nameInput.addEventListener("input", function () {
  valadationInput(nameRegex, nameInput);
});
urlInput.addEventListener("input", function () {
  valadationInput(urlRegex, urlInput);
});

btnSubmit.addEventListener("click", addBookMark);

closeBtn.addEventListener("click", hideMessageError);

document.addEventListener("keydown", function (e) {
  if (e.code === "Escape") {
    hideMessageError();
  }
});
