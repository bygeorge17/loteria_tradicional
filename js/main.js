window.onbeforeunload = function (e) {
  alert("Algo paso");
};
new Vue({
  el: "#loteria",
  created: function () {
    /* window.localStorage.clear(); */
    if (window.localStorage.getItem("cartas")) {
      let cartas = window.localStorage.getItem("cartas");
      this.cartas = JSON.parse(cartas);
      console.log(this.cartas);
    } else {
      window.localStorage.setItem("cartas", []);
    }
    this.barajar();
  },
  data: {
    barajas: [],
    cartas: [],
    pasando: [],
    actual: "",
    ganadores: [],
    cartaMaximizada: [],
    verCartaMaximizada: false,
  },
  methods: {
    maximizarCarta: function (carta) {
      this.cartaMaximizada = carta;
      this.verCartaMaximizada = true;
      console.log(this.verCartaMaximizada);
      console.log(this.cartaMaximizada);
    },
    cerrarModal: function () {
      this.verCartaMaximizada = false;
      this.cartaMaximizada = [];
    },
    limpiar: function () {
      if (
        this.pasando.length > 0 &&
        confirm("Esta seguro de que desea comenzar un nuevo juego?")
      ) {
        this.barajas = [];
        this.pasando = [];
        this.ganadores = [];
        this.actual = "";
        for (let index = 0; index < this.cartas.length; index++) {
          for (
            let indexCarta = 0;
            indexCarta < this.cartas[index].carta.length;
            indexCarta++
          ) {
            this.cartas[index].carta[indexCarta].paso = false;
          }
        }
      }
      this.barajar();
    },
    eliminar: function (indice, jugador) {
      let confirmed = confirm(`Esta Seguro que quiere eliminar a ${jugador}`);
      if (confirmed) {
        this.cartas.splice(indice, 1);
      }
      window.localStorage.setItem("cartas", JSON.stringify(this.cartas));
    },
    correr: function () {
      // if (this.ganadores.length == 0) {
      // console.log(this.ganadores.length);
      // }
      if (this.cartas.length < 2) {
        alert("Agrega mas jugadores para empezar a correr la baraja");
      } else {
        if (this.barajas.length != 0) {
          let indiceTotal = this.barajas.length;
          let indice = Math.floor(Math.random() * indiceTotal);
          this.actual = this.barajas[indice];
          this.pasando.push(this.actual);
          this.barajas.splice(indice, 1);
          for (let index = 0; index < this.cartas.length; index++) {
            for (
              let index1 = 0;
              index1 < this.cartas[index].carta.length;
              index1++
            ) {
              if (this.cartas[index].carta[index1].baraja == this.actual) {
                this.cartas[index].carta[index1].paso = true;
              }
            }
            if (
              !this.cartas[index].carta.some((baraja) => baraja.paso == false)
            ) {
              this.ganadores.push(this.cartas[index].jugador);
            }
          }
        } else {
          console.log("A ver a ver, que paso aqui?");
          console.log(this.barajas.length);
        }
        if (this.ganadores.length > 0) {
          if (this.ganadores.length == 1) {
            alert(`${this.ganadores[0]} Ha ganado`);
          } else {
            alert(`${this.ganadores} Han ganado`);
          }
        }
      }
    },
    nuevoJugador: function () {
      if (this.pasando.length === 0) {
        let jugador = prompt("Introduce el nombre del jugador");
        if (jugador == null || jugador == "") {
          alert("Debes introducir el nombre del jugador");
        } else {
          let cartaTemp = {};
          cartaTemp = {
            jugador: jugador,
            carta: [],
          };

          for (let index = 0; index < 16; index++) {
            let cartaElegida = Math.floor(Math.random() * 54 + 1);
            let rutaBaraja = `img/${cartaElegida}.jpg`;
            if (cartaTemp.carta.some((baraja) => baraja.baraja == rutaBaraja)) {
              index--;
            } else {
              cartaTemp.carta.push({ baraja: rutaBaraja, paso: false });
            }
          }
          console.log(cartaTemp);

          this.cartas.push(cartaTemp);
          window.localStorage.setItem("cartas", JSON.stringify(this.cartas));
        }
      } else {
        alert("Termina el juego actual para agregar nuevos jugadores");
      }
    },
    barajar: function () {
      for (let index = 1; index < 55; index++) {
        this.barajas.push(`img/${index}.jpg`);
      }
    },
    nuevoJuego: function () {
      let nuevo = confirm(
        "Esta seguro de que quiere crear un juego nuevo, LOS DATOS ACTUALES SE PERDERAN"
      );
      if (nuevo) {
        this.barajas = [];
        this.barajar();
        this.cartas = [];
        this.pasando = [];
        this.actual = "";
        this.ganadores = [];
      }
    },
    cambiarNombre: function (index) {
      let nuevoNombre = prompt("Nombre del Jugador");
      if (nuevoNombre == null || nuevoNombre == "") {
        alert("Debe introducir el nombre del jugador");
      } else {
        this.cartas[index].jugador = nuevoNombre;
      }
      window.localStorage.setItem("cartas", JSON.stringify(this.cartas));
    },
  },
});
