// Получаем все кнопки "удалить"
const deleteButtons = document.querySelectorAll(".delete-course");

// Получаем кнопку "подтвердить удаление"
const confirmButton = document.querySelector(".confirm-delete");

// Получаем все кнопки "изменить"
const editButtons = document.querySelectorAll(".edit-course");

// Функция для изменения состояния кнопки "удалить"
let deletedCourses = [];
function changeDeleteButton(button) {
  if (button.innerText === "Удалить") {
    button.innerText = "Будет удалено";
    button.classList.add("btn-danger");
    button.classList.remove("btn-primary");
    // Получаем кнопку "изменить" внутри родительского элемента кнопки "удалить"
    const editButton = button.parentNode.querySelector(".edit-course");
    // Скрываем кнопку "изменить"
    editButton.style.display = "none";
  } else {
    button.innerText = "Удалить";
    button.classList.add("btn-primary");
    button.classList.remove("btn-danger");
    // Получаем кнопку "изменить" внутри родительского элемента кнопки "удалить"
    const editButton = button.parentNode.querySelector(".edit-course");
    // Показываем кнопку "изменить"
    editButton.style.display = "inline-block";
  }
  // Обновляем переменную hasDeleteButtons
  const hasDeleteButtons = document.querySelectorAll(".delete-course");
  let hasWillBeDeleted = false;
  // Проверяем, есть ли кнопки с текстом "Будет удалено"
  hasDeleteButtons.forEach((button) => {
    if (button.innerText === "Будет удалено") {
      hasWillBeDeleted = true;
      const courseId = button.closest("li").dataset.courseId;
      console.log("Курс " + courseId + " будет удален");
    }
  });
  // Скрываем кнопку "Подтвердить удаление", если нет кнопок с текстом "Будет удалено"
  if (hasWillBeDeleted) {
    confirmButton.style.display = "inline-block";
  } else {
    confirmButton.style.display = "none";
  }
}

// Добавляем обработчик событий для всех кнопок "удалить"
deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeDeleteButton(button);
  });
});

// Добавляем обработчик событий для кнопки "подтвердить удаление"
confirmButton.addEventListener("click", () => {
  const willBeDeletedCourses = [];
  // Находим все кнопки "удалить", у которых текст равен "Будет удалено"
  const deletedCourseIds = [];
    deleteButtons.forEach((button) => {
    if (button.innerText === "Будет удалено") {
        const courseId = button.parentNode.parentNode.dataset.courseId;
        console.log(courseId)
        deletedCourseIds.push(courseId);
        //console.log(deletedCourseIds)
    }
});
// Записываем список id курсов в скрытое поле формы
    const deleteInput = document.querySelector("#delete-input");
    deleteInput.value = JSON.stringify(deletedCourseIds);
    console.log(deleteInput.value);
// Отправляем форму на сервер
    const deleteForm = document.querySelector("#delete-form");
    deleteForm.submit();
});

