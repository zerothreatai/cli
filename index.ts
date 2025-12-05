#!/usr/bin/env node
import { program } from 'commander';
import showMenu from './src/menu.js';
import {startSetup} from './src/commands/start-setup.js';
import { config } from 'dotenv'

config({
  path: !process.env.WORKING_ENVIRONMENT ? `.env.prod`:`.env`
});

program
  .name("zt")
  .description("ZEROTHREAT AI CLI")
  .version("1.0.0");

program
  .command("menu")
  .description("Show main menu")
  .action(showMenu);

program.command("start-setup").action(startSetup);

if (!process.argv.slice(2).length) {
  showMenu();
} else {
  program.parse(process.argv);
}