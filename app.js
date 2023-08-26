const workoutsSection = document.querySelector("#workouts");
const openModalBtn = document.getElementById("addNew");
const modal = document.querySelector(".modal");
const form = document.querySelector(".form");
let title = document.getElementById("title");
let date = document.getElementById("date");
let calories = document.getElementById("calories");
let distance = document.getElementById("distance");
let description = document.getElementById("description");
const closeBtn = document.querySelector(".close-btn");
const msg = document.querySelector(".msg");
let workoutMap = "";
let workoutData = [];
let id;

const API_BASE = "http://localhost:8080/workouts";

document.addEventListener("DOMContentLoaded", function () {
    loadData()
})

async function loadData() {
    try {
        fetch(API_BASE)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                workoutData = data
                loadWorkouts(workoutData)
            })
    } catch {
        alert("error")
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    saveWorkout(id);
    if (title.value == "") {
        msg.classList.add("active")
    }
    else {
        msg.classList.remove("active")
        modal.classList.remove("active")
        resetForm();
    }
})

let resetForm = () => {
    title.value = "";
    date.value = "";
    calories.value = "";
    distance.value = "";
    description.value = "";
}

function loadWorkouts(data) {
    workoutMap = "";
    for (let i = 0; i < data.length; i++) {
        workoutMap += `<div id="workout">
        <b><span>${data[i].id}</span>. <span>${data[i].title}</span></b>
        <p><i class="fa-regular fa-calendar"></i> <span>${data[i].date}</span></p>
        <p> <i class="fa-solid fa-fire"></i> <span>${data[i].calories}</span> cal.</p>
        <p> <i class="fa-solid fa-route"></i> <span>${data[i].distance}</span> mi.</p>
        <p><i class="fa-regular fa-file-lines"></i> <span>${data[i].description}</span></p>
        <span class="options">
            <i class="fa-solid fa-pen-to-square edit-btn"></i>
            <i class="fa-solid fa-trash delete-btn"></i>
        </span>
    </div>`
    }
    workoutsSection.innerHTML = workoutMap;

    const editBtn = document.querySelectorAll(".edit-btn");
    editBtn.forEach(btn => {
        btn.addEventListener("click", e => {
            id = e.target.parentElement.parentElement.children[0].children[0].textContent;
            console.log(id);
            editHandler(e, id);
        })
    })

    const deleteBtn = document.querySelectorAll(".delete-btn");
    deleteBtn.forEach(btn => {
        btn.addEventListener("click", e => {
            id = e.target.parentElement.parentElement.children[0].children[0].textContent;
            console.log(id);
            deleteWorkout(e, id);
        })
    })
}

function deleteWorkout(e, id) {
    fetch(API_BASE + '/' + id, {
        method: 'DELETE',
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            console.log(data);
            // alert('Workout deleted!');
            refreshCollection();
        })
        .catch((err) => {
            console.error(err);
            alert('Could not delete workout!');
        });
    refreshCollection();
}

function editHandler(e, id) {
    modal.classList.add("active")
    console.log(id)
    fetch(API_BASE + '/' + id)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            title.value = data.title;
            date.value = data.date;
            calories.value = data.calories;
            distance.value = data.distance;
            description.value = data.description;
        })
}

let newWorkout = {};

function saveWorkout(id) {
    newWorkout['id'] = id;
    newWorkout['title'] = title.value;
    newWorkout['date'] = date.value;
    newWorkout['calories'] = calories.value;
    newWorkout['distance'] = distance.value;
    newWorkout['description'] = description.value;

    console.log(newWorkout.id)
    if (newWorkout.id != undefined) {

        // update
        fetch(API_BASE + '/' + newWorkout.id, {
            method: 'PATCH',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWorkout)
        })
            .then((response) => {
                if (response.ok) {
                    // alert('Saved!');
                    refreshCollection();
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Could not save workout!');
            });
    } else {
        (newWorkout.id == undefined)

        fetch(API_BASE, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWorkout)

        })
            .then((response) => {
                if (response.ok) {
                    // alert('Saved!');
                    refreshCollection();
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Could not save workout!');
            });
    }
}

function refreshCollection() {
    //Tear it down
    while (workoutsSection.firstChild) {
        workoutsSection.firstChild.remove();
    }

    //Build it up
    fetch(API_BASE)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            loadData(data)
            workoutsSection.innerHTML = workoutMap;
        });
    id = undefined;
}

//Button Event Listeners
openModalBtn.addEventListener("click", () => {
    modal.classList.toggle("active")
})

closeBtn.addEventListener("click", () => {
    modal.classList.toggle("active");
    msg.classList.remove("active");
    resetForm();
})