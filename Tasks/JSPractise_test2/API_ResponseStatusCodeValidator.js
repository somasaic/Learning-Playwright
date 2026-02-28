/*
Problem Statement - 1

API Response Status Code Validator
As an SDET, you receive an API response status code and need to classify it. Write a JavaScript program using a switch statement that takes an HTTP status code stored in a variable and prints the category and a QA-friendly message.

- 200 → "PASS - OK: Request successful"
- 201 → "PASS - Created: Resource created successfully"
- 301 → "WARNING - Moved Permanently: URL has changed"
- 400 → "FAIL - Bad Request: Check request payload"
- 401 → "FAIL - Unauthorized: Check auth token"
- 403 → "FAIL - Forbidden: Insufficient permissions"
- 404 → "FAIL - Not Found: Check endpoint URL"
- 500 → "FAIL - Internal Server Error: Backend issue"
- Any other → "UNKNOWN - Unhandled status code"

*/


function validateStatusCode(statusCode){
    if(typeof statusCode !== 'number' || isNaN(statusCode)){
            throw new Error('Status code must be a number');
    }
    if(!Number.isInteger(statusCode)){
            throw new Error('Status code must be an integer');
    }
    if(statusCode < 100 || statusCode > 599){
            throw new Error('Status code must be between 100 and 599');
    }
    switch(statusCode){
        case 200:
            return(`Status Code : ${statusCode} Result : "PASS - OK: Request successful"`);
        
        case 201:
            return(`Status Code : ${statusCode} Result : "PASS - Created: Resource created successfully"`);
            
        case 301:
            return(`Status Code : ${statusCode} Result : "WARNING - Moved Permanently: URL has changed"`);
            
        case 400:
            return(`Status Code : ${statusCode} Result : "FAIL - Bad Request: Check request payload"`);
            
        case 401:
            return(`Status Code : ${statusCode} Result : "FAIL - Unauthorized: Check auth token"`);
            
        case 403:
            return(`Status Code : ${statusCode} Result : "FAIL - Forbidden: Insufficient permissions"`);
            
        case 404:
            return(`Status Code : ${statusCode} Result : "FAIL - Not Found: Check endpoint URL"`);
            
        case 500:
            return(`Status Code : ${statusCode} Result : "FAIL - Internal Server Error: Backend issue"`);
            
        default:
            return(`Status Code : ${statusCode} Result : "UNKNOWN - Unhandled status code"`);
    }      
}

// CLI USAGE: node API_ResponseStatusCodeValidator.js 200
// process.argv[2] captures the status code from terminal input
// Allows file to work standalone OR be imported in other scripts (best for automation)
if(require.main === module){

    const inputStr = process.argv[2];

    // Step 1: Validate the STRING first
    if (!inputStr) {
        console.error('Error: Status code required');
        process.exit(1);
    }

    // Step 2: Check if it's a valid number string
    if (!/^\d+$/.test(inputStr)) {  // Only digits allowed
        console.error('Error: Invalid input format. Use only digits (e.g., 200)');
        process.exit(1);
    }

    // Step 3: Parse it
    const statusCode = parseInt(inputStr);

    // Step 4: Let validateStatusCode do final validation
    try{
        const result = validateStatusCode(statusCode);
        console.log(result);
    }catch(error){
        console.error(error.message);
    }  
}

module.exports = { validateStatusCode };


