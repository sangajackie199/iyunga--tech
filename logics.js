// Learn More button
const learnMoreButton = document.querySelector(".hero button");

if (learnMoreButton) {
    learnMoreButton.addEventListener("click", function () {
        document.querySelector("#about").scrollIntoView({
            behavior: "smooth"
        });
    });
}

// Contact form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        alert("Thank you, " + name + "! Your message has been received.");

        contactForm.reset();
    });
}

// Students
let students =
    JSON.parse(localStorage.getItem("students")) || [];

const studentForm =
    document.getElementById("studentForm");


// Check if we are editing a student
let editStudentIndex =
    localStorage.getItem("editStudentIndex");


// Fill form with existing student data
if (studentForm && editStudentIndex !== null) {

    const student =
        students[Number(editStudentIndex)];

    if (student) {

        document.getElementById("studentName").value =
            student.studentName;

        document.getElementById("studentID").value =
            student.studentID;

        document.getElementById("gender").value =
            student.gender;

        document.getElementById("studentParentGuardian").value =
            student.studentParents;

        document.getElementById("studentPhone").value =
            student.phoneNumber;

        document.getElementById("studentAddress").value =
            student.address;

        document.getElementById("studentClass").value =
            student.studentClass;


        // Separate Date of Birth
        const dateParts =
            student.studentDate.split(" ");

        if (dateParts.length === 3) {

            document.getElementById("date").value =
                dateParts[0];

            document.getElementById("month").value =
                dateParts[1];

            document.getElementById("year").value =
                dateParts[2];
        }


        // Change button text
        document.getElementById("saveStudent").textContent =
            "Update Student";
    }
}


// Save or Update Student
if (studentForm) {

    studentForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const studentName =

        document.getElementById("studentName").value.trim();

        const studentID =
        document.getElementById("studentID").value.trim();
            const existingStudent = students.find(function(student, index) {
                return student.studentID === studentID &&
                       index !== Number(editStudentIndex);
            });
            
            if (existingStudent) {
                alert("Student ID already exists!");
                return;
            }

        const studentClass =
        document.getElementById("studentClass").value.trim();

        const studentDate =
            document.getElementById("date").value + " " +
            document.getElementById("month").value + " " +
            document.getElementById("year").value;

        const phoneNumber =
        document.getElementById("studentPhone").value.trim();

            const studentParents =
            document.getElementById("studentParentGuardian").value.trim();

        const gender =
            document.getElementById("gender").value;

        const address =
        document.getElementById("studentAddress").value.trim();


        const student = {

            studentName: studentName,
            studentID: studentID,
            studentParents: studentParents,
            studentClass: studentClass,
            address: address,
            gender: gender,
            phoneNumber: phoneNumber,
            studentDate: studentDate

        };


        // UPDATE existing student
        if (editStudentIndex !== null) {

            students[Number(editStudentIndex)] =
                student;

            localStorage.removeItem(
                "editStudentIndex"
            );

            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );

            alert("Student updated successfully!");

            window.location.href = "view.html";


        } else {

            // CREATE new student
            students.push(student);

            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );

            alert("Student saved successfully!");

            studentForm.reset();
        }

    });

}


// Display students
const studentTableBody =
    document.getElementById("studentTableBody");

if (studentTableBody) {

    studentTableBody.innerHTML = "";

    students.forEach(function (student, index) {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${student.studentName}</td>

            <td>${student.studentID}</td>

            <td>${student.studentClass}</td>

            <td>${student.studentDate}</td>

            <td>${student.studentParents}</td>

            <td>${student.gender}</td>

            <td>${student.address}</td>

            <td>${student.phoneNumber}</td>

            <td>

                <button onclick="editStudent(${index})">
                    Edit
                </button>

                <button onclick="deleteStudent(${index})">
                    Delete
                </button>

            </td>
        `;

        studentTableBody.appendChild(row);
    });
}


// Delete Student
function deleteStudent(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );

    if (confirmDelete) {

        students.splice(index, 1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        location.reload();
    }
}


// Edit Student
function editStudent(index) {

    localStorage.setItem(
        "editStudentIndex",
        index
    );

    window.location.href =
        "create.html";
}

// Search Student
const searchStudent =
    document.getElementById("searchStudent");

if (searchStudent) {

    searchStudent.addEventListener("input", function () {

        const searchValue =
            searchStudent.value.toLowerCase();

        const rows =
            studentTableBody.querySelectorAll("tr");

        rows.forEach(function (row) {

            const studentName =
                row.cells[1].textContent.toLowerCase();

            const studentID =
                row.cells[2].textContent.toLowerCase();

            if (
                studentName.includes(searchValue) ||
                studentID.includes(searchValue)
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });

}
// Student Count
const studentCount =
    document.getElementById("studentCount");

if (studentCount) {

    studentCount.textContent =
        "Total Students: " + students.length;

}