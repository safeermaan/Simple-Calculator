(function () {
  let screen = document.querySelector(".screen");
  let clear = document.querySelector(".btn-clear");
  let equal = document.querySelector(".btn-equal");
  let backspace = document.querySelector(".btn-backspace");
  let casioButton = document.querySelector(".btn-casio");
  let backslashButton = document.querySelector(".btn-backslash");
  let forwardslashButton = document.querySelector(".btn-forwardslash");

  let expression = "";

  function handleButtonClick(e) {
    let value = e.target.dataset.num;
    if (value === "backspace") {
      expression = expression.slice(0, -1);
      screen.textContent = expression; // Update screen immediately
    } else if (value === "casio") {
      expression = "";
      screen.textContent = "CASIO";
      setTimeout(() => {
        screen.textContent = "";
      }, 1000);
    } else if (value === "backslash" || value === "forwardslash") {
      if (expression.endsWith("Made by Safeer Maan")) {
        // Ignore consecutive slashes
      } else {
        expression = "";
        screen.textContent = "Made by Safeer Maan";
        setTimeout(() => {
          screen.textContent = "";
        }, 1000);
      }
    } else {
      expression += value;
      screen.textContent = expression;
    }
  }

  document.querySelectorAll(".btn").forEach(function (button) {
    button.addEventListener("click", handleButtonClick);
  });

  clear.addEventListener("click", function (e) {
    expression = "";
    screen.textContent = "";
  });

  equal.addEventListener("click", function (e) {
    try {
      if (expression === "") {
        throw new Error("Please Enter");
      }
      let result = calculateExpression(expression);
      screen.textContent = result;
      expression = result.toString();
    } catch (error) {
      screen.textContent = "Error";
      expression = "";
    }
  });

  function calculateExpression(expression) {
    let sanitizedExpression = expression.replace(/[^0-9+\-*/.]/g, "");
    return eval(sanitizedExpression);
  }
})();
