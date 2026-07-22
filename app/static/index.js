const btn = document.getElementById("menu-btn");
const icon = btn.querySelector("i");
const overlay = document.querySelector(".nav-overlay");

btn.addEventListener("click", () => {
    // toggle icon
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");

    // toggle menu
    overlay.classList.toggle("active");
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        overlay.classList.remove("active");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});


const trackerForm = document.querySelector(".form-start");

document.querySelector(".button-form-x")
    .addEventListener("click", () => {
        trackerForm.style.display = "none";
    });

document.querySelector(".cancel-button")
    .addEventListener("click", () => {
        trackerForm.style.display = "none";
    });
const buttons = document.querySelectorAll(".add-button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        trackerForm.style.display = "flex";
        const value = button.value;
        document.querySelector("#document_type").value = value;
        if (value === 'Cover') {
            document.querySelector("#form-header").innerHTML = "رفع الخطاب";
        } else if (value === 'CV') {
            document.querySelector("#form-header").innerHTML = "رفع السيرة الذاتية";
        }
    });
});


document.getElementById('file-upload').addEventListener('change', function () {
    // Get file name or default text
    const name = this.files[0]?.name || 'لم يتم اختيار ملف';

    // Update the text span
    document.getElementById('document_name_span').textContent = name;

    // Update the hidden input value
    const inputElement = document.getElementById('document_name');
    if (inputElement) {
        inputElement.value = name;
        document.querySelector("#document_name_span").style.color = "#12b3c7";
    }
});

document.querySelector("#file-upload").addEventListener("invalid", (e) => {
    e.preventDefault();
    document.querySelector("#document_name_span").textContent = "يرجى اختيار ملف";
    document.querySelector("#document_name_span").style.color = "red";
});

const job = document.getElementsByClassName('header-application');
const delete_document = document.querySelectorAll('.delete-button-documents');


delete_document.forEach(delete_button => {
    const resumes = delete_button.closest('.document-info');
    delete_button.addEventListener("click", () => {
        fetch("/delete_document", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                resumes_id: resumes.dataset.resumesId,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    resumes.remove();
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
});


const selectCV = document.getElementById('cvs');
const buttonOfUpload = document.querySelectorAll('.user-document-cv-letter');

if (selectCV) {
    selectCV.addEventListener('change', () => {
        fetch("/choose_cv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                resumes_id: selectCV.value,
                job_id: job[0].dataset.jobId,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    location.reload();
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
}

const selectCover = document.getElementById('covers');

if (selectCover) {
    selectCover.addEventListener('change', () => {
        fetch("/choose_cover", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                resumes_id: selectCover.value,
                job_id: job[0].dataset.jobId,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    location.reload();

                }
            })
            .catch(error => {
                console.error(error);
            });
    });
}

const unlink_document_cv = document.getElementById('unlink_document_cv');

if (unlink_document_cv) {
    unlink_document_cv.addEventListener("click", () => {
        fetch("/unlink_document_cv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                job_id: job[0].dataset.jobId,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    location.reload();
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
}

const unlink_document_cover = document.getElementById('unlink_document_cover');

if (unlink_document_cover) {
    unlink_document_cover.addEventListener("click", () => {
        fetch("/unlink_document_cover", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                job_id: job[0].dataset.jobId,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    location.reload();
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
}



