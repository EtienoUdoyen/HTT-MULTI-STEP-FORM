const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.getElementById("progress");
const stepCount = document.getElementById("step-count");

let currentStep = 0;

function updateForm() {
    steps.forEach((step, index) => {
        step.classList.toggle("hidden", index !== currentStep);
    step.classList.toggle("active", index === currentStep);
});

//update progress bar width
let percent = ((currentStep + 1) / steps.length) * 100;
progress.style.width = percent + "%";

//update step counter text
stepCount.textContent = `step ${currentStep + 1} of ${steps.length}`;
}


function validateStep(stepIndex) {
    const inputs = 
    steps[stepIndex].querySelectorAll("input[required]");
    let valid = true;

    inputs.forEach((input) => {
        const errorMsg = 
        input.nextElementSibling; // <p class = "error">

        if (!input.value.trim()) {
            input.classList.add("border-red-500", 
                "focus:ring-red-400");
                if (errorMsg)
                    errorMsg.classList.remove("hidden")
                valid = false;
        } else {

           input.classList.remove("border-red-500", "focus:ring-red-400");
   input.classList.add("border-gray-300", "focus:ring-blue-400"); 
   if (errorMsg)
                    errorMsg.classList.add("hidden")
        }
    });

    return valid;
}

// Real-time validation
document.querySelectorAll("input[required]").forEach((input) => {
    input.addEventListener("input", () => {
        const errorMsg = 
        input.nextElementSibling;

        if (input.value.trim()) {

input.classList.remove("border-red-500", "focus:ring-red-400");

input.classList.add("border-gray-300", "focus:ring-blue-400");
if (errorMsg)
    errorMsg.classList.add("hidden");
 }
    });
});

nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (validateStep(currentStep)) {
        if (currentStep < steps.length - 1) {
           currentStep++;
        updateForm();
        } 
        } else {
          alert("Please fill in all required fields.");       
}
});
});

prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            updateForm();
        }
    });
});

document.getElementById("multiStepForm").addEventListener("submit", (e) => {
    if (!validateStep(currentStep)) {
       e.preventDefault();
       alert("Please complete all required fields."); 
       return;
    }
    e.preventDefault();
    alert("🎉Form submitted successfully!");
});

updateForm(); //Initialize

