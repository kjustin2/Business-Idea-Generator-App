---
description: Development workflow and modular architecture rules with performance optimization
globs: "**/*"
alwaysApply: true
---

# Development Workflow Rules

## **Performance-First Architecture**
- **Keep all files under 700 lines** - Split immediately when approaching this limit
- **Each module should be independent and self-contained**
- Modules communicate only through well-defined interfaces
- Separate concerns: frontend, backend, AI service, database
- Use dependency injection for loose coupling
- **Implement lazy loading** for all non-critical components
- Example structure:
  ```
  src/
  ├── frontend/         # React/Next.js UI components (max 700 lines per file)
  ├── backend/          # Express.js API server (modular routes)
  ├── ai-service/       # AI integration module (async/cached)
  ├── database/         # Database layer (optimized queries)
  ├── shared/           # Common interfaces and types
  └── interfaces/       # Module interface definitions
  ```

## **Interface Definitions**
- Define clear contracts between modules
- Use TypeScript interfaces for type safety
- Document expected inputs and outputs
- Example:
  ```typescript
  // ✅ DO: Define clear interfaces
  interface IdeaGeneratorService {
    generateIdea(prompt: string, options: GenerationOptions): Promise<BusinessIdea>;
    validateIdea(idea: BusinessIdea): ValidationResult;
  }
  
  interface BusinessIdea {
    title: string;
    description: string;
    marketAnalysis: MarketData;
    feasibilityScore: number;
  }
  ```

## **Module Independence Rules**
- **Modules should not directly import from other modules**
- Use dependency injection or service locators
- Each module has its own package.json (for larger projects)
- Modules can be developed and tested independently
- Example:
  ```javascript
  // ✅ DO: Use dependency injection
  class IdeaController {
    constructor(private ideaService: IdeaGeneratorService) {}
  }
  
  // ❌ DON'T: Direct module imports
  import { generateIdea } from '../ai-service/generator';
  ```

## **Production-First Testing Strategy**
- **NEVER use `npm start` or `npm run dev` for testing - ALWAYS use `npm run build`**
- **Test performance with production builds** - Development mode hides performance issues
- **Monitor bundle sizes** during testing - Large bundles indicate architecture problems
- Each module should have independent test suites
- Use mock services for inter-module dependencies
- **Test error scenarios** as thoroughly as success scenarios
- Example test structure:
  ```
  tests/
  ├── unit/             # Unit tests for individual modules
  ├── integration/      # Integration tests between modules
  ├── performance/      # Bundle size and runtime performance tests
  └── e2e/             # End-to-end tests with production builds
  ```

## **Build and Deployment Rules**
- Use build scripts that don't start persistent servers
- Validate builds without running development servers
- Each module should be buildable independently
- Use production-like configurations for testing

## **Version Control Workflow**
- Create feature branches for each module development
- Use conventional commit messages
- Update .gitignore, cursor rules, and README as we develop
- Always include security updates in commits

## **File Organization**
- Group files by feature/module, not by type
- Use consistent naming conventions across modules
- Keep configuration files at appropriate levels
- Example:
  ```
  src/frontend/
  ├── components/
  ├── hooks/
  ├── services/
  ├── types/
  └── utils/
  
  src/backend/
  ├── controllers/
  ├── middleware/
  ├── routes/
  ├── services/
  └── types/
  ```

## **Configuration Management**
- Use environment-specific configuration files
- Never commit sensitive configuration
- Use configuration validation at startup
- Example:
  ```javascript
  // ✅ DO: Validate configuration
  const config = {
    port: process.env.PORT || 3000,
    apiKey: process.env.OPENAI_API_KEY,
    database: process.env.DATABASE_URL
  };
  
  if (!config.apiKey) {
    throw new Error('OPENAI_API_KEY is required');
  }
  ```

## **Error Handling Patterns**
- Use consistent error handling across modules
- Implement proper error boundaries in React
- Use structured error responses in APIs
- Log errors appropriately without exposing sensitive data

## **Performance Considerations**
- Implement lazy loading for modules
- Use code splitting for frontend bundles
- Optimize API responses and database queries
- Monitor performance metrics

## **Documentation Standards**
- Update README.md with each major change
- Document API endpoints and interfaces
- Include setup instructions for each module
- Maintain changelog for significant updates

## **State Management**
- Use appropriate state management for each module
- Frontend: React hooks, Context API, or Redux Toolkit
- Backend: Stateless design with proper session handling
- Database: Proper transaction management

## **Security Integration**
- Follow security rules in all modules
- Implement security headers in all HTTP responses
- Use proper authentication and authorization
- Regular security audits of dependencies

## **Local Development**
- Use Docker for consistent development environments (optional)
- Implement hot reloading for development efficiency
- Use environment files for local configuration
- Ensure modules can be started independently for development

## **Code Quality**
- Use ESLint and Prettier for code formatting
- Implement pre-commit hooks for code quality
- Use TypeScript for type safety
- Regular code reviews for architecture compliance

## **Continuous Integration**
- Build and test all modules in CI/CD pipeline
- Run security scans on dependencies
- Validate that modules work together
- Use automated testing for pull requests

## **Professional Development Standards**
- **File Size Management** - Automatically split files approaching 700 lines
- **Documentation-Driven Development** - Update docs before, during, and after implementation
- **Error-First Thinking** - Plan for failure scenarios before happy path
- **Performance Awareness** - Consider impact on load times and user experience
- **Security by Default** - Apply security measures from the start, not as afterthought

## **Senior Developer Practices**
- **Code Review Mindset** - Write code as if it will be reviewed by experts
- **Future-Proof Architecture** - Design for extensibility and maintainability
- **Technical Debt Management** - Refactor proactively during feature development
- **Knowledge Sharing** - Document decisions and patterns for team learning
- **Business Value Focus** - Prioritize features that deliver maximum user value

## **Velocity Optimization**
- **Parallel Development** - Design modules for independent development
- **Reusable Patterns** - Create and use common patterns across the codebase
- **Smart Defaults** - Provide sensible defaults to reduce configuration overhead
- **Automated Processes** - Automate repetitive tasks like testing and deployment
- **Context Switching Reduction** - Minimize the mental overhead of changing between tasks