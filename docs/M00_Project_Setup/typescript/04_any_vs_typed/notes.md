# CONCEPT — type: any vs typed

---

## 1. WHAT IS THIS

- `any` = TypeScript gives up ALL type checking for that variable
- Typed = you declare exactly what type a variable holds
- `unknown` = safe alternative to `any` — forces type check before use
- This is the most important TypeScript decision in every file you write

---

## 2. WHY THIS IS USED

Three real costs of using `any`:

| Cost              | What you lose                                           |
| ----------------- | ------------------------------------------------------- |
| No autocomplete   | VS Code cannot suggest `.fill()` on `any` typed locator |
| No error catching | Typos in method names show no red underline             |
| Runtime crashes   | Wrong types passed silently — test fails at runtime     |

When `page` is typed as `Page`:

- VS Code suggests all 50+ Page methods as you type
  When `page` is typed as `any`:
- VS Code suggests nothing — you are writing blind

---

## 3. WHERE IT IS USED

| Location                      | Type used                 | Why                              |
| ----------------------------- | ------------------------- | -------------------------------- |
| `page` parameter in LoginPage | `Page`                    | Full Page method autocomplete    |
| `emailInput` property         | `Locator`                 | Full Locator method autocomplete |
| `fillEmail()` parameter       | `string`                  | Prevents passing number/boolean  |
| `login()` return type         | `Promise<void>`           | Documents it returns nothing     |
| `getErrorText()` return type  | `Promise<string \| null>` | Could be null if element absent  |
| Test credential objects       | `Credentials` interface   | Shape enforced, typos caught     |

---

## 4. HOW IT WORKS

### Common types in Playwright framework

```typescript
// Primitives
let count: number = 5;
let name: string = 'TC-01';
let passed: boolean = true;
let tags: string[] = ['smoke', 'login'];

// Playwright types
readonly page: Page;
readonly emailInput: Locator;

// Interface — typed object shape
interface Credentials {
  email: string;
  password: string;
}

// Return types
async function navigate(): Promise<void> { }
async function getTitle(): Promise<string> { }
async function isVisible(): Promise<boolean> { }
async function getText(): Promise<string | null> { }
```

### any vs typed vs unknown

```typescript
// any — no checks, no autocomplete, dangerous
let data: any = "hello";
data = 123; // silent
data.boom(); // silent — crashes at runtime

// typed — strict, safe, full autocomplete
let email: string = "test@wingify.com";
// email = 123;          // ❌ RED ERROR immediately

// unknown — safe alternative when type genuinely unknown
let response: unknown = fetchData();
// response.status;      // ❌ ERROR — must check type first
if (typeof response === "object" && response !== null) {
  // now safe to access properties
}
```

---

## 5. REAL PROJECT EXAMPLE

### API response — most common place people misuse any

```typescript
// ❌ BAD — any hides problems
const body: any = await response.json();
body.tok; // typo — no error, returns undefined silently
body.status; // no autocomplete — you guess field names

// ✅ GOOD — typed interface
interface LoginResponse {
  token: string;
  userId: number;
  status: string;
}

const body = (await response.json()) as LoginResponse;
body.tok; // ❌ RED ERROR — Property 'tok' does not exist
body.token; // ✅ autocomplete suggests 'token'
```

### The autocomplete difference — daily impact

```typescript
// page typed as any — you type: page.
// VS Code shows: nothing useful

// page typed as Page — you type: page.
// VS Code shows:
// page.goto()
// page.getByRole()
// page.route()
// page.waitForResponse()
// page.screenshot()
// ... 50+ methods
```

---

## 6. WHAT CAN GO WRONG

| Mistake                    | What happens                            | Fix                                  |
| -------------------------- | --------------------------------------- | ------------------------------------ |
| `page: any` in constructor | No Playwright autocomplete              | Type as `Page`                       |
| `email: any` in fillEmail  | `fillEmail(12345)` shows no error       | Type as `string`                     |
| `as any` to silence errors | Bypasses all checks — runtime crash     | Fix the actual type                  |
| Missing return type        | Team doesn't know what function returns | Always declare return type           |
| `any` on API response body | Typos in field names silent             | Create interface for response shape  |
| `any[]` for arrays         | Array elements untyped                  | Use `string[]`, `Credentials[]` etc. |

---

## 7. HOW TO DEBUG

```bash
# Find all type errors including implicit any
npx tsc --noEmit

# Find specifically implicit any issues
npx tsc --noEmit --strict
# Look for: "Parameter 'x' implicitly has an 'any' type"
# Fix: add ': string' or ': Page' or correct type

# Check a specific file only
npx tsc --noEmit --isolatedModules pages/LoginPage.ts
```

In VS Code:

- Hover over any variable → tooltip shows its current type
- If tooltip shows `any` → that is where to add a proper type
- View → Problems → filter by "implicitly has type 'any'"

---

## 8. INTERVIEW ANSWER

"I avoid `any` in my framework — it disables TypeScript's
core benefit. The real cost is not just missing error detection
— it is losing autocomplete. When `page` is typed as `Page`,
VS Code suggests all 50+ Playwright methods as I type. When
typed as `any`, I am writing blind.

I type all page object properties as `Page` and `Locator` from
Playwright, method parameters as `string`, and return types as
`Promise<void>` or `Promise<string | null>` depending on what
the method returns.

For API responses where the shape is unknown, I use `unknown`
instead of `any` — it forces me to verify the type before
accessing properties, which prevents runtime crashes from
unexpected response shapes.

When `strict: true` is set in `tsconfig.json`, implicit `any`
becomes a compile error — which enforces proper typing across
the entire codebase automatically."

---

## Connection Forward

```
any vs typed knowledge
    ↓
M01_Selectors_POM
→ LoginPage.ts uses Page, Locator types — no any anywhere
→ All method parameters typed as string
→ Return types declared on every method

any vs typed knowledge
    ↓
M04_API_Mocking
→ route.fulfill() body typed
→ API response parsed as typed interface — not any
→ Assertions on typed fields — autocomplete works
```
