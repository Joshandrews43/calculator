$(document).ready(function() {

}); //end of document ready.

var current = "";
var hist = "";

function buttonPressed(button) {
  //resets history if user starts independent calculation after last calculation has executed.
  if(hist === $("#numbers").text() && !isNaN(button)){
    hist = "";
  }

  //for clear, decimal, and operators. 
  if (isNaN(button)) {
    if(button === "AC") {
      hist = "";
      current = "";
      $("#numbers").text("0");
    }
    else if(button === ".") {
      if(!current.includes(".")) {
        current += ".";
      }
    }
    else if(button === "CE"){
      current = "";
      $("#numbers").text("0");
    }
    else if (button === "="){
      calculate(hist);
    }
    //adds operators
    else{
      if(button === "*" || button === "/" || button === "+" || button === "-"){
        if(hist.includes("*") || hist.includes("-") || hist.includes("+") || hist.includes("/")){
          calculate(hist);
        }
        if(!isNaN(hist[hist.length - 1])){
          hist += button;
        }

        current = "";
      }
    }
  }
  //add numbers together
  else {
    if (!(button === "0" && $("#numbers").text() === "0")){
      current += button;
    }
    if(current.length > 9){
      current = current.substring(0, 9);
    }
  }
  if(current != ""){
    $("#numbers").text(current); 
  }
}

function calculate(equation){
  if(hist !== ""){
    hist = String(eval(equation));
  }

  if(hist.length > 9 && Number(hist) < 1 && Number(hist) > .00000001){
    hist = hist.substring(0, 9);
  }
  else if (hist.length > 9 && Number(hist) < .000000001){
    hist = Number(hist).toExponential(2);
  }
  else if(hist.length > 9 && Number(hist) < .00000001){
    hist = Number(hist).toExponential(3);
  }
  else if(hist.length > 10 && Number(hist) >= 10000000000){
    hist = Number(hist).toExponential(3);
  }
  else if(hist.length > 9 && Number(hist) >= 1000000000){
    hist = Number(hist).toExponential(4);
  }
  $("#numbers").text(String(hist));
}


$(".button").click(function() {
  var entry = $(this).attr("value");
  if(entry !== "CE" && entry !== "AC" && isNaN(entry) && entry !== "."){
    hist += current;
    current = "";
  }
  buttonPressed(entry);
  console.log("history: " + hist);
  console.log("current: " + current);
});
