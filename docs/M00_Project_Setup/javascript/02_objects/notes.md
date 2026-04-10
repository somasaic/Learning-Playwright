CONCEPT 8: Objects and Key-Value Pairs

1. WHAT IS THIS

- An object is a container that holds related data as key: value pairs
- It's the most common data structure you'll use in Playwright test data and config

2. WHY THIS IS USED

- Test credentials, config settings, request bodies — all are objects
- You can't write testData.ts or playwright.config.ts without understanding this

3. WHERE IT IS USED

- testData.ts → stores login credentials as objects
- playwright.config.ts → the entire config is one big object
- API request bodies → sent as JSON objects

4. HOW IT WORKS

- typescript :-
  // Basic object
  const user = {
  email: 'test@wingify.com', // key: value
  password: 'Test@1234', // key: value
  role: 'admin' // key: value
  };

// Access values
console.log(user.email); // dot notation → 'test@wingify.com'
console.log(user['email']); // bracket notation → same result

// Nested object
const config = {
baseURL: 'https://app.vwo.com',
use: { // ← nested object
timeout: 30000,
headless: true
}
};

5. REAL PROJECT EXAMPLE

- typescript :-
  // fixtures/testData.ts
  export const validUser = {
  email: 'test@wingify.com',
  password: 'Test@1234'
  };

export const invalidUser = {
email: 'wrong@test.com',
password: 'wrongpassword'
};

// tests/login.spec.ts
import { validUser, invalidUser } from '../fixtures/testData';

await loginPage.login(validUser.email, validUser.password);

6. WHAT CAN GO WRONG

- Accessing a key that doesn't exist → returns undefined, not an error
- Mutating shared objects across tests → test pollution (use const always)

7. HOW TO DEBUG

- typescript :-
  console.log(JSON.stringify(user, null, 2)); // pretty-prints any object

8. INTERVIEW ANSWER

"I use objects to structure test data in testData.ts — each credential set is a typed object with email and password keys. This lets me import specific data sets into any test without hardcoding values. In TypeScript I define an interface for the shape, so if a key is missing, it's caught at compile time."


------------------------------------------------------------------------------

## Real SDET usage of objects

### data/ folder
- credentials.js — stores validUser, invalidUser, emptyUser objects
- config.js — stores project config as nested object
- This becomes testData.ts in the real Playwright framework

### utils/ folder
- objectHelpers.js — functions that operate on objects
- filter, transform, check, merge — four operations used in every framework
- buildLoginPayload() shows how objects become API request bodies

### tests/ folder
- objects_test.js — manual assertions proving each object behaviour
- Same logic runs inside Playwright expect() — just different syntax
- Run with: node tests/objects_test.js

## Key operations to remember
- dot notation → user.email (key is known)
- bracket notation → user[key] (key is dynamic/variable)
- spread operator → { ...obj1, ...obj2 } (merge objects)
- filter → array.filter(item => item.type === 'valid')
- JSON.stringify(obj) → converts object to string for API body

- Connection to Real Playwright Framework

02_objects/data/credentials.js
        ↓
becomes M03_Fixtures_TestData/playwright/testData.ts

02_objects/utils/objectHelpers.js (buildLoginPayload)
        ↓
becomes M04_API_Mocking/playwright/route.fulfill({ body: payload })

02_objects/tests/objects_test.js (assert pattern)
        ↓
becomes M02_Test_Cases/playwright/vwo_login.spec.ts (expect() pattern)

- How to Run

# Navigate to 02_objects folder
cd M00_Project_Setup/js/02_objects

# Run the tests file
node tests/objects_test.js


- Expected Output 

PASS: Valid user email is correct
PASS: Invalid user email is different from valid
PASS: Empty user is detected as empty credential
PASS: Valid user is not empty credential
PASS: Valid user has a role
PASS: Invalid user has no role
PASS: Only one valid user in allUsers array
PASS: Payload email matches user email
PASS: Payload source is automation
PASS: Config baseURL is correct
PASS: Nested config screenshot setting is correct

--- All object tests complete ---