const inpField = document.getElementById("inp-field") as HTMLInputElement;
const buttons = document.querySelectorAll("li");
const fullScreen = document.getElementById("full-screen");
const calculator = document.querySelector(".bg-black");
const buttonFull = document.querySelectorAll(".transition-all");
const topHead = document.querySelector(".top-head");
const liRow = document.querySelector(".li-row");
const liCol = document.querySelectorAll(".li-col");
const historyIcon = document.getElementById("history");
const historySec = document.querySelector(".history-sec")
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
    } else if (value == ".") {
      inpField.value += ".";
    } else if (value == "Ran") {
      if(inpField.value === "0"){
        inpField.value = Math.floor(Math.random() * 10).toString();
      } else {
        inpField.value += Math.floor(Math.random() * 10);
      }
    } else if (value == "0" && inpField.value !== "0") {
      inpField.value += value;
    } 
    else if (["+", "-", "X", "/"].includes(value!)) {
      const lastChar = inpField.value[inpField.value.length - 1];
      const isLastCharOperator = ["+", "-", "*", "/"].includes(lastChar);
      const operator = value === "X" ? "*" : value;
      if (isLastCharOperator) {
        inpField.value = inpField.value.slice(0, -1) + operator;
      } else {
        inpField.value += operator;
      }
    }
    else {
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
  if (key == "Enter" || key == "=") {
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
  } else if (key === "Backspace") {
    e.preventDefault();
    if (inpField.value.length <= 1) {
      inpField.value = "0";
    } else {
      inpField.value = inpField.value.slice(0, -1);
    }
  } else if (["+", "-", "*", "/"].includes(key)) {
    const lastChar = inpField.value.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
      e.preventDefault(); // Prevent adding another operator
      inpField.value = inpField.value.slice(0, -1) + key; // Replace last operator
    }
  }

  console.log(e.key);
});

fullScreen?.addEventListener("mouseover", (e) => {
  calculator?.classList.toggle("lg:w-screen");
  calculator?.classList.toggle("h-screen");
  calculator?.classList.toggle("text-5xl");
  calculator?.classList.toggle("rounded-none");

  buttonFull.forEach((button) => {
    button.classList.toggle("lg:w-64");
    button.classList.toggle("h-20");
  });
  liRow?.classList.toggle("gap-2");
  liCol.forEach((button) => {
    button.classList.toggle("gap-2");
  });
  topHead?.classList.toggle("w-[66rem]");
  inpField?.classList.toggle("w-[66rem]");
  inpField?.classList.toggle("text-[5rem]");
});

historyIcon?.addEventListener('click', (e) => {
    if(historySec?.classList.contains("hidden")){
      historySec?.classList.remove("hidden");
    }else {
      historySec?.classList.add("hidden");
    }


})