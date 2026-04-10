# CONCEPT — JSON Basics

---

## 1. WHAT IS THIS

- JSON = JavaScript Object Notation
- A TEXT FORMAT for sending and storing data
- Looks like a JS object but follows strict rules
- It is NOT code — it is data in string form
- Key difference from JS object:
  - JSON keys MUST use double quotes
  - JSON cannot contain functions or undefined
  - JSON is always a string until parsed

---

## 2. WHY THIS IS USED

- API responses return JSON — you parse and assert on them
- API requests send JSON — you stringify objects before sending
- package.json — project config, scripts, dependencies
- tsconfig.json — TypeScript compiler settings
- playwright.config.ts reads from process.env (JSON-like env vars)
- storageState — Playwright saves auth cookies as JSON file
- route.fulfill() — mock API responses use JSON.stringify for body

---

## 3. WHERE IT IS USED

| File / Location | Purpose |
|----------------|---------|
| package.json | Project identity, scripts, dependencies |
| tsconfig.json | TypeScript compiler config |
| API response body | Parsed with response.json() or JSON.parse() |
| API request body | Stringified with JSON.stringify() |
| route.fulfill({ body }) | Mock response body must be JSON string |
| storageState.json | Saved auth cookies between test sessions |

---

## 4. HOW IT WORKS

### The two functions you use every day

```javascript
// JSON.parse — String → Object (RECEIVING data)
const responseText = '{"status": "success", "userId": 123}';
const data = JSON.parse(responseText);
console.log(data.status);    // "success"
console.log(data.userId);    // 123

// JSON.stringify — Object → String (SENDING data)
const body = JSON.stringify({ 
  email: 'test@wingify.com', 
  password: 'Test@1234' 
});
// '{"email":"test@wingify.com","password":"Test@1234"}'

// JSON.stringify with pretty print — for readable logs
const pretty = JSON.stringify({ email: 'test@wingify.com' }, null, 2);
// {
//   "email": "test@wingify.com"
// }
```

### JSON strict rules

```json
{
  "name": "sdet-stlc-portfolio",    
  "version": "1.0.0",               
  "port": 3000,                     
  "active": true,                   
  "tags": ["login", "smoke"],       
  "use": {                          
    "headless": true               
  }                                 
}
```

| Rule | Valid | Invalid |
|------|-------|---------|
| Key quotes | `"name"` | `name` or `'name'` |
| String values | `"login"` | `'login'` |
| No trailing comma | last item no comma | `"active": true,` ← breaks |
| No comments | not allowed | `// this is version` ← breaks |
| No functions | not allowed | `"fn": function(){}` ← breaks |
| No undefined | not allowed | `"val": undefined` ← breaks |

### JS Object vs JSON — side by side

```javascript
// JS Object — keys without quotes, functions allowed
const jsObj = {
  email: 'test@wingify.com',
  getEmail() { return this.email; }
};

// JSON string — keys with double quotes, no functions
const jsonStr = '{"email":"test@wingify.com"}';

// Convert between them
const backToObject = JSON.parse(jsonStr);    // string → object
const backToString = JSON.stringify(jsObj);  // object → string
// Note: getEmail function is LOST in stringify — functions don't survive JSON
```

---

## 5. REAL PROJECT EXAMPLE

### Example 1 — Playwright API test (Module 4 connection)

```javascript
// Sending a POST request — object auto-converted to JSON
const response = await page.request.post('/api/login', {
  data: { 
    email: 'test@wingify.com', 
    password: 'Test@1234' 
  }
  // Playwright internally calls JSON.stringify on data
});

// Receiving response — parse JSON body
const body = await response.json();   // internally JSON.parse
expect(body.token).toBeDefined();     // assert token exists
expect(body.status).toBe('success');  // assert status field
```

### Example 2 — route.fulfill mock body (Module 4 direct usage)

```javascript
// Mocking a 401 response — body MUST be JSON string
await page.route('**/api/login', route => {
  route.fulfill({
    status: 401,
    contentType: 'application/json',
    body: JSON.stringify({           // ← JSON.stringify required here
      authenticated: false,
      error: 'Invalid credentials',
      code: 401
    })
  });
});
```

### Example 3 — Safe JSON parse (production pattern)

```javascript
// Never use JSON.parse without try/catch in real projects
function safeParseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Invalid JSON:', error.message);
    return null;
  }
}

const result = safeParseJSON('{"status":"ok"}');   // works
const broken = safeParseJSON('{"status":"ok",}');  // returns null safely
```

### Example 4 — package.json scripts that CI uses

```json
{
  "name": "sdet-stlc-portfolio",
  "version": "1.0.0",
  "scripts": {
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed",
    "test:debug": "npx playwright test --debug",
    "report": "npx playwright show-report",
    "lint": "npx tsc --noEmit"
  },
  "devDependencies": {
    "@playwright/test": "^1.44.0"
  }
}
```

GitHub Actions reads this file and runs `npm test`.
If this JSON is broken → entire CI pipeline fails before any test runs.

---

## 6. WHAT CAN GO WRONG

| Mistake | What breaks | Fix |
|---------|------------|-----|
| Trailing comma in package.json | npm ci fails, CI breaks | Remove comma after last item |
| Single quotes on keys | JSON.parse throws SyntaxError | Use double quotes always |
| Comment inside JSON file | JSON.parse throws SyntaxError | Remove comment entirely |
| JSON.parse on undefined | TypeError: undefined is not valid JSON | Check string exists first |
| Function in object → stringify | Function silently disappears | Never put functions in data objects |
| Missing contentType in fulfill | Browser may not parse mock response | Always set contentType: 'application/json' |

---

## 7. HOW TO DEBUG

```bash
# Validate package.json is not broken
node -e "require('./package.json')"
# No output = valid JSON
# SyntaxError output = broken JSON — find the trailing comma or bad quotes

# Validate any JSON file
node -e "require('./tsconfig.json')"

# Pretty print JSON string in terminal (Mac/Linux)
echo '{"a":1}' | python3 -m json.tool

# Pretty print JSON string in terminal (Windows PowerShell)
echo '{"a":1}' | python -m json.tool

# Check TypeScript config is valid (catches tsconfig.json issues)
npx tsc --noEmit

# Debug API response body in Playwright test
const body = await response.json();
console.log(JSON.stringify(body, null, 2));  // pretty print response
```

---

## 8. INTERVIEW ANSWER

"JSON is the data format for API communication and all config files
in a Playwright project. In API tests I use `response.json()` to
parse the response body and assert on fields like status codes or
tokens. When mocking APIs with `route.fulfill()`, the body must be
a JSON string so I use `JSON.stringify()` on the object before
passing it. I know the strict rules — double-quoted keys, no trailing
commas, no comments — because a broken `package.json` stops the
entire CI pipeline before a single test runs. I always wrap
`JSON.parse()` in try/catch in production code to handle
malformed responses gracefully."

---

## Connection to Other Modules

```
03_json knowledge
    ↓
M04_API_Mocking
→ route.fulfill({ body: JSON.stringify({...}) })
→ const body = await response.json()
→ expect(body.error).toBe('Invalid credentials')

03_json knowledge  
    ↓
M07_GitHub_Actions
→ broken package.json = CI pipeline never starts
→ npm ci reads package.json to install dependencies
```