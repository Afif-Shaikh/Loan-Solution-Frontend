// Mock API URLs (Replace with actual API endpoints)
const AADHAAR_API = "https://67b1db173fc4eef538eae01f.mockapi.io/aadhaar-verification";
const CIBIL_API = "https://67b1db173fc4eef538eae01f.mockapi.io/Pan-Card";

// Store Aadhaar Details for PAN Verification
let storedAadhaarDetails = {};

// Aadhaar Validation (12-digit check)
function isValidAadhaar(aadhaar) {
    return /^\d{12}$/.test(aadhaar);
}

// PAN Validation (Format Check)
// function isValidPAN(pan) {
//     return /^[A-Z]{5}[PCHFTA]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$/.test(pan);
// }

// Age Calculation from DOB
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Aadhaar Verification Function
function verifyAadhaar() {
    const aadhaarNumber = document.getElementById("aadhaarNumber").value;

    if (!isValidAadhaar(aadhaarNumber)) {
        alert("❌ Invalid Aadhaar Number! Must be 12 digits.");
        return;
    }

    fetch(`${AADHAAR_API}?aadhaar=${aadhaarNumber}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0 && data[0].verified) {
                storedAadhaarDetails = {
                    firstName: data[0].firstName,
                    middleName: data[0].middleName,
                    surname: data[0].surname,
                    dob: data[0].dob,
                };

                // Check Age (Must Be 18+)
                if (calculateAge(data[0].dob) < 18) {
                    alert("❌ Applicant must be at least 18 years old!");
                    return;
                }

                // Autofill Aadhaar Details
                document.getElementById("firstName").value = data[0].firstName;
                document.getElementById("middleName").value = data[0].middleName;
                document.getElementById("surname").value = data[0].surname;
                document.getElementById("dob").value = data[0].dob;
                document.getElementById("gender").value = data[0].gender;
                document.getElementById("address1").value = data[0].address1;
                document.getElementById("address2").value = data[0].address2;
                document.getElementById("city").value = data[0].city;
                document.getElementById("state").value = data[0].state;
                document.getElementById("pincode").value = data[0].pincode;

                // Show Aadhaar Details Section
                document.getElementById("aadhaarDetails").style.display = "block";

                alert("✅ Aadhaar Verified & Auto-filled!");

                // Enable PAN Input
                document.getElementById("panNumber").disabled = false;
            } else {
                alert("❌ Aadhaar Verification Failed!");
            }
        })
        .catch(error => console.error("Error:", error));
}

// PAN Verification & Auto-Fill
function verifyPAN() {
    const panNumber = document.getElementById("panNumber").value;

    // if (!isValidPAN(panNumber)) {
    //     alert("❌ Invalid PAN Format! Must follow ABCDE1234F.");
    //     return;
    // }

    fetch(`${CIBIL_API}?pan=${panNumber}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const panData = data[0];

                // Ensure Aadhaar & PAN Belong to the Same Person
                if (
                    panData.firstName !== storedAadhaarDetails.firstName ||
                    panData.surname !== storedAadhaarDetails.surname ||
                    panData.dob !== storedAadhaarDetails.dob
                ) {
                    alert("❌ PAN & Aadhaar Details Do Not Match!");
                    return;
                }

                // Autofill PAN Details & Show Loan Eligibility
                document.getElementById("cibilScore").value = panData.cibilScore >= 700 
                    ? `${panData.cibilScore} ✅ Eligible for Loan` 
                    : `${panData.cibilScore} ❌ Not Eligible`;

                // Show PAN Details Section
                document.getElementById("panDetails").style.display = "block";

                if (panData.cibilScore >= 700) {
                    document.getElementById("loanForm").style.display = "block";
                }
            } else {
                alert("❌ PAN Verification Failed!");
            }
        })
        .catch(error => console.error("Error:", error));
}
