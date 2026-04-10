// ============================================
// UTILITY FUNCTIONS that work on objects
// Real SDET use — data transformation helpers
// ============================================

const { validUser, allUsers } = require('../data/credentials');

// -----------------------------------------------
// 1. ACCESS — dot notation vs bracket notation
// -----------------------------------------------

function getUserEmail(user) {
  return user.email;                  // dot notation — use when key is known
}

function getProperty(user, key) {
  return user[key];                   // bracket notation — use when key is dynamic
}

console.log(getUserEmail(validUser));             // test@wingify.com
console.log(getProperty(validUser, 'password'));  // Test@1234


// -----------------------------------------------
// 2. CHECK — does a key exist, is value empty
// -----------------------------------------------

function isEmptyCredential(user) {
  return user.email === '' || user.password === '';
}

function hasRole(user) {
  return user.role !== null && user.role !== undefined;
}

console.log(isEmptyCredential(validUser));   // false
console.log(isEmptyCredential({ email: '', password: '' }));  // true
console.log(hasRole(validUser));             // true


// -----------------------------------------------
// 3. FILTER — find specific test data sets
// -----------------------------------------------

function getValidUsers(users) {
  return users.filter(user => user.type === 'valid');
}

function getInvalidUsers(users) {
  return users.filter(user => user.type === 'invalid');
}

const validOnly = getValidUsers(allUsers);
const invalidOnly = getInvalidUsers(allUsers);

console.log('Valid users:', validOnly);
console.log('Invalid users:', invalidOnly);


// -----------------------------------------------
// 4. TRANSFORM — build API request body from object
// -----------------------------------------------

function buildLoginPayload(user) {
  return {
    email: user.email,
    password: user.password,
    timestamp: new Date().toISOString(),
    source: 'automation'
  };
}

const payload = buildLoginPayload(validUser);
console.log('API payload:', payload);
// {
//   email: 'test@wingify.com',
//   password: 'Test@1234',
//   timestamp: '2026-04-10T...',
//   source: 'automation'
// }


// -----------------------------------------------
// 5. MERGE — combine two objects (spread operator)
// -----------------------------------------------

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const authHeaders = {
  'Authorization': 'Bearer token123'
};

// Merge — second object overwrites matching keys
const fullHeaders = { ...defaultHeaders, ...authHeaders };

console.log(fullHeaders);
// {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
//   'Authorization': 'Bearer token123'
// }

module.exports = {
  getUserEmail,
  getProperty,
  isEmptyCredential,
  hasRole,
  getValidUsers,
  getInvalidUsers,
  buildLoginPayload
};