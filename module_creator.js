
//call names fromHtml //
const form = document.querySelector('#ModuleCreator');
const create_module = document.querySelector('#create_module');
const moduleList = document.querySelector('#module_list');
let id_Count = 1;
//access the data from the jsonServer
//for each module, give it a unique ID that increments by 1
fetch(`http://localhost:3000/Modules`)
  .then(response => response.json())
  .then(modules => {
    id_Count = Math.max(...modules.map(module => module.id)) + 1;
  })
  .catch(error => console.error(error));
// create an array of objects for the attributed needed for each module
create_module.addEventListener('click', event => {
  event.preventDefault();
  const module_attributes = {
    id: id_Count++, //an id is needed to store multiple modules
    module_id: document.querySelector('#module_id').value,
    module_title: document.querySelector('#module_title').value,
    degree_programme: document.querySelector('#degree_programme').value,
    module_hours: document.querySelector('#module_hours').value, 
    // stores an embedded array
    module_outcomes: [document.querySelector('#module_objective1').value,
                      document.querySelector('#module_objective2').value,
                      document.querySelector('#module_objective3').value],
    module_credits: document.querySelector('#module_credits').value
  };
//posts the user input to the Json Server 
  fetch(`http://localhost:3000/Modules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(module_attributes)
  })
  .then(response => response.json())
  .then(module_attributes => {
    console.log("Success:", module_attributes);
    moduleList.innerHTML += `<li>${module_attributes.module_title}</li>`;
  })
  .catch(error => { // catch any errors
    console.error("Error:", error);
  });
});

const fetch_module = document.getElementById('fetch_button');// button to display the info
//call the data from the json server
fetch_module.addEventListener('click', () => {
  fetch(`http://localhost:3000/Modules`)
    .then(response => response.json())
    .then(modules => {
      moduleList.innerHTML = '';
      //creates a list of the attributes for each module
      modules.forEach(module => {
        const li = document.createElement('li'); // all information is displayed
        li.textContent = `Module ID: ${module.module_id}, Title: ${module.module_title}, Outcomes: ${module.module_outcomes}, Credits: ${module.module_credits}`;
        moduleList.appendChild(li);
      });
    }) // catch any errors
    .catch(error => console.error(error));
});

