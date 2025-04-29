const inpField = document.getElementById("inp-field") as HTMLInputElement;
const buttons = document.querySelectorAll("li");
inpField.value = "0";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.textContent?.trim();
    inpField.focus();
    if (value == "C") {
      inpField.value = "0";
    } else if (value == "CE") {
      inpField.value = inpField.value.slice(0, -1) || "0";
    } else if (value == "=") {
      try {
        if (inpField.value == "" || inpField.value == " ") {
          inpField.value = "0";
        }
        let expression = inpField.value.replace(/%/g, "*0.01");
        inpField.value = eval(expression);
      } catch {
        inpField.value = "error";
      }
    } else if (value == "X") {
      inpField.value += "*";
    } else if (value == "/") {
      inpField.value += "/";
    } else if (value == "+") {
      inpField.value += "+";
    } else if (value == "-") {
      inpField.value += "-";
    } else if (value == ".") {
      inpField.value += ".";
    } else if (value == "Ran") {
      inpField.value += Math.floor(Math.random() * 10);
    } else if (value == "0" && inpField.value !== "0") {
      inpField.value += value;
    } else {
      if (inpField.value === "0") {
        inpField.value = value!;
      } else {
        inpField.value += value;
      }
    }

    console.log(value);
  });
});

inpField.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key == "Enter") {
    e?.preventDefault();
    try {
      if (inpField.value.trim() === "") {
        inpField.value = "0";
      }
      let expression = inpField.value.replace(/%/g, "*0.01");
      inpField.value = eval(expression).toString();
    } catch {
      inpField.value = "error";
    }
  } else if (key === "Escape") {
    e?.preventDefault();
    inpField.value = "0";
  } else if (/^[a-zA-Z]$/.test(key)) {
    e.preventDefault();
  } else if (key === "Tab" || key === " ") {
    e?.preventDefault();
  } else if (/^[0-9]$/.test(key)) {
    if (inpField.value === "0") {
      e.preventDefault();
      inpField.value = key;
    }
  }
});
