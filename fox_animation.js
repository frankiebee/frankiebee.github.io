 var Vivus = require('vivus')
  // $(document).ready(function (){
    // trackMouse();
document.addEventListener("DOMContentLoaded", function(event) {
  //do work

    var test = document.getElementById("fox")
    // test = Pathformer(test)

    new Vivus(test, {duration: 200}, ()=> console.log('bloop'));
    console.log(test, 'why');
});
  // })

  // function trackMouse() {
  //   $('svg').on ('click', function(event){
  //     console.log(`X: ${event.clientX} Y: ${event.clientY}`);
  //   })
  // }


