
// var pageCounter = 1;
// var moduleContainer = document.getElementById('module-info');
// var btn = document.getElementById("btn");

// btn.addEventListener("click", function(){
//   var ourRequest = new XMLHttpRequest();
//   ourRequest.open('GET', 'https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/CIS2169-Academic-Management-System/main/module-'+ pageCounter +'.json');
//   ourRequest.onload = function(){
//     //console.log(ourRequest.responseText);
//     var ourData = JSON.parse(ourRequest.responseText);
//     //console.log(ourData[0]);
//     renderHTML(ourData);
//   };
//   ourRequest.send();
// pageCounter++;
// if (pageCounter > 3){
// //btn.classList.add("hide-me");
//   btn.disabled = true;
// }
// });

// function renderHTML(data){
//   var htmlString = "";

//   for(i = 0; i < data.length; i++){
//     htmlString += "<p>" + data[i].Name + " is a " + data[i].Course + " has assessments "; //".</p>";
//     for(ii = 0; ii < data[i].Module.Assignment.length; ii++){
//       if (ii == 0){
//         htmlString += data[i].Module.Assignment[ii];
//       } else {
//         htmlString += " and " + data[i].Module.Assignment[ii];
//       }
//     }
//     htmlString += ' and Learning Outcome ';
//     for(ii = 0; ii < data[i].Module.Learning_outcomes.length; ii++){
//       if (ii == 0){
//         htmlString += data[i].Module.Learning_outcomes[ii];
//       } else {
//         htmlString += " and " + data[i].Module.Learning_outcomes[ii];
//       }
//     }

//     htmlString += ' and Volume ';
//     for(ii = 0; ii < data[i].Module.Volume.length; ii++){
//       if (ii == 0){
//         htmlString += data[i].Module.Volume[ii];
//       } else {
//         htmlString += " and " + data[i].Module.Volume[ii];
//       }
//     }

//     htmlString += ' and weights ';
//     for(ii = 0; ii < data[i].Module.weights.length; ii++){
//       if (ii == 0){
//         htmlString += data[i].Module.weights[ii];
//       } else {
//         htmlString += " and " + data[i].Module.weights[ii];
//       }
//     }
//     htmlString += '.</p>';
//   }
//   moduleContainer.insertAdjacentHTML('beforeend', htmlString);

// }

// new js //
const form = document.querySelector('#ModuleCreator');
const create_module = document.querySelector('#create_module');
const moduleList = document.querySelector('#module_list');
let selectedProgramme = "under-graduate";
let idCounter = 1;

create_module.addEventListener('click', event => {
  event.preventDefault();
  const data = {
    id: idCounter++,
    module_id: document.querySelector('#module_id').value,
    module_title: document.querySelector('#module_title').value,
    module_hours: document.querySelector('#module_hours').value,
    module_outcomes: [document.querySelector('#module_objective1').value,
                      document.querySelector('#module_objective2').value,
                      document.querySelector('#module_objective3').value],
    module_credits: document.querySelector('#module_credits').value
  };

  fetch(`http://localhost:3000/${selectedProgramme}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Success:", data);
    moduleList.innerHTML += `<li>${data.module_title}</li>`;
  })
  .catch(error => {
    console.error("Error:", error);
  });
});

const fetch_module = document.getElementById('fetch_button');

fetch_module.addEventListener('click', () => {
  fetch(`http://localhost:3000/${selectedProgramme}`)
    .then(response => response.json())
    .then(modules => {
      moduleList.innerHTML = '';
      
      modules.forEach(module => {
        const li = document.createElement('li');
        li.textContent = module.module_title;
        moduleList.appendChild(li);
      });
    })
    .catch(error => console.error(error));
});

const programmeSelect = document.querySelector('#programme_select');

programmeSelect.addEventListener('change', () => {
  selectedProgramme = programmeSelect.value;
  fetch_module.click();
});

