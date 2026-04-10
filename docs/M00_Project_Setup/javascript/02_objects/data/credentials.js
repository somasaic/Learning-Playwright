// ============================================
// TEST DATA — stored as typed objects
// This is your testData.ts equivalent in JS
// ============================================

// Single object — one user
const validUser = {
  email: 'test@wingify.com',
  password: 'Test@1234',
  role: 'admin'
};

// Invalid user object
const invalidUser = {
  email: 'wrong@test.com',
  password: 'wrongpassword',
  role: null
};

// Empty user — BVA minimum boundary
const emptyUser = {
  email: '',
  password: '',
  role: null
};

// Array of objects — multiple test data sets
const allUsers = [
  { id: 1, email: 'test@wingify.com',  password: 'Test@1234',     type: 'valid'   },
  { id: 2, email: 'wrong@test.com',    password: 'wrongpass',      type: 'invalid' },
  { id: 3, email: '',                  password: '',               type: 'empty'   },
  { id: 4, email: 'test@wingify.com',  password: 'wrongpass',      type: 'partial' }
];

module.exports = { validUser, invalidUser, emptyUser, allUsers };