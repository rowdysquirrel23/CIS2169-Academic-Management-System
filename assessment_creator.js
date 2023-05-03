// call names from HTML
const form = document.querySelector('.assessment_creator');
const create_assessment = document.querySelector('#create_assessment');
const assessment_list = document.querySelector('#assessment_list');
let id_counter = 1;
// give each assessment a unique ID so multiple can be stored
fetch(`http://localhost:3000/Assessments`)
  .then(response => response.json())
  .then(assessments => { // ensures next id is unique
    id_counter = Math.max(...assessments.map(assessment => assessment.id)) + 1;
  })
  .catch(error => console.error(error));
// creates an array of objects when clicked
create_assessment.addEventListener('click', event => {
  event.preventDefault();
  const assessment_attributes = {
    id: id_counter++, // increments the id 
    assessment_id: document.querySelector('#assessment_id').value,
    assessment_title: document.querySelector('#assessment_title').value,
    assessment_volume: document.querySelector('#assessment_volume').value,
    // creates an array from all of the assessments learning objectives
    assessment_outcomes: Array.from(document.querySelectorAll('#assessment_objectives input')).map(input => input.value),
    weighting: document.querySelector('#weighting').value,
    Module_List: document.querySelector('#add_module').value
  };
// Posts the data to the assessments section of the Json server
  fetch(`http://localhost:3000/Assessments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(assessment_attributes)
  })// logs if it has works
  .then(response => response.json())
  .then(assessment_attributes => {
    console.log("Success:", assessment_attributes);
    assessment_list.innerHTML += `<li>${assessment_attributes.assessment_title}</li>`;
  })
  .catch(error => { //displays error if fails
    console.error("Error:", error);
  });
});

const fetch_assessment = document.getElementById('fetch_button');
//calls the data from the json-server to be displayed on page
fetch_assessment.addEventListener('click', event => {
  event.preventDefault();
  fetch(`http://localhost:3000/Assessments`)
    .then(response => response.json())
    .then(assessments => {
      assessment_list.innerHTML = '';
      assessments.forEach(assessment => { //loops through each assessment
        const li = document.createElement('li'); // displays the data on screen in a string
        li.textContent = `Assessment ID: ${assessment.assessment_id}, Title: ${assessment.assessment_title}, Volume: ${assessment.assessment_volume}, Outcomes: ${assessment.assessment_outcomes}, Weighting: ${assessment.weighting}, Module List: ${assessment.Module_List}`;
        assessment_list.appendChild(li);
      });
    })
    .catch(error => console.error(error));
});


