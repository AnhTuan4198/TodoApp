
var Tasklist = [],
  id = 0;
// Get date and show date    
    const dateElement = document.getElementById("Date");
    let option = { weekday: "long", month: "short", day: "numeric" };
    let today = new Date();
    dateElement.innerHTML = today.toLocaleDateString("en-US", option);
// End get date and show date section

//Create global variable
var list =document.getElementById('Task-list'),
    Input=document.getElementById('input'),
    addButton=document.querySelector('.Add-button'),
    clearButton=document.getElementById('Clear');
// End create global variable

// Function clear all Tasklist
clearButton.addEventListener('click',function(){
        Tasklist.splice(0,Tasklist.length);
        listItem = document.querySelectorAll(".item");
        console.log(listItem)
        listItem.forEach(val=> val.parentNode.removeChild(val));
        id=0;
        localStorage.setItem("TODO", JSON.stringify(Tasklist));// Update local store
        //console.log(listItem);
})
// end Function clear 

//function add new task to Tasklist and append to web app
function addTodo(task,id,completed,deleted){
    if(deleted===true) return;
    const item = `<li class='item' id='${id}'>
        <div class='check' job='complete' id='${id}'></div>
        <p class='text'>${task}</p>
		<i class="fa fa-trash-o bin" aria-hidden="true" job='delete' id='${id}'></i>
    </li>`;
    const position='beforeend';
    list.insertAdjacentHTML(position, item);
}
//End add function

//Working with local store
let data = localStorage.getItem("TODO");// get task from local store
if (data) {
  Tasklist = JSON.parse(data);
  id = Tasklist.length;
  loadList(Tasklist);
} else {
  Tasklist = [];
  id = 0;
}

function loadList(data) {
  data.forEach(function(item) {
    addTodo(item.task, item.id, item.completed, item.deleted);
  });
}
//End working with local store

// handle new task input
addButton.addEventListener('click',function(){
        if(Input.value===''){
            return;
        }
        let newTask={
            task:Input.value,
            id:id,
            completed:false,
            deleted:false,
            clear:false
        }
        Tasklist.push(newTask);
        addTodo(Input.value,id,false,false);
        id++;
        localStorage.setItem("TODO",JSON.stringify(Tasklist));
        console.log(localStorage.setItem("TODO", JSON.stringify(Tasklist)));
        Input.value='';
})
// end hadnling with input

//  action with complete task and remove task
    function completeTask(ele){
        ele.classList.toggle('checked');
        ele.parentNode.querySelector('.text').classList.toggle('completed')
        Tasklist[ele.id].completed = Tasklist[ele.id].completed ? false : true;
    }
    function removeTask(ele){
        Tasklist[ele.id].deleted = true;
        ele.parentNode.parentNode.removeChild(ele.parentNode);
    }

    list.addEventListener('click',function(event){
        const element=event.target;
        // below this line checked with option user choose complete or remove
        if(element.attributes.job.value =='complete'){
            completeTask(element);
        }else if (element.attributes.job.value == "delete") {
            removeTask(element);
        }
        localStorage.setItem("TODO", JSON.stringify(Tasklist));
    })
// End complete and remove task 
