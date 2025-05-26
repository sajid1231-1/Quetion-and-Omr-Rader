function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
showTime();
setInterval(function () {
	showTime();
}, 1000);let questionCounter = 0;

document.getElementById("question-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const questionText = document.getElementById("new-question").value;
  const options = document.querySelectorAll(".option");

  const questionHTML = document.createElement("div");
  questionHTML.className = "question";
  questionHTML.innerHTML = `<p>${questionCounter + 1}. ${questionText}</p>`;

  const name = `q${questionCounter + 1}`;
  ['A', 'B', 'C', 'D'].forEach((label, index) => {
    const optionValue = options[index].value;
    const input = document.createElement("label");
    input.innerHTML = `
      <input type="radio" name="${name}" value="${label}" />
      ${label}) ${optionValue}
    `;
    questionHTML.appendChild(input);
    questionHTML.appendChild(document.createElement("br"));
  });

  document.getElementById("question-list").appendChild(questionHTML);
  questionCounter++;

  // Reset input fields
  document.getElementById("new-question").value = "";
  options.forEach(opt => (opt.value = ""));
});

document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let resultHTML = "<h3>Your Answers:</h3><ul>";
  for (let i = 1; i <= questionCounter; i++) {
    const answer = document.querySelector(`input[name="q${i}"]:checked`)?.value;
    resultHTML += `<li>Q${i}: ${answer || "Not answered"}</li>`;
  }
  resultHTML += "</ul>";

  document.getElementById("result").innerHTML = resultHTML;
});
