/*
Problem Statement - 8

Test Environment Config
In CI/CD pipelines, tests run against different environments. 
Write a JavaScript program using a switch statement that takes an environment name stored in a variable and prints the base URL, API key pattern, and timeout. 
Use const for fixed values and let for the assembled config.

Environments: dev, staging, qa, production/prod. 
Each has different base URL, API key prefix, timeout, and description.

Input:
envName = "staging"

Output:
Environment: STAGING 
Base URL: https://staging-api.testingacademy.com 
API Key: stg_key_xxxx-xxxx 
Timeout: 8000ms 
Description: Staging - Pre-production mirror

💡 Explanation:The switch matches "staging" and sets the corresponding configuration values for the staging environment.
*/

const envName = "staging";
let config;

switch (envName.toLowerCase()) {
    case "dev":
        config = {
            name: "DEV",
            baseUrl: "https://dev-api.testingacademy.com",
            apiKey: "dev_key_xxxx-xxxx",
            timeout: 5000,
            description: "Development environment for local testing"
        };
        break;

    case "staging":
        config = {
            name: "STAGING",
            baseUrl: "https://staging-api.testingacademy.com",
            apiKey: "stg_key_xxxx-xxxx",
            timeout: 8000,
            description: "Staging - Pre-production mirror"
        };
        break;

    case "qa":
        config = {
            name: "QA",
            baseUrl: "https://qa-api.testingacademy.com",
            apiKey: "qa_key_xxxx-xxxx",
            timeout: 6000,
            description: "Quality Assurance environment"
        };
        break;

    case "production":
    case "prod":
        config = {
            name: "PRODUCTION",
            baseUrl: "https://api.testingacademy.com",
            apiKey: "prod_key_xxxx-xxxx",
            timeout: 10000,
            description: "Live production environment"
        };
        break;

    default:
        config = {
            name: "UNKNOWN",
            baseUrl: "N/A",
            apiKey: "N/A",
            timeout: 0,
            description: "Invalid environment name."
        };
}

console.log(`
Environment: ${config.name}
Base URL: ${config.baseUrl}
API Key: ${config.apiKey}
Timeout: ${config.timeout}ms
Description: ${config.description}
`);