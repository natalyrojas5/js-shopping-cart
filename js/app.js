// ------------------ VARIABLES
const carrito = document.querySelector("#carrito");
const cursos = document.querySelector("#lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.getElementById("vaciar-carrito");

// ------------------- LISTENER

cargarEventListener();

function cargarEventListener() {
  cursos.addEventListener("click", comprarCurso);
  carrito.addEventListener("click", eliminarCurso);
  vaciarCarrito.addEventListener("click", vaciarCarro);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

// -------------------- FUNCIONES
function comprarCurso(e) {
  e.preventDefault();
  // VERIFICA SI LA CLASE 'agregar-carrito' es descendiente de e
  if (e.target.classList.contains("agregar-carrito")) {
    // Si es verdadero (true), ejecuta lo sgt.
    const curso = e.target.parentElement.parentElement;

    leerDatosCurso(curso);
  } else {
    console.log("Seleccione curso a comprar");
  }
}

// ------ LEER DATOS DE CURSO
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
  };

  insertarCarrito(infoCurso);
}

// ----- INSERTAR CURSO A CARRITO
function insertarCarrito(curso) {
  const row = document.createElement("tr");
  row.innerHTML = `
            <td><img src="${curso.imagen}" width="100"></td>
            <td><h4>${curso.titulo}</h4></td>
            <td><p>${curso.precio}</p></td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
        `;

  listaCursos.appendChild(row);

  guardarCursosLocalStorage(curso);
}

// ---- ELIMINAR CURSO
function eliminarCurso(e) {
  e.preventDefault();

  let curso, cursoId;
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector("a").getAttribute("data-id");
  }

  eliminarCursoLocalStorage(cursoId);
}

function vaciarCarro() {
  listaCursos.innerHTML = " ";
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }

  vaciaCarritoLocalStorage();
  return false;
}

function guardarCursosLocalStorage(curso) {
  let cursos;

  cursos = obtenerCursosLocalStorage();
  cursos.push(curso);
  localStorage.setItem("cursos", JSON.stringify(cursos));
}

function obtenerCursosLocalStorage(curso) {
  let cursosLS;

  if (localStorage.getItem("cursos") == null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem("cursos"));
  }

  return cursosLS;
}

function leerLocalStorage() {
  let cursosLS;

  cursosLS = obtenerCursosLocalStorage();
  cursosLS.forEach((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${curso.imagen}" width="100"></td>
            <td><h4>${curso.titulo}</h4></td>
            <td><p>${curso.precio}</p></td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
        `;

    listaCursos.appendChild(row);
  });
}

function eliminarCursoLocalStorage(curso) {
  let cursosLS;

  cursosLS = obtenerCursosLocalStorage();
  cursosLS.forEach((cursoLS, index) => {
    if (cursoLS.id === curso) {
      cursosLS.splice(index, 1);
    }
  });

  localStorage.setItem("cursos", JSON.stringify(cursosLS));
}

function vaciaCarritoLocalStorage() {
  localStorage.clear();
}
