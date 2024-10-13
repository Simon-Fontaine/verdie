import '#root/config';

// Import all plugins
import '@sapphire/plugin-api/register';
import '@sapphire/plugin-editable-commands/register';
import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-subcommands/register';
import '@sapphire/plugin-i18next/register';
import '@sapphire/plugin-scheduled-tasks/register';

// Import all registries
import '#lib/setup/application-registries';
import '#lib/setup/colorette';
import '#lib/setup/inspect';
import '#lib/setup/prisma';
