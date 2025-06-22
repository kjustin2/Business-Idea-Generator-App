---
description: Rules for implementing new features and significant changes
globs: "**/*"
alwaysApply: false
---

# Feature Implementation Request Rules

## **Pre-Implementation Analysis**
Before starting any new feature:
1. **Understand the business requirement** - What problem are we solving?
2. **Review existing codebase** - How does this fit with current architecture?
3. **Identify affected modules** - Which parts of the system need changes?
4. **Check security implications** - What new attack vectors might this introduce?
5. **Plan the implementation** - Break down into specific, measurable tasks

## **Architecture Consideration**
- **Review existing interfaces** in `src/interfaces/` before creating new ones
- **Follow modular patterns** established in the project structure
- **Ensure loose coupling** between modules using dependency injection
- **Plan for testability** - How will this be unit and integration tested?
- **Consider performance impact** - Will this affect load times or response times?

## **Implementation Strategy**
- **Start with interfaces** - Define contracts before implementation
- **Implement incrementally** - Build in small, testable pieces
- **Keep files under 700 lines** - Split into multiple files if needed
- **Write tests as you go** - Don't leave testing until the end
- **Update documentation** - Keep README and API docs current

## **Security Integration**
- **Apply security rules** from the beginning, not as an afterthought
- **Validate all inputs** at module boundaries
- **Use environment variables** for any configuration
- **Implement proper error handling** without exposing sensitive data
- **Consider rate limiting** for any new endpoints

## **Quality Assurance**
- **Follow TypeScript strict mode** - No `any` types unless absolutely necessary
- **Use proper error boundaries** in React components
- **Implement proper logging** for debugging and monitoring
- **Test with production builds** using `npm run build`
- **Validate against existing tests** to ensure no regressions

## **TaskMaster Integration**
- **Create tasks** for each major component of the feature
- **Break down complex tasks** into manageable subtasks
- **Update task status** regularly as work progresses
- **Document decisions** and learnings in task details
- **Use task dependencies** to ensure proper implementation order

## **Business Logic Implementation**
For Business Idea Generator App specifically:
- **AI service integration** - How does this enhance idea generation or validation?
- **User experience** - How does this improve the user's journey?
- **Data flow** - How does information move through the system?
- **Performance** - How does this affect response times for idea generation?
- **Scalability** - How will this perform with multiple concurrent users?

## **Code Organization**
- **Place files in appropriate modules** (`frontend/`, `backend/`, `ai-service/`, etc.)
- **Use shared utilities** from `src/shared/` when appropriate
- **Define types** in `src/interfaces/` for cross-module communication
- **Follow naming conventions** established in the existing codebase
- **Maintain consistent file structure** within each module

## **Testing Strategy**
- **Unit tests** for individual functions and components
- **Integration tests** for module interactions
- **E2E tests** for complete user workflows
- **Security tests** for input validation and error handling
- **Performance tests** for API endpoints and UI responsiveness

## **Documentation Updates**
When implementing features, update:
- **README.md** - Add any new setup requirements or usage instructions
- **API documentation** - Document new endpoints or changes to existing ones
- **Component documentation** - Explain complex UI components
- **Configuration docs** - Document any new environment variables
- **Architecture diagrams** - Update if module relationships change

## **Review Checklist**
Before considering a feature complete:
- [ ] All files are under 700 lines
- [ ] TypeScript types are properly defined
- [ ] Security rules are followed
- [ ] Error handling is implemented
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] TaskMaster tasks are completed
- [ ] Production build works correctly
- [ ] No sensitive data is exposed
- [ ] Performance is acceptable 