document.addEventListener('DOMContentLoaded', fetchStudents);

const studentForm = document.getElementById('studentForm');
const saveBtn = document.getElementById('saveBtn');
const updateBtn = document.getElementById('updateBtn');

studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('student_id').value;
    if(id) {
        updateStudent();
    } else {
        addStudent();
    }
});

updateBtn.addEventListener('click', function() {
    updateStudent();
});

function addStudent() {
    const data = getFormData();
    fetch('student_crud.php', {
        method: 'POST',
        body: getFormBody({...data, action: "add"}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(res => res.text())
    .then(() => {
        resetForm();
        fetchStudents();
    });
}

function fetchStudents() {
    fetch('student_crud.php?action=fetch')
        .then(res => res.json())
        .then(students => {
            const tbody = document.querySelector("#studentTable tbody");
            tbody.innerHTML = "";
            students.forEach(student => {
                tbody.innerHTML += `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.phone}</td>
                        <td>${student.course}</td>
                        <td>
                            <button class="action-btn edit-btn" onclick='editStudent(${JSON.stringify(student)})'>Edit</button>
                            <button class="action-btn delete-btn" onclick='deleteStudent(${student.id})'>Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function editStudent(student) {
    document.getElementById('student_id').value = student.id;
    document.getElementById('name').value = student.name;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone;
    document.getElementById('course').value = student.course;
    saveBtn.style.display = "none";
    updateBtn.style.display = "inline-block";
}

function updateStudent() {
    const data = getFormData();
    fetch('student_crud.php', {
        method: 'POST',
        body: getFormBody({...data, action: "update"}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(res => res.text())
    .then(() => {
        resetForm();
        fetchStudents();
    });
}

function deleteStudent(id) {
    if(confirm("Are you sure you want to delete this student?")) {
        fetch('student_crud.php', {
            method: 'POST',
            body: getFormBody({id, action: "delete"}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(res => res.text())
        .then(() => fetchStudents());
    }
}

function getFormData() {
    return {
        id: document.getElementById('student_id').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        course: document.getElementById('course').value
    };
}

function getFormBody(params) {
    return Object.keys(params).map(key => 
        encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    ).join('&');
}

function resetForm() {
    studentForm.reset();
    document.getElementById('student_id').value = "";
    saveBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
}