# Prettier Configuration

This project uses [Prettier](https://prettier.io/) for code formatting.

## Configuration

- **Configuration file**: `.prettierrc`
- **Ignore file**: `.prettierignore`
- **VS Code settings**: `.vscode/settings.json`

## Scripts

- `npm run format` - Format all files
- `npm run format:check` - Check if files are formatted
- `npm run format:fix` - Format all files including unknown types

## Settings

- **Semi**: false (no semicolons)
- **Quotes**: single quotes
- **Print width**: 100 characters
- **Tab width**: 2 spaces
- **Trailing comma**: ES5 compatible
- **Bracket spacing**: true
- **Arrow parens**: always

## IDE Integration

The project is configured to automatically format files on save in VS Code. Make sure you have the Prettier extension installed:

```
ext install esbenp.prettier-vscode
```

## Manual Formatting

To manually format files:

```bash
# Format all files
npm run format

# Check formatting
npm run format:check

# Format specific file
npx prettier --write path/to/file.ts
```
