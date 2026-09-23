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
const contactForm = document.querySelector("#contact form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const message = document.querySelector("#message").value;

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

if (studentForm) {

    studentForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const studentName =
            document.getElementById("studentName").value;

        const studentID =
            document.getElementById("studentID").value;

        const studentClass =
            document.getElementById("studentClass").value;

        const studentDate =
            document.getElementById("date").value + " " +
            document.getElementById("month").value + " " +
            document.getElementById("year").value;

        const phoneNumber =
            document.getElementById("studentPhone").value;

        const studentParents =
            document.getElementById("studentParentGuardian").value;

        const gender =
            document.getElementById("gender").value;

        const address =
            document.getElementById("studentAddress").value;


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


        students.push(student);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        alert("Student saved successfully!");

        studentForm.reset();

    });

}


// Display students
const studentTableBody =
    document.getElementById("studentTableBody");

if (studentTableBody) {

    studentTableBody.innerHTML = "";

    students.forEach(function (student, index) {

        const row = document.createElement("tr");

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
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}


// Delete Student
function deleteStudent(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this student?");

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

    window.location.href = "create.html";
}