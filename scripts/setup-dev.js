#!/usr/bin/env node

/**
 * Development Environment Setup Script
 * Comprehensive setup for Business Idea Generator App development
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DevSetup {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
    this.errors = [];
    this.warnings = [];
    this.steps = [];
  }

  async run() {
    console.log('🚀 Business Idea Generator App - Development Setup');
    console.log('='.repeat(60));
    
    try {
      await this.checkPrerequisites();
      await this.setupDirectories();
      await this.setupEnvironmentFiles();
      await this.fixPackageConfiguration();
      await this.installDependencies();
      await this.setupDatabase();
      await this.validateSetup();
      await this.createDevelopmentScripts();
      
      this.printSummary();
      
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
      process.exit(1);
    }
  }

  async checkPrerequisites() {
    this.logStep('Checking Prerequisites');
    
    // Check Node.js version
    try {
      const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
      const majorVersion = parseInt(nodeVersion.substring(1).split('.')[0]);
      
      if (majorVersion < 18) {
        throw new Error(`Node.js 18+ required, found ${nodeVersion}`);
      }
      
      console.log(`  ✅ Node.js ${nodeVersion} (compatible)`);
    } catch (error) {
      this.addError('Node.js 18+ is required but not found');
    }

    // Check npm
    try {
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      console.log(`  ✅ npm ${npmVersion}`);
    } catch (error) {
      this.addError('npm is required but not found');
    }

    // Check Git (optional but recommended)
    try {
      const gitVersion = execSync('git --version', { encoding: 'utf8' }).trim();
      console.log(`  ✅ ${gitVersion}`);
    } catch (error) {
      this.addWarning('Git not found - version control recommended');
    }
  }

  async setupDirectories() {
    this.logStep('Setting up Directory Structure');
    
    const directories = [
      'src/database',
      'src/testing',
      'src/security',
      'logs',
      'temp',
      'docs/api',
      'docs/development',
      '.vscode',
    ];

    directories.forEach(dir => {
      const fullPath = path.join(this.rootDir, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`  ✅ Created directory: ${dir}`);
      } else {
        console.log(`  ✓ Directory exists: ${dir}`);
      }
    });
  }

  async setupEnvironmentFiles() {
    this.logStep('Setting up Environment Files');
    
    // Create .env file
    const envPath = path.join(this.rootDir, '.env');
    if (!fs.existsSync(envPath)) {
      const envContent = `# Business Idea Generator App - Environment Configuration
# ================================================================

# Application Configuration
NODE_ENV=development
PORT=3001
API_BASE_URL=http://localhost:3001

# Database Configuration (Mock for development)
DATABASE_TYPE=mock
DATABASE_URL=memory://business-ideas

# AI Service Configuration
# Uncomment and add your API keys as needed
# OPENAI_API_KEY=your_openai_api_key_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
# PERPLEXITY_API_KEY=your_perplexity_api_key_here

# Security Configuration
JWT_SECRET=your_jwt_secret_minimum_32_characters_for_development
APP_SECRET=your_app_secret_for_development_environment

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000

# Logging
LOG_LEVEL=debug
LOG_FILE=logs/app.log

# Development Features
ENABLE_MOCK_SERVICES=true
ENABLE_DEBUG_LOGGING=true
ENABLE_HOT_RELOAD=true
ENABLE_TEST_ENDPOINTS=true
`;
      
      fs.writeFileSync(envPath, envContent);
      console.log('  ✅ Created .env file with development defaults');
    } else {
      console.log('  ✓ .env file already exists');
    }

    // Create .env.example
    const envExamplePath = path.join(this.rootDir, '.env.example');
    if (!fs.existsSync(envExamplePath)) {
      const envExampleContent = `# Business Idea Generator App - Environment Configuration Template
# Copy this file to .env and configure your specific values

NODE_ENV=development
PORT=3001
API_BASE_URL=http://localhost:3001

# Add your API keys here
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
PERPLEXITY_API_KEY=

# Security (generate secure values for production)
JWT_SECRET=
APP_SECRET=
`;
      
      fs.writeFileSync(envExamplePath, envExampleContent);
      console.log('  ✅ Created .env.example template');
    }

    // Create .gitignore if it doesn't exist or update it
    const gitignorePath = path.join(this.rootDir, '.gitignore');
    const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
*.tsbuildinfo

# Logs
logs/
*.log

# Temporary files
temp/
tmp/

# OS generated
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE
.vscode/settings.json
.idea/
*.swp
*.swo

# Test coverage
coverage/

# API keys and sensitive data
*.pem
*.key
config/secrets.json
`;

    if (!fs.existsSync(gitignorePath)) {
      fs.writeFileSync(gitignorePath, gitignoreContent);
      console.log('  ✅ Created .gitignore file');
    } else {
      console.log('  ✓ .gitignore file already exists');
    }
  }

  async fixPackageConfiguration() {
    this.logStep('Fixing Package Configuration');
    
    // Fix root package.json
    const packagePath = path.join(this.rootDir, 'package.json');
    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      // Ensure workspaces configuration is correct
      packageJson.workspaces = ["src/frontend", "src/backend"];
      
      // Fix scripts
      packageJson.scripts = {
        ...packageJson.scripts,
        "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
        "dev:backend": "cd src/backend && npm run dev",
        "dev:frontend": "cd src/frontend && npm run dev",
        "build": "npm run build:backend && npm run build:frontend",
        "build:backend": "cd src/backend && npm run build",
        "build:frontend": "cd src/frontend && npm run build",
        "test": "node scripts/test.js",
        "setup": "node scripts/setup-dev.js",
        "demo": "node demo.ts"
      };

      // Add development dependencies
      if (!packageJson.devDependencies) {
        packageJson.devDependencies = {};
      }
      
      packageJson.devDependencies.concurrently = "^8.0.0";
      packageJson.devDependencies.nodemon = "^3.0.0";
      
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      console.log('  ✅ Updated root package.json configuration');
    }

    // Create missing database module
    const dbIndexPath = path.join(this.rootDir, 'src/database/index.ts');
    if (!fs.existsSync(dbIndexPath)) {
      const dbContent = `/**
 * Database Module - Mock Implementation for Development
 */

import { BusinessIdeaRecord, UserPreferences } from '../interfaces/ServiceInterfaces';
import { AppLogger } from '../shared/utils';

export class MockDatabase {
  private logger = AppLogger.getInstance();
  private ideas: Map<string, BusinessIdeaRecord> = new Map();
  private preferences: Map<string, UserPreferences> = new Map();
  private isInitialized = false;

  async initialize(): Promise<void> {
    this.logger.info('Initializing Mock Database');
    this.isInitialized = true;
  }

  async getHealthStatus(): Promise<{ status: string; details: any }> {
    return {
      status: 'healthy',
      details: {
        type: 'mock',
        ideas: this.ideas.size,
        preferences: this.preferences.size,
        initialized: this.isInitialized
      }
    };
  }

  async saveBusinessIdea(idea: BusinessIdeaRecord): Promise<void> {
    this.ideas.set(idea.id, { ...idea, updatedAt: new Date() });
    this.logger.debug('Business idea saved', { id: idea.id });
  }

  async getBusinessIdea(id: string): Promise<BusinessIdeaRecord | null> {
    return this.ideas.get(id) || null;
  }

  async getAllBusinessIdeas(): Promise<BusinessIdeaRecord[]> {
    return Array.from(this.ideas.values());
  }

  async deleteBusinessIdea(id: string): Promise<void> {
    this.ideas.delete(id);
    this.logger.debug('Business idea deleted', { id });
  }

  async saveUserPreferences(userId: string, preferences: UserPreferences): Promise<void> {
    this.preferences.set(userId, preferences);
    this.logger.debug('User preferences saved', { userId });
  }

  async getUserPreferences(userId: string): Promise<UserPreferences | null> {
    return this.preferences.get(userId) || null;
  }

  async shutdown(): Promise<void> {
    this.logger.info('Shutting down Mock Database');
    this.ideas.clear();
    this.preferences.clear();
    this.isInitialized = false;
  }
}

export default MockDatabase;
`;
      
      fs.writeFileSync(dbIndexPath, dbContent);
      console.log('  ✅ Created mock database module');
    }
  }

  async installDependencies() {
    this.logStep('Installing Dependencies');
    
    try {
      console.log('  📦 Installing root dependencies...');
      execSync('npm install', { cwd: this.rootDir, stdio: 'pipe' });
      console.log('  ✅ Root dependencies installed');
      
      // Install frontend dependencies
      const frontendDir = path.join(this.rootDir, 'src/frontend');
      if (fs.existsSync(frontendDir)) {
        console.log('  📦 Installing frontend dependencies...');
        execSync('npm install', { cwd: frontendDir, stdio: 'pipe' });
        console.log('  ✅ Frontend dependencies installed');
      }
      
      // Install backend dependencies
      const backendDir = path.join(this.rootDir, 'src/backend');
      if (fs.existsSync(backendDir)) {
        console.log('  📦 Installing backend dependencies...');
        execSync('npm install', { cwd: backendDir, stdio: 'pipe' });
        console.log('  ✅ Backend dependencies installed');
      }
      
    } catch (error) {
      this.addWarning('Some dependencies may not have installed correctly');
      console.log('  ⚠️ You may need to install dependencies manually');
    }
  }

  async setupDatabase() {
    this.logStep('Setting up Development Database');
    
    console.log('  ✅ Mock database configured for development');
    console.log('  ℹ️ No external database required in development mode');
  }

  async validateSetup() {
    this.logStep('Validating Setup');
    
    // Check if key files exist
    const requiredFiles = [
      'src/main.ts',
      'src/interfaces/ServiceInterfaces.ts',
      'src/ai-service/index.ts',
      'src/database/index.ts',
      '.env'
    ];

    let allFilesExist = true;
    
    requiredFiles.forEach(file => {
      const filePath = path.join(this.rootDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`  ✅ ${file}`);
      } else {
        console.log(`  ❌ ${file} (missing)`);
        allFilesExist = false;
      }
    });

    if (!allFilesExist) {
      this.addWarning('Some required files are missing');
    }

    // Test TypeScript compilation
    try {
      execSync('npx tsc --noEmit', { cwd: this.rootDir, stdio: 'pipe' });
      console.log('  ✅ TypeScript compilation successful');
    } catch (error) {
      this.addWarning('TypeScript compilation has issues');
    }
  }

  async createDevelopmentScripts() {
    this.logStep('Creating Development Scripts');
    
    // Create test script
    const testScriptPath = path.join(this.rootDir, 'scripts/test.js');
    const testScriptContent = `#!/usr/bin/env node

/**
 * Test Runner Script
 */

const { spawn } = require('child_process');
const path = require('path');

async function runTests() {
  console.log('🧪 Running Business Idea Generator App Tests');
  console.log('='.repeat(50));
  
  // Run our test framework
  const testProcess = spawn('node', ['-r', 'ts-node/register', 'src/testing/TestFramework.ts'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  
  testProcess.on('close', (code) => {
    process.exit(code);
  });
}

runTests().catch(console.error);
`;
    
    if (!fs.existsSync(testScriptPath)) {
      fs.writeFileSync(testScriptPath, testScriptContent);
      console.log('  ✅ Created test runner script');
    }

    // Create VS Code configuration
    const vscodeSettingsPath = path.join(this.rootDir, '.vscode/settings.json');
    const vscodeSettings = {
      "typescript.preferences.importModuleSpecifier": "relative",
      "typescript.suggest.autoImports": true,
      "editor.formatOnSave": true,
      "editor.codeActionsOnSave": {
        "source.organizeImports": true
      },
      "files.exclude": {
        "**/node_modules": true,
        "**/dist": true,
        "**/.env": true
      }
    };
    
    if (!fs.existsSync(vscodeSettingsPath)) {
      fs.writeFileSync(vscodeSettingsPath, JSON.stringify(vscodeSettings, null, 2));
      console.log('  ✅ Created VS Code settings');
    }

    // Create launch configuration for debugging
    const launchConfigPath = path.join(this.rootDir, '.vscode/launch.json');
    const launchConfig = {
      "version": "0.2.0",
      "configurations": [
        {
          "name": "Debug Main App",
          "type": "node",
          "request": "launch",
          "program": "\${workspaceFolder}/src/main.ts",
          "outFiles": ["\${workspaceFolder}/dist/**/*.js"],
          "runtimeArgs": ["-r", "ts-node/register"],
          "env": {
            "NODE_ENV": "development"
          }
        },
        {
          "name": "Debug Demo",
          "type": "node",
          "request": "launch",
          "program": "\${workspaceFolder}/demo.ts",
          "outFiles": ["\${workspaceFolder}/dist/**/*.js"],
          "runtimeArgs": ["-r", "ts-node/register"],
          "env": {
            "NODE_ENV": "development"
          }
        }
      ]
    };
    
    if (!fs.existsSync(launchConfigPath)) {
      fs.writeFileSync(launchConfigPath, JSON.stringify(launchConfig, null, 2));
      console.log('  ✅ Created VS Code debugging configuration');
    }
  }

  logStep(step) {
    console.log(`\n🔧 ${step}`);
    this.steps.push(step);
  }

  addError(message) {
    this.errors.push(message);
    console.log(`  ❌ ${message}`);
  }

  addWarning(message) {
    this.warnings.push(message);
    console.log(`  ⚠️ ${message}`);
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('🎉 Development Setup Complete!');
    console.log('='.repeat(60));
    
    console.log(`\n📊 Summary:`);
    console.log(`  ✅ Steps completed: ${this.steps.length}`);
    console.log(`  ⚠️ Warnings: ${this.warnings.length}`);
    console.log(`  ❌ Errors: ${this.errors.length}`);
    
    if (this.warnings.length > 0) {
      console.log(`\n⚠️ Warnings:`);
      this.warnings.forEach(warning => console.log(`  - ${warning}`));
    }
    
    if (this.errors.length > 0) {
      console.log(`\n❌ Errors:`);
      this.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (this.errors.length === 0) {
      console.log(`\n🚀 Next Steps:`);
      console.log(`  1. Review and update .env file with your API keys`);
      console.log(`  2. Run: npm run dev (to start development servers)`);
      console.log(`  3. Run: npm run demo (to test the application)`);
      console.log(`  4. Run: npm test (to run the test suite)`);
      console.log(`  5. Visit http://localhost:3000 for the frontend`);
      console.log(`  6. Visit http://localhost:3001 for the backend API`);
      
      console.log(`\n📖 Development Info:`);
      console.log(`  - Frontend: React + Next.js on port 3000`);
      console.log(`  - Backend: Node.js + Express on port 3001`);
      console.log(`  - Database: Mock implementation (no external DB needed)`);
      console.log(`  - API Keys: Add to .env file for AI services`);
      console.log(`  - Logs: Check logs/ directory for application logs`);
    }
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  const setup = new DevSetup();
  setup.run().catch(console.error);
}

module.exports = DevSetup; 