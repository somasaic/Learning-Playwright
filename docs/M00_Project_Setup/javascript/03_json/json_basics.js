// ============================================
// JSON BASICS — SDET level understanding
// Location: javascript/03_json/json_basics.js
// Run with: node json_basics.js
// ============================================


// -----------------------------------------------
// PART 1: WHAT JSON IS vs WHAT JS OBJECT IS
// -----------------------------------------------

// JS Object — keys WITHOUT quotes, can have functions
const jsObject = {
  email: 'test@wingify.com',     // key has no quotes
  password: 'Test@1234',
  getEmail() {                   // functions allowed in JS objects
    return this.email;
  }
};

// JSON — keys MUST have double quotes, NO functions allowed
/*
{
  "email": "test@wingify.com",
  "password": "Test@1234"
}
*/

// RULE: JSON is a TEXT FORMAT for sending data
//       JS Object is a CODE structure for using data


// -----------------------------------------------
// PART 2: JSON.stringify — Object → String
// Used when SENDING data to an API
// -----------------------------------------------

const loginPayload = {
  email: 'test@wingify.com',
  password: 'Test@1234',
  source: 'automation'
};

const jsonString = JSON.stringify(loginPayload);
console.log('Stringified:', jsonString);
// {"email":"test@wingify.com","password":"Test@1234","source":"automation"}

// Pretty print — readable format for logs
const prettyString = JSON.stringify(loginPayload, null, 2);
console.log('Pretty:', prettyString);
// {
//   "email": "test@wingify.com",
//   "password": "Test@1234",
//   "source": "automation"
// }


// -----------------------------------------------
// PART 3: JSON.parse — String → Object
// Used when RECEIVING data from an API
// -----------------------------------------------

const apiResponse = '{"status":"success","token":"abc123","userId":456}';

const parsedResponse = JSON.parse(apiResponse);
console.log('Parsed status:', parsedResponse.status);   // success
console.log('Parsed token:', parsedResponse.token);     // abc123
console.log('Parsed userId:', parsedResponse.userId);   // 456

// This is EXACTLY what you do in Playwright API tests:
// const body = await response.json();   ← same as JSON.parse internally
// expect(body.status).toBe('success');


// -----------------------------------------------
// PART 4: package.json — SDET perspective
// This is the most important JSON file in your project
// -----------------------------------------------

// What package.json looks like in your project:
const packageJsonExplained = {
  "name": "sdet-stlc-portfolio",       // project name — used in CI logs
  "version": "1.0.0",                  // version — track releases
  "description": "Playwright SDET learning framework",

  // SCRIPTS — this is what you use every day
  "scripts": {
    "test": "npx playwright test",                    // npm test
    "test:headed": "npx playwright test --headed",    // npm run test:headed
    "test:debug": "npx playwright test --debug",      // npm run test:debug
    "report": "npx playwright show-report",           // npm run report
    "lint": "npx tsc --noEmit"                        // npm run lint — type check
  },

  // DEPENDENCIES — what the project needs to run
  "devDependencies": {
    "@playwright/test": "^1.44.0"     // ^ means accept minor updates
  }
};

console.log('Scripts available:', Object.keys(packageJsonExplained.scripts));
// ['test', 'test:headed', 'test:debug', 'report', 'lint']


// -----------------------------------------------
// PART 5: WHAT BREAKS package.json
// These are real mistakes that break your entire project
// -----------------------------------------------

// ❌ MISTAKE 1: Trailing comma after last item
/*
{
  "name": "sdet-stlc-portfolio",
  "version": "1.0.0",          ← trailing comma — JSON INVALID
}
*/

// ❌ MISTAKE 2: Single quotes instead of double quotes
/*
{
  'name': 'sdet-stlc-portfolio'   ← single quotes — JSON INVALID
}
*/

// ❌ MISTAKE 3: Comment inside JSON file
/*
{
  "name": "sdet-stlc-portfolio",
  // this is the version        ← comments not allowed in JSON
  "version": "1.0.0"
}
*/

// ✅ CORRECT package.json structure
/*
{
  "name": "sdet-stlc-portfolio",
  "version": "1.0.0",
  "scripts": {
    "test": "npx playwright test"
  },
  "devDependencies": {
    "@playwright/test": "^1.44.0"
  }
}
*/


// -----------------------------------------------
// PART 6: JSON in Playwright API testing
// This is where JSON knowledge becomes essential
// -----------------------------------------------

// SCENARIO: You are testing VWO login API directly
// The request body is JSON, the response is JSON

// Step 1 — Build request body (Object → JSON string)
const requestBody = JSON.stringify({
  email: 'test@wingify.com',
  password: 'Test@1234'
});
console.log('Request body sent to API:', requestBody);

// Step 2 — Receive API response (JSON string → Object)
const mockApiResponse = '{"authenticated":false,"error":"Invalid credentials","code":401}';
const responseData = JSON.parse(mockApiResponse);

// Step 3 — Assert on parsed response
console.log('Auth status:', responseData.authenticated);  // false
console.log('Error message:', responseData.error);        // Invalid credentials
console.log('Status code:', responseData.code);           // 401

// In Playwright M04 this becomes:
// await page.route('**/api/login', route => {
//   route.fulfill({
//     status: 401,
//     body: JSON.stringify({ authenticated: false, error: 'Invalid credentials' })
//   });
// });


// -----------------------------------------------
// PART 7: VALIDATE JSON — how to check if JSON is valid
// -----------------------------------------------

function safeParseJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    console.log('Valid JSON — parsed successfully');
    return parsed;
  } catch (error) {
    console.log('Invalid JSON — error:', error.message);
    return null;
  }
}

// Valid JSON
safeParseJSON('{"email":"test@wingify.com"}');
// → Valid JSON — parsed successfully

// Invalid JSON — trailing comma
safeParseJSON('{"email":"test@wingify.com",}');
// → Invalid JSON — error: Unexpected token } in JSON at position ...

// Invalid JSON — single quotes
safeParseJSON("{'email':'test@wingify.com'}");
// → Invalid JSON — error: Unexpected token ' in JSON at position ...