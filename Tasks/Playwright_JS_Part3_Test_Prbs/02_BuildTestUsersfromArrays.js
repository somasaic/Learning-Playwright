// ── The Data ─────────────────────────────────────────────────

var names = ["Amit Kumar", "Neha Singh"];
var roles = ["admin",      "viewer"];

// Think of them as two columns of a table:
// Index 0 → "Amit Kumar" + "admin"
// Index 1 → "Neha Singh" + "viewer"


// ── The Function ─────────────────────────────────────────────

function buildTestUsers(names, roles) {

  // We will collect all user objects here
  var users = [];

  // Loop through each name by its index number
  for (var i = 0; i < names.length; i++) {

    // Step 1: Get the name and role at this index
    var fullName = names[i];   // "Amit Kumar"
    var role     = roles[i];   // "admin"

    // Step 2: Build username → lowercase + spaces become underscores
    var username = fullName.toLowerCase().replace(/ /g, "_");
    // "Amit Kumar" → "amit kumar" → "amit_kumar"

    // Step 3: Build email → username + domain
    var email = username + "@playwrightbatch.com";
    // → "amit_kumar@playwrightbatch.com"

    // Step 4: Build the user object
    var userObject = {
      username: username,
      email:    email,
      role:     role
    };

    // Step 5: Push it into the users array
    users.push(userObject);
  }

  // Step 6: Return the complete array
  return users;
}


// ── Run it ───────────────────────────────────────────────────

var result = buildTestUsers(names, roles);

console.log(result);
// [
//   { username: "amit_kumar", email: "amit_kumar@playwrightbatch.com", role: "admin"  },
//   { username: "neha_singh", email: "neha_singh@playwrightbatch.com", role: "viewer" }
// ]

// Access individual users
// console.log(result[0].username);  // "amit_kumar"
// console.log(result[1].email);     // "neha_singh@playwrightbatch.com"
// console.log(result[0].role);      // "admin"