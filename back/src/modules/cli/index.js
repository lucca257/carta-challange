#!/usr/bin/env node

const CliModule = require("./cli.module");
const command = process.env.npm_lifecycle_event;
const args = process.argv.slice(2);

try {
    CliModule.run(command, args);
} catch (error) {
    console.error(`\x1b[31m${error.message}\x1b[0m`);
    process.exit(1);
}
