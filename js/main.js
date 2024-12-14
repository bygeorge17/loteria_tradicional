let styles=document.createElement('style');
new Vue({
  el: "#loteria",
  created: function () {
    /* window.localStorage.clear(); */
    if (window.localStorage.getItem("cartas")) {
      let cartas = window.localStorage.getItem("cartas");
      this.cartas = JSON.parse(cartas);
    } else {
      window.localStorage.setItem("cartas", []);
    }
    this.barajar();
  },
  data: {
    tablaSize:16,
    cartaWidth:30,
    condiciones:['llena'],
    barajas: [],
    cartas: [],
    pasando: [],
    actual: "",
    ganadores: [],
    cartaMaximizada: [],
    verCartaMaximizada: false,
  },
  mounted() {
    let sizeTabla=window.localStorage.getItem('sizeTabla')?window.localStorage.getItem('sizeTabla'):4;
    this.tablaSize=sizeTabla;
    let gridSize=this.tablaSize;
    let lxc=Math.sqrt(gridSize);
    let width=Math.floor(130/lxc);
    let widthM=Math.floor(300/lxc);
    const aspectRatio = 16 / 9;
    const height = Math.round(width * aspectRatio);
    const heightM = Math.round(widthM * aspectRatio);
    let myRules=document.styleSheets[0];
    let gridRule=window.localStorage.getItem("gridRule")?window.localStorage.getItem('gridRule'):`
    .gridTabla {
      grid-template-columns: repeat(${Math.sqrt(gridSize)}, 1fr);
      grid-template-rows: repeat(${Math.sqrt(gridSize)}, 1fr);
      }
      `;
      let gridRuleM=window.localStorage.getItem("gridRuleM")?window.localStorage.getItem('gridRuleM'):`
      .cartaM2 {
        grid-template-columns: repeat(${Math.sqrt(gridSize)}, 1fr);
        grid-template-rows: repeat(${Math.sqrt(gridSize)}, 1fr);
        }
        `;
        let sizeRule=window.localStorage.getItem("sizeRule")?window.localStorage.getItem('sizeRule'): `
        .elementoTabla {
          width: ${width}px;
          height: ${height}px;
          }
          `;
          let sizeRuleM=window.localStorage.getItem("sizeRuleM")?window.localStorage.getItem('sizeRuleM'): `
          .bcm {
            width: ${widthM}px;
            height: ${heightM}px;
            }
            `;
            let idSize=`${Math.sqrt(sizeTabla)}x${Math.sqrt(sizeTabla)}`;
            
    document.getElementById('2x2').style.background='blue';
    document.getElementById('3x3').style.background='blue';
    document.getElementById('4x4').style.background='blue';
    document.getElementById(idSize).style.background='green';
    styles.textContent=gridRule+gridRuleM+sizeRule+sizeRuleM;
    myRules.insertRule(gridRule, myRules.cssRules.length);
    myRules.insertRule(sizeRule, myRules.cssRules.length);
    myRules.insertRule(gridRuleM, myRules.cssRules.length);
    myRules.insertRule(sizeRuleM, myRules.cssRules.length);
    document.head.append(styles);     
  },
  methods: {
    cambiarTablaSize(cantidad){
      if (this.cartas.length>0) {
        return alert('No puedes cambiar el tipo de juego debido a que el juego ya comenzo');
      }
      this.tablaSize=cantidad;
      let gridSize=this.tablaSize;
      let idSize=`${Math.sqrt(cantidad)}x${Math.sqrt(cantidad)}`;
            
      document.getElementById('2x2').style.background='blue';
      document.getElementById('3x3').style.background='blue';
      document.getElementById('4x4').style.background='blue';
      document.getElementById(idSize).style.background='green';
      let lxc=Math.sqrt(gridSize);
      let width=Math.floor(130/lxc);
      let widthM=Math.floor(300/lxc);
      const aspectRatio = 16 / 9;
      const height = Math.round(width * aspectRatio);
      const heightM = Math.round(widthM * aspectRatio);
      let myRules=document.styleSheets[0];
      let gridRule = `
  .gridTabla {
    grid-template-columns: repeat(${Math.sqrt(gridSize)}, 1fr);
    grid-template-rows: repeat(${Math.sqrt(gridSize)}, 1fr);
  }
`;
      let sizeRule = `
  .elementoTabla {
    width: ${width}px;
    height: ${height}px;
  }
`;
      let gridRuleM = `
  .cartaM2 {
    grid-template-columns: repeat(${Math.sqrt(gridSize)}, 1fr);
    grid-template-rows: repeat(${Math.sqrt(gridSize)}, 1fr);
  }
`;
      let sizeRuleM = `
  .bcm {
    width: ${widthM}px;
    height: ${heightM}px;
  }
`;
window.localStorage.setItem("gridRule",gridRule);
window.localStorage.setItem("gridRuleM",gridRuleM);
window.localStorage.setItem("sizeRule",sizeRule);
window.localStorage.setItem("sizeRuleM",sizeRule);
window.localStorage.setItem("sizeTabla",cantidad);

      styles.textContent=gridRule+gridRuleM+sizeRule+sizeRuleM;
      myRules.insertRule(gridRule, myRules.cssRules.length);
      myRules.insertRule(sizeRule, myRules.cssRules.length);
      myRules.insertRule(gridRuleM, myRules.cssRules.length);
      myRules.insertRule(sizeRuleM, myRules.cssRules.length);
      document.head.append(styles);     
    },
    condicion(con){
      if (this.pasando.length>0) {
        return alert('No puedes cambiar las condiciones debido a que el juego ya comenzó')
      }
      const btnCondicion=document.getElementById(con);
      if (this.condiciones.includes(con)) {
        if (this.condiciones.length>1) {            
          let i=this.condiciones.indexOf(con);
          this.condiciones.splice(i,1);
          btnCondicion.style.background='linear-gradient(145deg, #d3cbdb, #8d9ed1)'
        }else{
          alert('No puedes eliminar todas las condiciones')
        }
      }else{
        btnCondicion.style.background='linear-gradient(145deg, #086125, #57ce7f)'
        this.condiciones.push(con);
      }
    },
    getRandomRotation() {
      const width = 70; // Ancho en px
      const aspectRatio = 16 / 9;
      const height = Math.round(width * aspectRatio); // Altura calculada
      const maxPosition = 150; // Para que la imagen no se salga
      const top = (Math.random() * maxPosition);
      const left = Math.random() * maxPosition;
      const rotation = Math.floor(Math.random() * 360); // Rotación aleatoria      
      return {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        transform: `rotate(${rotation}deg)`,
        width: `${width}px`,
        height: `${height}px`,
      };
    },
    maximizarCarta: function (carta) {
      this.cartaMaximizada = carta;
      this.verCartaMaximizada = true;
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
        this.condiciones=['llena'];
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
      const condicionesDisponibles = ["llena", "linea", "ambo", "quince"];
      condicionesDisponibles.forEach((condicion) => {
        const btnCondicion = document.getElementById(condicion);
        if (btnCondicion) {
          if (this.condiciones.includes(condicion)) {
            btnCondicion.style.background = "linear-gradient(145deg, #086125, #57ce7f)"; // Activa
          } else {
            btnCondicion.style.background = "linear-gradient(145deg, #d3cbdb, #8d9ed1)"; // Desactiva
          }
        }
      });
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
      if (this.cartas.length < 2) {
        alert("Agrega mas jugadores para empezar a correr la baraja");
      } else {
        if (this.barajas.length != 0) {
          let indiceTotal = this.barajas.length;
          let indice = Math.floor(Math.random() * indiceTotal);
          this.actual = this.barajas[indice];
          this.pasando.push(this.actual);
          this.barajas.splice(indice, 1);
          let ganador={ganador:'',condicion:'',anunciado:false};
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
            if (this.condiciones.includes('llena')) {              
              if (
                !this.cartas[index].carta.some((baraja) => baraja.paso == false)
              ) {
                ganador={jugador:this.cartas[index].jugador,condicion:'llena',anunciado:false}
                this.ganadores.push(ganador);
                let btnCondicion=document.getElementById('llena');
                let i=this.condiciones.indexOf('llena');
                this.condiciones.splice(i,1);
                btnCondicion.style.background='gray';
              }
            }
            if (this.tablaSize===16) {
              
              // Buscar si gano la linea
              if (this.condiciones.includes('linea')) {          
                if (
                  ((this.cartas[index].carta[0].paso&&this.cartas[index].carta[1].paso&&this.cartas[index].carta[2].paso&&this.cartas[index].carta[3].paso)||
                  (this.cartas[index].carta[4].paso&&this.cartas[index].carta[5].paso&&this.cartas[index].carta[6].paso&&this.cartas[index].carta[7].paso)||
                  (this.cartas[index].carta[8].paso&&this.cartas[index].carta[9].paso&&this.cartas[index].carta[10].paso&&this.cartas[index].carta[11].paso)||
                  (this.cartas[index].carta[12].paso&&this.cartas[index].carta[13].paso&&this.cartas[index].carta[14].paso&&this.cartas[index].carta[15].paso))||
                  (
                    (this.cartas[index].carta[0].paso&&this.cartas[index].carta[4].paso&&this.cartas[index].carta[8].paso&&this.cartas[index].carta[12].paso)||
                    (this.cartas[index].carta[1].paso&&this.cartas[index].carta[5].paso&&this.cartas[index].carta[9].paso&&this.cartas[index].carta[13].paso)||
                    (this.cartas[index].carta[2].paso&&this.cartas[index].carta[6].paso&&this.cartas[index].carta[10].paso&&this.cartas[index].carta[14].paso)||
                    (this.cartas[index].carta[3].paso&&this.cartas[index].carta[7].paso&&this.cartas[index].carta[11].paso&&this.cartas[index].carta[15].paso)
                  )||
                  (
                    (this.cartas[index].carta[0].paso&&this.cartas[index].carta[5].paso&&this.cartas[index].carta[10].paso&&this.cartas[index].carta[15].paso)||
                    (this.cartas[index].carta[3].paso&&this.cartas[index].carta[6].paso&&this.cartas[index].carta[9].paso&&this.cartas[index].carta[12].paso)
                  )
                  
                ) {
                  ganador={
                    jugador:this.cartas[index].jugador,
                    condicion:'linea',
                    anunciado:false
                  }
                  this.ganadores.push(ganador);
                  let btnCondicion=document.getElementById('linea');
                  let i=this.condiciones.indexOf('linea');
                  this.condiciones.splice(i,1);
                  btnCondicion.style.background='gray';
                }
              }
              // Buscando si alguien gano la llena
              // Buscando si alguien gano el ambo
              if (this.condiciones.includes('ambo')) {
                if (
                  (this.cartas[index].carta[0].paso && this.cartas[index].carta[1].paso && this.cartas[index].carta[4].paso && this.cartas[index].carta[5].paso)||
                  (this.cartas[index].carta[1].paso && this.cartas[index].carta[2].paso && this.cartas[index].carta[5].paso && this.cartas[index].carta[6].paso)||
                  (this.cartas[index].carta[2].paso&&this.cartas[index].carta[3].paso&&this.cartas[index].carta[6].paso&&this.cartas[index].carta[7].paso)||
                  (this.cartas[index].carta[4].paso&&this.cartas[index].carta[5].paso&&this.cartas[index].carta[8].paso&&this.cartas[index].carta[9].paso)||
                  (this.cartas[index].carta[5].paso&&this.cartas[index].carta[6].paso&&this.cartas[index].carta[9].paso&&this.cartas[index].carta[10].paso)||
                  (this.cartas[index].carta[6].paso&&this.cartas[index].carta[7].paso&&this.cartas[index].carta[10].paso&&this.cartas[index].carta[11].paso)||
                  (this.cartas[index].carta[8].paso&&this.cartas[index].carta[9].paso&&this.cartas[index].carta[12].paso&&this.cartas[index].carta[13].paso)||
                  (this.cartas[index].carta[9].paso&&this.cartas[index].carta[10].paso&&this.cartas[index].carta[13].paso&&this.cartas[index].carta[14].paso)||
                  (this.cartas[index].carta[10].paso&&this.cartas[index].carta[11].paso&&this.cartas[index].carta[14].paso&&this.cartas[index].carta[15].paso)
                ) {
                  ganador={jugador:this.cartas[index].jugador,condicion:'ambo',anunciado:false}
                  this.ganadores.push(ganador);
                  let btnCondicion=document.getElementById('ambo');
                  let i=this.condiciones.indexOf('ambo');
                  this.condiciones.splice(i,1);
                  btnCondicion.style.background='gray';
                }
              }
              // Buscando si alguien gano el quince
              if (this.condiciones.includes('quince')) {
                if (                
                  (this.cartas[index].carta[0].paso&&this.cartas[index].carta[3].paso&&this.cartas[index].carta[12].paso&&this.cartas[index].carta[15].paso)
                ) {
                  ganador={jugador:this.cartas[index].jugador,condicion:'quince',anunciado:false}
                  this.ganadores.push(ganador);
                  let btnCondicion=document.getElementById('quince');
                  let i=this.condiciones.indexOf('quince');
                  this.condiciones.splice(i,1);
                  btnCondicion.style.background='gray';
                }
              }
            }
            if (this.tablaSize===9) {
              
              // Buscar si gano la linea
              if (this.condiciones.includes('linea')) {          
                if (
                  ((this.cartas[index].carta[0].paso&&this.cartas[index].carta[1].paso&&this.cartas[index].carta[2].paso)||
                  (this.cartas[index].carta[3].paso&&this.cartas[index].carta[4].paso&&this.cartas[index].carta[5].paso)||
                  (this.cartas[index].carta[6].paso&&this.cartas[index].carta[7].paso&&this.cartas[index].carta[8].paso))||
                  (
                    (this.cartas[index].carta[0].paso&&this.cartas[index].carta[3].paso&&this.cartas[index].carta[6].paso)||
                    (this.cartas[index].carta[1].paso&&this.cartas[index].carta[4].paso&&this.cartas[index].carta[7].paso)||
                    (this.cartas[index].carta[2].paso&&this.cartas[index].carta[5].paso&&this.cartas[index].carta[8].paso)
                  )||
                  (
                    (this.cartas[index].carta[0].paso&&this.cartas[index].carta[4].paso&&this.cartas[index].carta[8].paso)||
                    (this.cartas[index].carta[6].paso&&this.cartas[index].carta[4].paso&&this.cartas[index].carta[2].paso)
                  )
                  
                ) {
                  ganador={
                    jugador:this.cartas[index].jugador,
                    condicion:'linea',
                    anunciado:false
                  }
                  this.ganadores.push(ganador);
                  let btnCondicion=document.getElementById('linea');
                  let i=this.condiciones.indexOf('linea');
                  this.condiciones.splice(i,1);
                  btnCondicion.style.background='gray';
                }
              }
              // Buscando si alguien gano el ambo
              if (this.condiciones.includes('ambo')) {
                if (
                  (this.cartas[index].carta[0].paso && this.cartas[index].carta[1].paso && this.cartas[index].carta[3].paso && this.cartas[index].carta[4].paso)||
                  (this.cartas[index].carta[1].paso && this.cartas[index].carta[2].paso && this.cartas[index].carta[4].paso && this.cartas[index].carta[5].paso)||
                  (this.cartas[index].carta[3].paso&&this.cartas[index].carta[4].paso&&this.cartas[index].carta[6].paso&&this.cartas[index].carta[7].paso)||
                  (this.cartas[index].carta[4].paso&&this.cartas[index].carta[5].paso&&this.cartas[index].carta[7].paso&&this.cartas[index].carta[8].paso)
                ) {
                  ganador={jugador:this.cartas[index].jugador,condicion:'ambo',anunciado:false}
                  this.ganadores.push(ganador);
                  let btnCondicion=document.getElementById('ambo');
                  let i=this.condiciones.indexOf('ambo');
                  this.condiciones.splice(i,1);
                  btnCondicion.style.background='gray';
                }
              }
              // Buscando si alguien gano el quince
              if (this.condiciones.includes('quince')) {
                if (                
                  (this.cartas[index].carta[0].paso&&this.cartas[index].carta[2].paso&&this.cartas[index].carta[6].paso)||
                  (this.cartas[index].carta[2].paso&&this.cartas[index].carta[6].paso&&this.cartas[index].carta[8].paso)||
                  (this.cartas[index].carta[6].paso&&this.cartas[index].carta[8].paso&&this.cartas[index].carta[0].paso)
                ) {
                  ganador={jugador:this.cartas[index].jugador,condicion:'quince',anunciado:false}
                  this.ganadores.push(ganador);
                  let btnCondicion=document.getElementById('quince');
                  let i=this.condiciones.indexOf('quince');
                  this.condiciones.splice(i,1);
                  btnCondicion.style.background='gray';
                }
              }
            }
          }
        } else {
          console.log("A ver a ver, que paso aqui?");
          console.log(this.barajas.length);
        }
        if (this.ganadores.length > 0) {
          this.ganadores.forEach((ganador) => {         
            if (!ganador.anunciado) {
              console.log(ganador);
              
              alert(`El jugador ${ganador.jugador} ha ganado ${ganador.condicion}`);
              ganador.anunciado=true;
            }
          });
        }
      }
    },
    nuevoJugador: function () {
      let duplicado=false;
      if (this.pasando.length === 0) {
        let jugador = prompt("Introduce el nombre del jugador");
        if (jugador == null || jugador == "") {
          alert("Debes introducir el nombre del jugador");
        } else {
          this.cartas.forEach(element => {
            if (element.jugador===jugador) {
              duplicado=true;
            }
          });
          if (duplicado) {
            return alert('Ya existe un jugador con ese nombre');
          }
          let cartaTemp = {};
          cartaTemp = {
            jugador: jugador,
            carta: [],
          };
          
          for (let index = 0; index < this.tablaSize; index++) {
            let cartaElegida = Math.floor(Math.random() * 54 + 1);
            let rutaBaraja = `img/${cartaElegida}.jpg`;
            if (cartaTemp.carta.some((baraja) => baraja.baraja == rutaBaraja)) {
              index--;
            } else {
              cartaTemp.carta.push({ baraja: rutaBaraja, paso: false });
            }
          }
          
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
