---
description: 'Guidelines for building TypeScript and React applications'
applyTo: '**/*.{ts,tsx}'
---

# TypeScript / React Development

## TypeScript Instructions

- Always use the latest TypeScript version and enable strict mode (`"strict": true` in `tsconfig.json`).
- Write clear and concise JSDoc comments for every exported function, component, and type.

## General Instructions

- Make only high confidence suggestions when reviewing code changes.
- Write code with good maintainability practices, including comments on why certain design decisions were made.
- Handle edge cases and write clear error handling.
- For libraries or external dependencies, mention their usage and purpose in comments.

## Naming Conventions

- Use `PascalCase` for React component names, classes, types, interfaces, and enums.
- Use `camelCase` for variables, function names, and object properties.
- Use `UPPER_SNAKE_CASE` for module-level constants that are truly constant.
- Prefix boolean variables and props with `is`, `has`, or `can` (e.g., `isLoading`, `hasError`).
- Name event handler props with an `on` prefix and their implementations with `handle` (e.g., prop `onClick`, handler `handleClick`).
- Do **not** prefix interfaces with `I`; use descriptive names instead (e.g., `UserService`, not `IUserService`).

## Formatting

- Apply code-formatting style defined in `.prettierrc` (single quotes, no semicolons, 100-char print width, trailing commas).
- Always add a blank line between import groups: external packages, then internal workspace imports, then relative imports.
- Prefer arrow functions over `function` declarations for callbacks and component definitions.
- Keep components focused — if a component exceeds ~150 lines, consider splitting it.

## TypeScript Type System

- Prefer `type` aliases for object shapes and union/intersection types; use `interface` only when declaration merging is needed.
- Always use `import type` when importing a type that is not used as a value.
- Do not use `any`; use `unknown` for truly unknown inputs and narrow the type before use.
- Avoid non-null assertions (`!`); use optional chaining (`?.`) and nullish coalescing (`??`) instead.
- Enable and respect all strict compiler options: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`.
- Prefer `const` over `let`; never use `var`.
- Use `as const` for literal tuples and objects whose shape should not widen.

## React Components

- Prefer functional components with hooks; do not write class components.
- Define component props with a `type` (e.g., `type ButtonProps = { ... }`).
- Keep components pure — avoid side effects outside of `useEffect`.
- Use the `use` prefix for custom hooks (e.g., `useAuth`, `useFetch`).
- Use `React.memo` only when profiling shows it is necessary — do not apply it by default.
- Export components as named exports; avoid default exports for reusable components.

## State Management

- Prefer local state (`useState`, `useReducer`) and lifting state up before reaching for global solutions.
- Use `useContext` for cross-cutting concerns (theme, auth); avoid deeply nested prop-drilling.
- Keep state minimal — derive values from existing state rather than duplicating.

## Error Handling

- Wrap async operations in try/catch; never silently swallow errors.
- Use React Error Boundaries for component-level error isolation.
- Provide meaningful error messages with enough context to diagnose the issue.
- Validate external data (API responses, user input) at the boundary before using it.

## Null and Undefined

- Prefer `undefined` over `null` for optional values in application code; treat `null` as an intentional "no value" from external sources (APIs, DOM).
- Use optional chaining (`?.`) and nullish coalescing (`??`) instead of manual null checks.
- Do not use the non-null assertion operator (`!`); narrow types explicitly.

## Imports and Modules

- Use workspace path aliases (e.g., `@eos/shared-ui`) instead of deep relative paths across package boundaries.
- Keep imports sorted: external packages → workspace packages → relative imports.
- Use `import type` for type-only imports to improve build performance and clarity.

## Linting

- All lint rules are defined in the root [`eslint.config.js`](../../eslint.config.js) and extended by each project.
- ESLint rules are set to `warn` severity; fix warnings before merging.
- Do not disable ESLint rules with inline comments unless absolutely necessary — prefer fixing the root cause.
- Run `pnpm nx eslint:lint <project>` to lint a project, or `pnpm nx run-many -t eslint:lint` for all.

## Testing

- Always include test cases for critical paths of the application.
- Use Vitest for unit and component tests.
- Do not emit "Act", "Arrange" or "Assert" comments.
- Copy existing style in nearby files for test method names.
- Co-locate test files next to the source file using the `.test.ts` / `.test.tsx` suffix.
- Mock external dependencies at the module level using `vi.mock`.
- Prefer testing behaviour over implementation details.

## Performance

- Use `React.lazy` and `Suspense` for code-splitting on route boundaries.
- Avoid creating new object or array literals inside the render function when they are passed as props — memoize with `useMemo` or `useCallback` only where profiling shows it matters.
- Prefer CSS transitions over JS-driven animations for simple UI effects.
