# Verdie Repository Guidelines

> [!WARNING]
> This project is currently in active development, and it is not recommended to use it in its current form. No support will be provided for unofficial versions until a "Release" version is published.
> [!NOTE]
> The complete documentation and additional details will be available in this README.md once the first official version has been released. Thank you for your understanding and interest in Verdie!

## Acknowledgements

The base of the bot handler is highly inspired by the work of [BirthdayyBot](https://github.com/BirthdayyBot/BirthdayyBot).

## Commit Messages

Use clear and descriptive commit messages with the following prefixes:

- `feat`: Introducing a new feature
- `fix`: Fixing a bug
- `docs`: Changes to documentation
- `style`: Code style changes (formatting, indentation)
- `refactor`: Code restructuring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Miscellaneous tasks (updating build tasks, package manager configs)

**Example**:

```text
feat: add ban command to moderation module
```

## How to use it?

### Prerequisite

```sh
npm install
```

### Development

This example can be run with `tsc-watch` to watch the files and automatically restart your bot.

```sh
npm run watch:start
```

### Production

You can also run the bot with `npm dev`, this will first build your code and then run `node ./dist/index.js`. But this is not the recommended way to run a bot in production.
