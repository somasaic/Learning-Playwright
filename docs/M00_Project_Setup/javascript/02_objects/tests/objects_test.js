// ============================================
// TESTS — assert object behaviour
// This is how objects are used in real spec files
// ============================================

const { validUser, invalidUser, emptyUser, allUsers } = require('../data/credentials');
const { projectConfig } = require('../data/config');
const {
  getUserEmail,
  getProperty,
  isEmptyCredential,
  hasRole,
  getValidUsers,
  buildLoginPayload
} = require('../utils/objectHelpers');


// -----------------------------------------------
// MANUAL ASSERTIONS — no test runner needed
// run with: node tests/objects_test.js
// -----------------------------------------------

function assert(condition, message) {
  if (!condition) {
    console.error('FAIL:', message);
  } else {
    console.log('PASS:', message);
  }
}


// TC-01: valid user object has correct email
assert(
  validUser.email === 'test@wingify.com',
  'Valid user email is correct'
);

// TC-02: invalid user object has wrong credentials
assert(
  invalidUser.email !== 'test@wingify.com',
  'Invalid user email is different from valid'
);

// TC-03: empty user triggers empty credential check
assert(
  isEmptyCredential(emptyUser) === true,
  'Empty user is detected as empty credential'
);

// TC-04: valid user is not detected as empty
assert(
  isEmptyCredential(validUser) === false,
  'Valid user is not empty credential'
);

// TC-05: role exists on valid user
assert(
  hasRole(validUser) === true,
  'Valid user has a role'
);

// TC-06: role is null on invalid user
assert(
  hasRole(invalidUser) === false,
  'Invalid user has no role'
);

// TC-07: filter returns only valid users from array
const validOnly = getValidUsers(allUsers);
assert(
  validOnly.length === 1,
  'Only one valid user in allUsers array'
);

// TC-08: API payload contains required keys
const payload = buildLoginPayload(validUser);
assert(
  payload.email === validUser.email,
  'Payload email matches user email'
);
assert(
  payload.source === 'automation',
  'Payload source is automation'
);

// TC-09: config object has correct baseURL
assert(
  projectConfig.baseURL === 'https://app.vwo.com',
  'Config baseURL is correct'
);

// TC-10: nested object access works correctly
assert(
  projectConfig.use.screenshot === 'only-on-failure',
  'Nested config screenshot setting is correct'
);

console.log('\n--- All object tests complete ---');