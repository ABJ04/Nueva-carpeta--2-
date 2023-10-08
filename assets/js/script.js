import tareas from "./tasks.js";

const inputid = document.querySelector(".inputid");
const buttonid = document.querySelector(".buttonid");
const totalid = document.querySelector(".totalid");
const realizadasid = document.querySelector(".realizadasid");
const realizaDascount = document.getElementById("realizaDascount");
const listaTareas = document.getElementById("listaTareas");

function mostrarTareas() {
  listaTareas.innerHTML = "";
  let tareasRealizadas = 0;

  tareas.forEach((tarea) => {
    const elementoLista = document.createElement("li");
    elementoLista.innerHTML = `
      <span>${tarea.id} ${tarea.name}</span>
      <input type="checkbox" ${tarea.completed ? "checked" : ""} data-id="${
      tarea.id
    }">
      <i class="fas fa-trash" data-id="${tarea.id}"></i>
    `;
    listaTareas.appendChild(elementoLista);

    if (tarea.completed) {
      tareasRealizadas++;
    }
  });

  totalid.querySelector("small").textContent = tareas.length;
  realizaDascount.textContent = tareasRealizadas;
}

function agregarTarea() {
  const valorInput = inputid.value.trim();
  if (valorInput !== "") {
    const nuevaTarea = {
      id: tareas.length + 1,
      name: valorInput,
      completed: false,
    };

    tareas.push(nuevaTarea);
    actualizarTareas();
    inputid.value = "";
  }
}

function actualizarTareas() {
  mostrarTareas();
}

function marcarComoCompletada(event) {
  const tareaId = parseInt(event.target.dataset.id);
  const checkbox = event.target;
  tareas.forEach((tarea) => {
    if (tarea.id === tareaId) {
      tarea.completed = checkbox.checked;
    }
  });
  actualizarTareas();
}

function eliminarTarea(event) {
  const tareaId = parseInt(event.target.dataset.id);
  tareas.splice(
    tareas.findIndex((tarea) => tarea.id === tareaId),
    1
  );
  actualizarTareas();
}

buttonid.addEventListener("click", agregarTarea);

listaTareas.addEventListener("change", marcarComoCompletada);
listaTareas.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
    eliminarTarea(event);
  }
});

mostrarTareas();
