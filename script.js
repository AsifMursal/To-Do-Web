displayTodos();
displayCompletedTasks();
let taskinput= document.getElementById('taskinput');
let addbtn= document.getElementById('add');
addbtn.addEventListener("click",function(){
   
   taskinputval=taskinput.value;
   let webtask= localStorage.getItem("localtask");
   if(webtask== null){
      taskobj = [];
   }
else{
   taskobj=JSON.parse(webtask);
}
taskobj.push(taskinputval);
localStorage.setItem("localtask",JSON.stringify(taskobj));
displayTodos();
  

})

function displayTodos(){
   let webtask= localStorage.getItem("localtask");
   if(webtask== null){
      taskobj = [];
   }
else{
   taskobj=JSON.parse(webtask);
}
let html='';
let table=document.getElementById("taskTable");
taskobj.forEach((item,index)=>{
html+=` <tr>
<th>${index+1}</th>

<td class="task-name">${item}</td>
<td><button onclick="edit(${index});" id="edit">Edit</button></td>
<td><button type="button" onclick="deleteitem(${index})" >Mark completed</button></td>
</tr>`;

});
table.innerHTML=html;
}

function edit(index){
   let saveindex = document.getElementById("saveindex");
   let addtaskbtn = document.getElementById("add");
   let savetaskbtn = document.getElementById("save");
   saveindex.value = index;
   let webtask = localStorage.getItem("localtask");
   let taskObj = JSON.parse(webtask); 
   
   taskinput.value = taskObj[index];
   addtaskbtn.style.display="none";
   savetaskbtn.style.display="inline-block";
}

let savetaskbtn = document.getElementById("save");
savetaskbtn.addEventListener("click", function(){
    let addtaskbtn = document.getElementById("add");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    let saveindex = document.getElementById("saveindex").value;
    taskObj[saveindex]=taskinput.value;
    localStorage.setItem("localtask",JSON.stringify(taskObj));
    
})

function deleteitem(index){
   let webtask = localStorage.getItem("localtask");
   let taskObj = JSON.parse(webtask);
   let deletedTask=taskObj[index];
  
   taskObj.splice(index, 1);
   
   localStorage.setItem("localtask", JSON.stringify(taskObj));
   let completetask= localStorage.getItem("completetask");
   if(completetask== null){
      task1 = [];
   }
else{
   task1=JSON.parse(completetask);
}
task1.push(deletedTask);
localStorage.setItem("completetask",JSON.stringify(task1));
   displayCompletedTasks();
   displayTodos();
}

function displayCompletedTasks(){
   let webtask= localStorage.getItem("completetask");
   if(webtask== null){
      taskobj = [];
   }
else{
   taskobj=JSON.parse(webtask);
}
let html='';
let table=document.getElementById("completedtasks");
taskobj.forEach((item,index)=>{
html+=` <tr>
<th>${index+1}</th>

<td class="task-name">${item}</td>

</tr>`;

});
table.innerHTML=html;
}

reset=document.getElementById("reset");
reset.addEventListener("click",function(){

localStorage.clear();
displayTodos();
displayCompletedTasks();

})