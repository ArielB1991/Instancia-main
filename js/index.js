//clase objeto cliente con sus parametros
class Cliente {
  constructor(nombre, apellido, domicilio, codigopostal, telefono, dni, cuit) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.codigopostal = codigopostal;
    this.domicilio = domicilio;
    this.telefono = telefono;
    this.dni = dni;
    this.cuit = cuit;
  }

  saludo() {
    return `Bienvenido ${this.nombre}, Esperamos que disfrutes tu estadia!`;
  }

  //mostrarInfo() {
    /*return;
    `Nombre: ${this.nombre}<br>
     Domicilio: ${this.apellido}<br>
     Codigo Postal: ${this.codigopostal}<br>
     Telefono: ${this.telefono}<br>
     Dni: ${this.dni}`;*/
  
}

//
class CarteraClientes {
  constructor(clientes) {
    this.clientes = clientes;
  }
  //usa el metodo push para agregar un nuevo cliente a clienteNuevo
  agregar(clienteNuevo) {
    this.clientes.push(clienteNuevo);
    return clienteNuevo;
  }
}
function mostrarCliente(cliente) {
  const infoCliente = cliente.mostrarInfo();
  document.getElementById("infor-cliente").innerHTML = infoCliente;
}

//instancia de CarteraClientes inicializa una lista vacia
let baseClientes = new CarteraClientes([]);

//Obtencion de valores ingresados en el formulario.
function ingresar() {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let domicilio = document.getElementById("domicilio").value;
  let codigopostal = Number(document.getElementById("codigopostal").value);
  let telefono = Number(document.getElementById("telefono").value);
  let dni = Number(document.getElementById("dni").value);
  let cuit = Number(document.getElementById("cuit").value);
  //limpia cualquier mensaje de confimacion
  document.getElementById("correcto").innerText = "";
  // Comprueba si la operacion es agregar o modificar un cliente basandose en el valor del boton de accion
  if (document.getElementById("guardar").value == "Agregar") {
    //Comprueba que no faltes datos en los campos
    let validar = () => {
      let mensaje = "";
      if (nombre == "") {
        mensaje += "Ingrese un nombre" + "\n";
      }
      if (apellido == "") {
        mensaje += "Ingrese un apellido" + "\n";
      }
      if (domicilio == "") {
        mensaje += "Ingrese un domicilio" + "\n";
      }
      if (codigopostal == "") {
        mensaje += "Ingrese un código postal" + "\n";
      }
      if (telefono == "") {
        mensaje += "Ingrese un teléfono" + "\n";
      }
      if (dni == "") {
        mensaje += "Ingrese un DNI" + "\n";
      }
      if (cuit == "") {
        mensaje += "Ingrese un CUIT" + "\n";
      }
      //verifica si el dni ya esta ingresado en la bd
      function checkDNI() {
        return dni;
      }
      //compara con usando el metodo entre el elmento ingresado y el check
      const found = baseClientes.clientes.findIndex((res) => {
        return res.dni === checkDNI();
      });
      console.table(`===========>>>>>> ${found}`);
      if (found > -1) {
        mensaje = "No puede ingresar un Cliente existente, puede modificarlo.";
      }
      //Devuelve true si no hay errores y false si los hay.
      let parrafo_errores = document.getElementById("mensaje");
      //Muestra mensaje de error
      parrafo_errores.innerText = mensaje;
      return mensaje == "" ? true : false;
    };
    //Si la validacion es exitosa crea el nuevo cliente y lo agrega a la base de clientes
    //resetea el formulario y el contenido de la tabla de clientes
    if (validar()) {
      let nuevo = new Cliente(
        nombre,
        apellido,
        domicilio,
        codigopostal,
        telefono,
        dni,
        cuit
      );
      let clienteAgregado = baseClientes.agregar(nuevo);
      document.getElementById("correcto").innerText = `Gracias por registrarse`;
      document.getElementById("saludo").innerText = clienteAgregado.saludo();
      document.getElementById("formulario").reset();
      console.table(baseClientes.clientes);

      //Cliente.mostrarCliente(clienteAgregado);
    }
    document.getElementById("clientes-tbody").innerText = "";
  } else {
    //Valida modificacion y que tenga todos los datos
    let validarmodificacion = () => {
      let mensaje = "";
      if (nombre == "") {
        mensaje += "Ingrese un nombre" + "\n";
      }
      if (apellido == "") {
        mensaje += "Ingrese un apellido" + "\n";
      }
      if (domicilio == "") {
        mensaje += "Ingrese un domicilio" + "\n";
      }
      if (codigopostal == "") {
        mensaje += "Ingrese un código postal" + "\n";
      }
      if (telefono == "") {
        mensaje += "Ingrese un teléfono" + "\n";
      }
      if (dni == "") {
        mensaje += "Ingrese un DNI" + "\n";
      }
      if (cuit == "") {
        mensaje += "Ingrese un CUIT" + "\n";
      }
      let parrafo_errores = document.getElementById("mensaje");
      parrafo_errores.innerText = mensaje;
      return mensaje == "" ? true : false;
    };
    //Modifica los datos del cliente con la validacion exitosa.
    //resetea el formulario y se remplaza con los datos nuevos
    if (validarmodificacion()) {
      function checkDNI() {
        return dni; /* ESTO ES LO QUE HAY QUE BUSCAR EN LA BASEDECLIENTES*/
      }
      const found = baseClientes.clientes.findIndex((res) => {
        return res.dni === checkDNI();
      });
      console.table(`===========>>>>>> ${found}`);
      let nuevo = new Cliente(
        nombre,
        apellido,
        domicilio,
        codigopostal,
        telefono,
        dni,
        cuit
      );
      baseClientes.clientes.splice(found, 1, nuevo);
      document.getElementById(
        "correcto"
      ).innerText = `Cliente modificado correctamente`;
      document.getElementById("saludo").innerText = clienteAgregado.saludo();
      document.getElementById("formulario").reset();
      console.table(baseClientes.clientes);
    }
    document.getElementById("clientes-tbody").innerText = "";
    document.getElementById("guardar").value = "Agregar";
  }
}

//Actualiza el contenido de los elementos tbody en el html en baseClientes.clientes
function listar() {
  //limpia el mensaje del elemente en html con el id mensaje
  document.getElementById("mensaje").innerText = "";
  // Obtiene referencias a los elementos en tbody donde mostraran los clientes
  let resultado = document.getElementById("clientes-tbody");
  let resultado2 = document.getElementById("clientessimple-tbody");
  //Comprueba si si la base de datos esta vacia y si lo esta inyecta el mensaje.
  if (baseClientes.clientes == "") {
    resultado.innerHTML = "No ha ingresado ningún cliente aún";
  } else {
    //si la base no esta vacia limpia el contenido de tbody
    document.getElementById("clientes-tbody").innerHTML = "";
    //Itera sobre la lista de clientes y a;ade filas a los elementos en tbody con la informacion de cada cliente
    baseClientes.clientes.forEach(
      (clientes) =>
        (resultado.innerHTML += `
        <tr>
            <td>${clientes.apellido}, ${clientes.nombre}</td>
            <td>${clientes.domicilio}</td>
            <td>${clientes.codigopostal}</td>
            <td>${clientes.telefono}</td>
            <td>${clientes.dni}</td>
            <td>${clientes.cuit}</td>
            <td>
                <button id="${clientes.dni}" type="button" onclick="cargar(this.id)" class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-square text-dark"></i></a>
                <button id="${clientes.dni}" type="button" onclick="eliminar(this.id)" class="btn btn-outline-light btn-sm"><i class="bi bi-trash3-fill text-danger"></i></button>
            </td>    
        </tr>`)
    );
    //lista simple toma nombre apellido y cuit de la base de clientes
    document.getElementById("clientessimple-tbody").innerHTML = "";
    baseClientes.clientes.forEach(
      (clientes) =>
        (resultado2.innerHTML += `
        <tr>
            <td>${clientes.apellido}, ${clientes.nombre}</td>
            <td>${clientes.cuit}</td>
        </tr>`)
    );

    document.getElementById("correcto").innerText = "";
  }
}

// Clientes predefinidos para pruebas
function basenovacia() {
  let nombre = "Laura";
  let apellido = "Ascacibar";
  let domicilio = "Loredo 123";
  let codigopostal = 1113;
  let telefono = "11554477";
  let dni = 23345465;
  let cuit = 2323345463;
  let nuevo = new Cliente(
    nombre,
    apellido,
    domicilio,
    codigopostal,
    telefono,
    dni,
    cuit
  );
  baseClientes.agregar(nuevo);

  let nombre1 = "Jesus";
  let apellido1 = "Diaz";
  let domicilio1 = "Rivadavia 8200";
  let codigopostal1 = 1403;
  let telefono1 = "+5491159264703";
  let dni1 = 33456167;
  let cuit1 = 20334561674;
  let nuevo1 = new Cliente(
    nombre1,
    apellido1,
    domicilio1,
    codigopostal1,
    telefono1,
    dni1,
    cuit1
  );
  baseClientes.agregar(nuevo1);

  let nombre2 = "Lautaro";
  let apellido2 = "Gomez";
  let domicilio2 = "Yerbal 45";
  let codigopostal2 = 1406;
  let telefono2 = "11332288";
  let dni2 = 23457856;
  let cuit2 = 20234578564;
  let nuevo2 = new Cliente(
    nombre2,
    apellido2,
    domicilio2,
    codigopostal2,
    telefono2,
    dni2,
    cuit2
  );
  baseClientes.agregar(nuevo2);
}
//Toma como parametro id/dni representado
function cargar(id) {
  function checkDNI(dni) {
    return (dni = parseInt(id));
  }
  //Busca en la base el indice en la lista baseClientes.clientes por dni
  //El findIndex muestra el primer resultado que coincida es dni
  const found = baseClientes.clientes.findIndex((res) => {
    return res.dni === checkDNI();
  });
  //imprime el id en consola para la verificacion
  console.log(id);
  console.table(baseClientes.clientes[found]);
  //Asinga los valores a los campos del formulario para que se muestren en el form para poder editarlos
  document.getElementById("nombre").value = baseClientes.clientes[found].nombre;
  document.getElementById("apellido").value =
    baseClientes.clientes[found].apellido;
  document.getElementById("domicilio").value =
    baseClientes.clientes[found].domicilio;
  document.getElementById("codigopostal").value =
    baseClientes.clientes[found].codigopostal;
  document.getElementById("telefono").value =
    baseClientes.clientes[found].telefono;
  document.getElementById("dni").value = baseClientes.clientes[found].dni;
  document.getElementById("cuit").value = baseClientes.clientes[found].cuit;

  //Cambia el boton de accion indicando que sera modicado un cliente existente
  document.getElementById("guardar").value = "Modificar";
}

// Toma el parametro por id que representa el dni
function eliminar(id) {
  function checkDNI(dni) {
    return (dni = parseInt(id));
  }
  const found = baseClientes.clientes.findIndex((res) => {
    return res.dni === checkDNI();
  });
  console.log(id);
  console.table(baseClientes.clientes[found]);
  baseClientes.clientes.splice(found, 1);
  listar();
}
function segundolistado() {
  //llamamos a la funcion listar
  listar();
  let tablasimple = document.getElementById("tablasimple").hidden;
  if (tablasimple == true) {
    //en consola registra la tabla si esta escondida
    console.log("tabla simple escondida");
    //con el hidden en false cambia la visibilidad
    document.getElementById("tablasimple").hidden = false;
    // Oculta la tabla compuesta
    document.getElementById("tablacompuesta").hidden = true;
  } else {
    console.log("tabla compuesta escondida");
    document.getElementById("tablasimple").hidden = true;
    document.getElementById("tablacompuesta").hidden = false;
  }
}
// muestra en consola la tabla con el contenido de la base de clientes.
console.table(baseClientes);
