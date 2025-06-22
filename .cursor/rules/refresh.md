---
description: Rules for debugging, error resolution, and comprehensive problem analysis
globs: "**/*"
alwaysApply: false
---

# Debug and Refresh Analysis Rules

## **Comprehensive Problem Analysis**
When encountering errors or complex issues:
1. **Stop and analyze the full context** - Don't just look at the immediate error
2. **Review the entire error chain** - Trace from root cause to manifestation
3. **Check all related files** - Don't focus only on the obvious suspects
4. **Consider recent changes** - What was modified that might have caused this?
5. **Review system interactions** - How do different modules interact in this scenario?

## **Systematic Debugging Approach**
- **Read error messages completely** - Don't skip details or stack traces
- **Check multiple layers** - Frontend, backend, database, external APIs
- **Verify environment configuration** - Are all required env vars set correctly?
- **Test with production builds** - Use `npm run build`, never `npm start` for testing
- **Isolate the problem** - Create minimal reproduction if possible

## **File and Module Analysis**
- **Review all files in the error path** - Not just the one mentioned in the error
- **Check imports and exports** - Verify module dependencies are correct
- **Validate TypeScript types** - Ensure type definitions match actual usage
- **Review interface implementations** - Confirm contracts are being followed
- **Check for circular dependencies** - These can cause subtle issues

## **Business Idea Generator Specific Debugging**
- **AI service interactions** - Check API key validity and request/response formats
- **Data flow validation** - Verify data passes correctly between modules
- **Security middleware** - Ensure security headers and validation aren't blocking legitimate requests
- **Rate limiting issues** - Check if rate limits are being hit during testing
- **Environment variable setup** - Verify all required vars are in `.env.example`

## **Performance Issue Analysis**
- **Check bundle sizes** - Are there unexpected large dependencies?
- **Review database queries** - Are they optimized and properly indexed?
- **Analyze network requests** - Are there unnecessary or slow API calls?
- **Monitor memory usage** - Are there memory leaks or excessive allocation?
- **Test with realistic data** - Small datasets might hide performance issues

## **Security Issue Investigation**
- **Review input validation** - Is all user input properly sanitized?
- **Check authentication flows** - Are auth tokens being handled correctly?
- **Verify environment security** - Are API keys or secrets exposed anywhere?
- **Test error responses** - Do errors leak sensitive information?
- **Validate CORS settings** - Are cross-origin requests configured correctly?

## **Architectural Analysis**
- **Review module boundaries** - Are modules properly isolated?
- **Check dependency injection** - Are services being injected correctly?
- **Validate interface contracts** - Do implementations match their interfaces?
- **Review data models** - Are types consistent across modules?
- **Check configuration flow** - Is config being passed correctly through the system?

## **Testing and Validation**
- **Test all affected paths** - Don't just fix the obvious issue
- **Verify edge cases** - Test with empty data, invalid input, network failures
- **Check error handling** - Ensure graceful degradation when things fail
- **Test production builds** - Always validate fixes with `npm run build`
- **Run comprehensive tests** - Unit, integration, and E2E tests

## **Documentation and Knowledge Capture**
- **Document the root cause** - Not just the fix, but why it happened
- **Update TaskMaster tasks** - Record findings and solution details
- **Update relevant documentation** - README, API docs, troubleshooting guides
- **Create or update error handling patterns** - Help prevent similar issues
- **Review and update Cursor rules** - Improve guidance based on learnings

## **Common Issue Patterns**
Look for these frequent problems:
- **File size issues** - Files over 700 lines causing confusion
- **Missing error handling** - Unhandled promise rejections or exceptions
- **Type mismatches** - TypeScript/runtime type inconsistencies
- **Environment configuration** - Missing or incorrect env vars
- **Module import issues** - Circular dependencies or incorrect paths
- **Security configuration** - Overly restrictive or missing security measures

## **Systematic Resolution Process**
1. **Understand the full scope** of the problem
2. **Identify all affected components** and their relationships
3. **Create a plan** for systematic resolution
4. **Fix root causes** not just symptoms
5. **Test thoroughly** including edge cases
6. **Document the solution** for future reference
7. **Update prevention measures** (tests, validation, documentation)

## **Professional Standards for Problem Resolution**
- **Take time to understand** before rushing to fix
- **Consider the impact** of changes on other parts of the system
- **Test comprehensively** to ensure the fix doesn't break other functionality
- **Communicate clearly** about what was wrong and how it was fixed
- **Learn from the issue** to prevent similar problems in the future

## **Context Refresh Protocol**
When the AI seems confused or stuck:
1. **Review the entire conversation** history for context
2. **Re-examine the project structure** and current state
3. **Check recent file changes** and their relationships
4. **Verify current task status** in TaskMaster
5. **Refresh understanding** of the business requirements
6. **Start with small, isolated changes** to rebuild confidence

## **Resolution Verification**
Before considering an issue resolved:
- [ ] Root cause identified and documented
- [ ] Fix implemented and tested
- [ ] No new issues introduced
- [ ] Production build successful
- [ ] All affected tests passing
- [ ] Documentation updated
- [ ] TaskMaster tasks updated
- [ ] Prevention measures in place 