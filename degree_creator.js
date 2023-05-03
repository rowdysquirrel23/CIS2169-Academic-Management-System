// calls from HTML
const form = document.querySelector('.degree_creator');
const create_degree = document.querySelector('#create_degree');
const degree_list = document.querySelector('#module_list');
let id_count = 1;
// creates a unique id to store data in the json server
fetch(`http://localhost:3000/Degree-programmes`)
  .then(response => response.json())
  .then(degrees => {
    id_count = Math.max(...degrees.map(degree => degree.id)) + 1; // ensures all ids created are unique 
  })
  .catch(error => console.error(error));
// on click, creates an array of objects
create_degree.addEventListener('click', event => {
  event.preventDefault();
  const degree_attributes = { // all of the attributes for the degree
    id: id_count++, // unique id
    degree_id: document.querySelector('#degree_id').value,
    degree_title: document.querySelector('#degree_title').value,
    // a dynamic array of modules assigned to the degrees
    Module_list: Array.from(document.querySelectorAll('input[name="module_list[]"]')).map(input => input.value),
    exit_awards: document.querySelector('#exit_awards').value,
    // an array of learning objectives for the degree
    degree_outcomes: Array.from(document.querySelectorAll('#degree_objectives input')).map(input => input.value),
    academic: document.querySelector('#academic').value
  };
// Posts the data to the degree section of the Json server
  fetch(`http://localhost:3000/Degree-programmes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(degree_attributes)
  }) // check if it is successfull
  .then(response => response.json())
  .then(degree_attributes => {
    console.log("Success:", degree_attributes);
    degree_list.innerHTML += `<li>${degree_attributes.degree_title}</li>`;
  }) //displays if there is an error
  .catch(error => {
    console.error("Error:", error);
  });
});

// dynamically assign modules to the degree programme 
const add_module_button = document.getElementById('add_module');
// when clicked, the module is created an applied to an array
add_module_button.addEventListener('click', () => {
  const module_list = document.querySelector('#modules');
  const li = document.createElement('li');
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'modules_list[]'; // an array of modules added
  li.appendChild(input);
  module_list.appendChild(li);
});
// fetches the degrees stored in the json server
const fetch_degree = document.getElementById('fetch_button');
const list_degrees = document.getElementById('degree_list');
// when clicked, the information stored is displayed
fetch_degree.addEventListener('click', () => {
  fetch(`http://localhost:3000/Degree-programmes`)
    .then(response => response.json())
    .then(degrees => {
      list_degrees.innerHTML = '';
      
      degrees.forEach(degree => { // loops through each degree programme and outputs the attributes
        const li = document.createElement('li'); // displays them as a string
        li.textContent = `Degree ID: ${degree.degree_id}, Title: ${degree.degree_title}, Module List: ${degree.Module_list}, Exit Awards: ${degree.exit_awards}, Learning Outcomes: ${degree.degree_outcomes}, Lead Academic: ${degree.academic}`;
        list_degrees.appendChild(li);
      });
    }) // catches any errors
    .catch(error => console.error(error));
});