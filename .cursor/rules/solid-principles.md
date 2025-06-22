---
description: SOLID principles for enterprise-grade code structure and maintainability
globs: "**/*"
alwaysApply: true
---

# SOLID Principles for Business Idea Generator App

## **Single Responsibility Principle (SRP)**
Each component should have exactly ONE reason to change:
- **Classes/modules focus on a single capability**
- Functions perform one logical operation
- Avoid "god" classes that handle multiple concerns
- Split components with "and" in their purpose description

**Implementation Guidelines:**
- Name classes/modules after their single responsibility
- **Keep components small and focused (<200 lines recommended)**
- Use dependency injection for required services
- Extract unrelated functionality into separate components

**Examples:**
```typescript
// ✅ DO: Single responsibility
class IdeaGenerator {
  generateIdea(prompt: string): Promise<BusinessIdea> { /* ... */ }
}

class IdeaValidator {
  validateIdea(idea: BusinessIdea): ValidationResult { /* ... */ }
}

// ❌ DON'T: Multiple responsibilities
class IdeaManager {
  generateIdea() { /* ... */ }
  validateIdea() { /* ... */ }
  saveToDatabase() { /* ... */ }
  sendEmail() { /* ... */ }
}
```

## **Open/Closed Principle (OCP)**
Software entities should be open for extension, closed for modification:
- **Use interfaces and abstract classes** for extensibility
- Add new functionality without modifying existing code
- Use strategy pattern for different AI providers
- Plugin architecture for different idea generation strategies

**Implementation Guidelines:**
```typescript
// ✅ DO: Open for extension
interface AIProvider {
  generateIdea(prompt: string): Promise<string>;
}

class OpenAIProvider implements AIProvider {
  generateIdea(prompt: string): Promise<string> { /* ... */ }
}

class ClaudeProvider implements AIProvider {
  generateIdea(prompt: string): Promise<string> { /* ... */ }
}

// ❌ DON'T: Modification required for new providers
class IdeaService {
  async generateIdea(provider: string, prompt: string) {
    if (provider === 'openai') { /* ... */ }
    if (provider === 'claude') { /* ... */ }
    // Adding new provider requires modifying this method
  }
}
```

## **Liskov Substitution Principle (LSP)**
Objects should be replaceable with instances of their subtypes:
- **Subtypes must honor the contract** of their base types
- Don't strengthen preconditions or weaken postconditions
- Ensure interface implementations behave consistently
- Use proper inheritance hierarchies

**Implementation Guidelines:**
```typescript
// ✅ DO: Proper substitution
interface DataValidator {
  validate(data: unknown): ValidationResult;
}

class EmailValidator implements DataValidator {
  validate(email: string): ValidationResult {
    // Always returns ValidationResult, never throws
    return { isValid: this.isValidEmail(email), errors: [] };
  }
}

class IdeaValidator implements DataValidator {
  validate(idea: BusinessIdea): ValidationResult {
    // Same return type and behavior contract
    return { isValid: this.isValidIdea(idea), errors: [] };
  }
}
```

## **Interface Segregation Principle (ISP)**
Clients shouldn't depend on interfaces they don't use:
- **Create specific, focused interfaces** rather than large ones
- Split large interfaces into smaller, cohesive ones
- Don't force classes to implement methods they don't need
- Use composition over inheritance

**Implementation Guidelines:**
```typescript
// ✅ DO: Segregated interfaces
interface IdeaGenerator {
  generateIdea(prompt: string): Promise<BusinessIdea>;
}

interface IdeaValidator {
  validateIdea(idea: BusinessIdea): ValidationResult;
}

interface IdeaPersistence {
  saveIdea(idea: BusinessIdea): Promise<void>;
  loadIdea(id: string): Promise<BusinessIdea>;
}

// ❌ DON'T: Large, monolithic interface
interface IdeaService {
  generateIdea(prompt: string): Promise<BusinessIdea>;
  validateIdea(idea: BusinessIdea): ValidationResult;
  saveIdea(idea: BusinessIdea): Promise<void>;
  loadIdea(id: string): Promise<BusinessIdea>;
  sendEmailNotification(email: string): Promise<void>;
  generateReport(ideas: BusinessIdea[]): Report;
}
```

## **Dependency Inversion Principle (DIP)**
High-level modules shouldn't depend on low-level modules:
- **Both should depend on abstractions** (interfaces)
- Abstractions shouldn't depend on details
- Details should depend on abstractions
- Use dependency injection for loose coupling

**Implementation Guidelines:**
```typescript
// ✅ DO: Depend on abstractions
interface DatabaseRepository {
  save(data: any): Promise<void>;
  find(id: string): Promise<any>;
}

class IdeaService {
  constructor(
    private readonly repository: DatabaseRepository,
    private readonly aiProvider: AIProvider
  ) {}
  
  async createIdea(prompt: string): Promise<BusinessIdea> {
    const generated = await this.aiProvider.generateIdea(prompt);
    const idea = this.parseIdea(generated);
    await this.repository.save(idea);
    return idea;
  }
}

// ❌ DON'T: Depend on concrete implementations
class IdeaService {
  private readonly database = new MongoDB(); // Direct dependency
  private readonly openai = new OpenAI();   // Direct dependency
  
  async createIdea(prompt: string): Promise<BusinessIdea> {
    // Tightly coupled to specific implementations
  }
}
```

## **Practical Application in Business Idea Generator**

**Module Structure:**
```
src/
├── interfaces/           # Abstractions (ISP, DIP)
│   ├── AIProvider.ts
│   ├── DataRepository.ts
│   └── ValidationService.ts
├── services/            # Business logic (SRP, OCP)
│   ├── IdeaGeneratorService.ts
│   ├── IdeaValidatorService.ts
│   └── BusinessPlanService.ts
├── providers/           # Implementations (LSP, DIP)
│   ├── OpenAIProvider.ts
│   ├── ClaudeProvider.ts
│   └── DatabaseProvider.ts
└── controllers/         # Coordination (DIP)
    ├── IdeaController.ts
    └── ValidationController.ts
```

**Benefits for This Project:**
- **Testability** - Easy to mock dependencies for unit tests
- **Maintainability** - Changes in one module don't affect others
- **Scalability** - Easy to add new AI providers or validation rules
- **Team Development** - Modules can be developed independently
- **Performance** - Lazy loading and dependency injection optimize resource usage

## **Code Review Checklist**
- [ ] Each class has a single, clear responsibility
- [ ] New functionality extends rather than modifies existing code
- [ ] Interface implementations are truly substitutable
- [ ] Interfaces are focused and specific to their clients
- [ ] High-level modules depend on abstractions, not concrete classes
- [ ] Files are under 700 lines and properly modularized
- [ ] Dependencies are injected rather than hard-coded 