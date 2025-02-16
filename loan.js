// Mock API URLs (Replace with your actual Mock API URLs)
const AADHAAR_API = "https://67b1db173fc4eef538eae01f.mockapi.io/aadhaar-verification";
const CIBIL_API = "https://67b1db173fc4eef538eae01f.mockapi.io/cibil-score";

// Aadhaar Validation
function isValidAadhaar(aadhaar) {
    return /^\d{12}$/.test(aadhaar);  // Aadhaar must be 12 digits
}

// PAN Validation
function isValidPAN(pan) {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);  // PAN: 5 Letters + 4 Digits + 1 Letter
}

// Aadhaar Verification Function
function verifyAadhaar() {
    const aadhaarNumber = document.getElementById("aadhaarNumber").value;

    if (!isValidAadhaar(aadhaarNumber)) {
        document.getElementById("aadhaarStatus").innerText = "❌ Invalid Aadhaar Number!";
        return;
    }

    fetch(`${AADHAAR_API}?aadhaar=${aadhaarNumber}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0 && data[0].verified) {
            document.getElementById("aadhaarStatus").innerHTML = `
                ✅ Aadhaar Verified! <br>
                <strong>Name:</strong> ${data[0].name} <br>
                <strong>Aadhaar:</strong> ${data[0].aadhaar} <br>
                <strong>DOB:</strong> ${data[0].dob} <br>
                <strong>Address:</strong> ${data[0].address} <br>
                <strong>Gender:</strong> ${data[0].gender} <br>
                <strong>Pincode:</strong> ${data[0].pincode}
            `;
            document.getElementById("panNumber").disabled = false;
            document.querySelector("button[onclick='checkCibilScore()']").disabled = false;
        } else {
            document.getElementById("aadhaarStatus").innerText = "❌ Aadhaar Verification Failed!";
        }
    })
    .catch(error => console.error("Error:", error));
}

// CIBIL Score Verification Function
function checkCibilScore() {
    const panNumber = document.getElementById("panNumber").value;

    if (!isValidPAN(panNumber)) {
        document.getElementById("cibilStatus").innerText = "❌ Invalid PAN Number!";
        return;
    }

    fetch(`${CIBIL_API}?pan=${panNumber}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0 && data[0].cibilScore >= 700) {
            document.getElementById("cibilStatus").innerHTML = `
                ✅ CIBIL Score Verified! <br>
                <strong>Name:</strong> ${data[0].name} <br>
                <strong>PAN:</strong> ${data[0].pan} <br>
                <strong>DOB:</strong> ${data[0].dob} <br>
                <strong>CIBIL Score:</strong> ${data[0].cibilScore} (Eligible)
            `;
            document.getElementById("loanForm").style.display = "block";
        } else {
            document.getElementById("cibilStatus").innerText = `❌ CIBIL Score: ${data[0].cibilScore} (Loan Denied)`;
        }
    })
    .catch(error => console.error("Error:", error));
}
