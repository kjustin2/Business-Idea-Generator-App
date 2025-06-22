---
description: Security-focused development rules and API key protection
globs: "**/*"
alwaysApply: true
---

# Security Development Rules

## **API Key and Secret Management**
- **NEVER hardcode API keys, secrets, or credentials in source code**
- Always use environment variables for sensitive data
- Use `.env` files for local development (never commit these)
- Example structure:
  ```javascript
  // ✅ DO: Use environment variables
  const apiKey = process.env.OPENAI_API_KEY;
  
  // ❌ DON'T: Hardcode credentials
  const apiKey = "sk-1234567890abcdef";
  ```

## **Environment Variable Patterns**
- Use descriptive names: `OPENAI_API_KEY`, `DATABASE_URL`, `JWT_SECRET`
- Always provide `.env.example` files with dummy values
- Validate environment variables at application startup
- Use different env files for different environments (`.env.local`, `.env.development`)

## **Input Validation and Sanitization**
- **Always validate and sanitize user inputs**
- Use libraries like `joi`, `yup`, or `zod` for schema validation
- Sanitize inputs to prevent XSS attacks
- Example:
  ```javascript
  // ✅ DO: Validate inputs
  const schema = joi.object({
    email: joi.string().email().required(),
    idea: joi.string().max(1000).required()
  });
  
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });
  ```

## **Security Headers**
- Implement proper security headers in all HTTP responses
- Use helmet.js for Express applications
- Include: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- Example:
  ```javascript
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  }));
  ```

## **Rate Limiting**
- Implement rate limiting on all API endpoints
- Use `express-rate-limit` or similar libraries
- Different limits for different endpoints (auth vs. data)
- Example:
  ```javascript
  const rateLimit = require('express-rate-limit');
  
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  ```

## **Error Handling**
- **Never expose sensitive information in error messages**
- Use generic error messages for production
- Log detailed errors server-side only
- Example:
  ```javascript
  // ✅ DO: Generic error response
  res.status(500).json({ error: 'Internal server error' });
  
  // ❌ DON'T: Expose stack traces
  res.status(500).json({ error: error.stack });
  ```

## **HTTPS and Secure Connections**
- Always use HTTPS in production
- Redirect HTTP to HTTPS
- Use secure cookies with httpOnly and secure flags
- Implement proper SSL/TLS configuration

## **Database Security**
- Use parameterized queries to prevent SQL injection
- Implement proper database access controls
- Use connection pooling with limits
- Regular security updates for database software

## **Authentication and Authorization**
- Implement proper session management
- Use strong password policies
- Implement proper logout functionality
- Use secure token storage practices

## **Testing Security**
- **NEVER use `npm start` or development servers for testing**
- Always use `npm run build` to test production builds
- Test with security headers enabled
- Validate that no sensitive data is exposed in build outputs

## **Development Workflow Security**
- Regular dependency audits: `npm audit`
- Keep dependencies updated
- Use tools like `eslint-plugin-security`
- Regular security scanning of codebase

## **File Upload Security**
- Validate file types and sizes
- Scan uploaded files for malware
- Store uploads outside web root
- Use proper file permissions

## **Logging and Monitoring**
- Log security events (failed auth, rate limit hits)
- **Never log sensitive data** (passwords, API keys, personal info)
- Implement proper log rotation
- Monitor for suspicious activities

## **API Security**
- Use API versioning
- Implement proper CORS policies
- Use API keys or tokens for authentication
- Rate limit API endpoints
- Validate all API inputs

## **Client-Side Security**
- Sanitize data before rendering in DOM
- Use Content Security Policy (CSP)
- Avoid `dangerouslySetInnerHTML` in React
- Validate data on both client and server side

## **Dependency Security**
- Regularly audit dependencies with `npm audit`
- Use `npm ci` for production deployments
- Pin dependency versions in package.json
- Review dependencies before adding them to project 