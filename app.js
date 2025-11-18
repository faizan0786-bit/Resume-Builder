/* IMAGE UPLOAD */
document.getElementById("imageUpload").addEventListener("change", function () {
    let file = this.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let img = document.getElementById("profileImage");
            img.src = e.target.result;
            img.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

/* GENERATE RESUME */
function generateResume() {
    document.getElementById("displayName").innerText = 
        document.getElementById("name").value;

    document.getElementById("displayJob").innerText = 
        document.getElementById("job").value;

    document.getElementById("displayEmail").innerText = 
        document.getElementById("email").value;

    document.getElementById("displayPhone").innerText = 
        document.getElementById("phone").value;

    document.getElementById("displayEducation").innerText = 
        document.getElementById("education").value;

    document.getElementById("displaySummary").innerText = 
        document.getElementById("summary").value;

    document.getElementById("displayExperience").innerText = 
        document.getElementById("experience").value;

    let skillsArr = document.getElementById("skills").value.split(",");
    let skillList = document.getElementById("displaySkills");
    skillList.innerHTML = "";
    skillsArr.forEach(skill => {
        if (skill.trim() !== "") {
            let li = document.createElement("li");
            li.textContent = skill.trim();
            skillList.appendChild(li);
        }
    });

    // Template change
    let template = document.getElementById("templateSelect").value;
    let preview = document.getElementById("resumePreview");
    preview.className = "";
    preview.classList.add(template);
}

/* DOWNLOAD PDF */
async function downloadPDF() {
    const resume = document.getElementById("resumePreview");

    // Convert to canvas
    const canvas = await html2canvas(resume, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Create PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Resume.pdf");
}