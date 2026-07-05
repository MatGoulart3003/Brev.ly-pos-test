// tests hit the local database, so the env file must be loaded
// before any module imports src/env.ts
process.loadEnvFile();
