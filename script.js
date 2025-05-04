"use strict";
const inpField = document.getElementById("inp-field");
const buttons = document.querySelectorAll("li");
const fullScreen = document.getElementById("full-screen");
const calculator = document.querySelector(".bg-black");
const buttonFull = document.querySelectorAll(".transition-all");
const topHead = document.querySelector(".top-head");
const liRow = document.querySelector(".li-row");
const liCol = document.querySelectorAll(".li-col");
const historyIcon = document.getElementById("history");
const historySec = document.querySelector(".history-sec");
inpField.value = "0";
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        var _a;
        let value = (_a = button.textContent) === null || _a === void 0 ? void 0 : _a.trim();
        inpField.focus();
        if (value == "C") {
            inpField.value = "0";
        }
        else if (value == "CE") {
            inpField.value = inpField.value.slice(0, -1) || "0";
        }
        else if (value == "=") {
            try {
                if (inpField.value == "" || inpField.value == " ") {
                    inpField.value = "0";
                }
                let expression = inpField.value.replace(/%/g, "*0.01");
                while (/[+\-*/.]$/.test(expression)) {
                    expression = expression.slice(0, -1);
                }
                inpField.value = eval(expression);
            }
            catch (_b) {
                inpField.value = "error";
            }
        }
        else if (value == ".") {
            inpField.value += ".";
        }
        else if (value == "Ran") {
            if (inpField.value === "0") {
                inpField.value = Math.floor(Math.random() * 10).toString();
            }
            else {
                inpField.value += Math.floor(Math.random() * 10);
            }
        }
        else if (value == "0" && inpField.value !== "0") {
            inpField.value += value;
        }
        else if (["+", "-", "X", "/"].includes(value)) {
            const lastChar = inpField.value[inpField.value.length - 1];
            const isLastCharOperator = ["+", "-", "*", "/"].includes(lastChar);
            const operator = value === "X" ? "*" : value;
            if (isLastCharOperator) {
                inpField.value = inpField.value.slice(0, -1) + operator;
            }
            else {
                inpField.value += operator;
            }
        }
        else {
            if (inpField.value === "0") {
                inpField.value = value;
            }
            else {
                inpField.value += value;
            }
        }
        console.log(value);
    });
});
inpField.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key == "Enter" || key == "=") {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        try {
            if (inpField.value.trim() === "") {
                inpField.value = "0";
            }
            let expression = inpField.value.replace(/%/g, "*0.01");
            while (/[+\-*/.]$/.test(expression)) {
                expression = expression.slice(0, -1);
            }
            inpField.value = eval(expression).toString();
        }
        catch (_a) {
            inpField.value = "error";
        }
    }
    else if (key === "Escape") {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        inpField.value = "0";
    }
    else if (/^[a-zA-Z]$/.test(key)) {
        e.preventDefault();
    }
    else if (key === "Tab" || key === " ") {
        e === null || e === void 0 ? void 0 : e.preventDefault();
    }
    else if (/^[0-9]$/.test(key)) {
        if (inpField.value === "0") {
            e.preventDefault();
            inpField.value = key;
        }
    }
    else if (key === "Backspace") {
        e.preventDefault();
        if (inpField.value.length <= 1) {
            inpField.value = "0";
        }
        else {
            inpField.value = inpField.value.slice(0, -1);
        }
    }
    else if (["+", "-", "*", "/"].includes(key)) {
        const lastChar = inpField.value.slice(-1);
        if (["+", "-", "*", "/"].includes(lastChar)) {
            e.preventDefault(); // Prevent adding another operator
            inpField.value = inpField.value.slice(0, -1) + key; // Replace last operator
        }
    }
    console.log(e.key);
});
fullScreen === null || fullScreen === void 0 ? void 0 : fullScreen.addEventListener("mouseover", (e) => {
    calculator === null || calculator === void 0 ? void 0 : calculator.classList.toggle("lg:w-screen");
    calculator === null || calculator === void 0 ? void 0 : calculator.classList.toggle("h-screen");
    calculator === null || calculator === void 0 ? void 0 : calculator.classList.toggle("text-5xl");
    calculator === null || calculator === void 0 ? void 0 : calculator.classList.toggle("rounded-none");
    buttonFull.forEach((button) => {
        button.classList.toggle("lg:w-64");
        button.classList.toggle("h-20");
    });
    liRow === null || liRow === void 0 ? void 0 : liRow.classList.toggle("gap-2");
    liCol.forEach((button) => {
        button.classList.toggle("gap-2");
    });
    topHead === null || topHead === void 0 ? void 0 : topHead.classList.toggle("w-[66rem]");
    inpField === null || inpField === void 0 ? void 0 : inpField.classList.toggle("w-[66rem]");
    inpField === null || inpField === void 0 ? void 0 : inpField.classList.toggle("text-[5rem]");
});
historyIcon === null || historyIcon === void 0 ? void 0 : historyIcon.addEventListener('click', (e) => {
    if (historySec === null || historySec === void 0 ? void 0 : historySec.classList.contains("hidden")) {
        historySec === null || historySec === void 0 ? void 0 : historySec.classList.remove("hidden");
    }
    else {
        historySec === null || historySec === void 0 ? void 0 : historySec.classList.add("hidden");
    }
});
