# Fish SDK

An open-source software development kit for Discord.js bots. Originally developed for Songfish, an open-source invite-based Discord music bot, it has since been adapted for other uses and is now available for anyone to use.

## Why Fish?

While you should probably write your own bot from scratch, Fish allows for developers to quickly get started on a Discord.js bot in minutes. It takes care of the tedious tasks of setting up the boring event and command handlers and provides useful utilities (like an in-built, visually appealing formatted logger, Interaction support, and in-built database support with Keyv) to make developers' lives easier.

## Installation & Getting Started
The Fish SDK uses Babel to transpile the code into Node. Simply clone the repository, install dependencies (`yarn install` or `npm i`), and run the `start` script (`yarn start` or `npm start`).

> **Warning**
> Do NOT use the `build` or `prod` scripts. These are currently broken and WILL NOT work, since Fish currently references commands using strict paths. We plan to find a solution to this in the future.

### Configuration
`config.example.js` contains the default configuration for Fish (along with explainers for most keys). You can copy this file to `config.js` and edit it to match your needs. You **MUST** create a `config.js` file for Fish to work.

You can add custom keys to the `config.js` file, however it is recommended that you prefix them or add them to an application-specific object in order to avoid conflicts with future Fish updates.

> **Note**
> It is highly recommended to update the `config.example.js` file when adding custom keys, for documentation purposes.

### Creating interactions and events
Fish uses a simple, easy-to-use system for creating interactions and events. `src/events` contains all events, while `src/interactions` contains folders pertaining to specific categories for interactions (commands, buttons, modals, etc.)

An example interaction would look like this:
```js
import { SlashCommandBuilder } from "discord.js";

const metadata = {
    name: "example", // The name of the command
    type: "CommandInteraction", // The type of interaction (CommandInteraction, ButtonInteraction, ModalInteraction, etc.)
    proctorOnly: false, // Whether or not the command is only available to administrators
    dmCommand: false, // Whether or not the command can be used in DMs
    builder: new SlashCommandBuilder()// This is a SlashCommandBuilder object from discord.js. This can be used to specify internationalization options for command descriptions, add arguments, etc. Do not set the name of the command, this is done automatically by Fish at loadtime.
        .setDescription(`An example interaction.`),
    i18n: { // Internationalization options. This is optional, but highly recommended.
        "default": {
            "success": "Hello, %s!"
        }
    }
};

async function execute(ctx, interaction) { // The execute function is called when the interaction is triggered. Interaction is a interaction object from discord.js, and ctx is a context object containing core utilities like Database Services, the Logger, and the Discord.js client.
    const response = metadata.i18n[`${metadata.i18n[interaction.locale] ? interaction.locale : "default"}`].success.replace("%s", interaction.user.tag);
    // This is an example of how to pull a string from the i18n object. In this case, what is used above is the same as doing metadata.i18n.default.success, but it will use the user's locale if it exists in the i18n object.
    await interaction.reply(response);
};

export { metadata, execute }; // Export the metadata and execute functions.
```