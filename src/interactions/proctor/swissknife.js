import { SlashCommandBuilder, ActivityType } from "discord.js";
import chalk from "chalk";

const metadata = {
    name: "swissknife",
    type: "CommandInteraction",
    proctorOnly: true,
    dmCommand: true,
    builder: new SlashCommandBuilder()
        .setDescription("The Swiss Knife contains various commands used for managing Fish's operations.")
        .addSubcommand(subcommand =>
            subcommand.setName("reload")
                .setDescription("Reloads the bot's commands.")
                .addBooleanOption(option => option.setName("register").setDescription("Register new commands to Discord?"))
        ).addSubcommand(subcommand =>
            subcommand.setName("status")
                .setDescription("Set the bot's status.")
                    .addStringOption(option => option.setName("status").setDescription("The status to set.").setRequired(true))
                    .addNumberOption(option => option.setName("type").setDescription("The type of status to set.").addChoices(
                        { name: "Playing", value: ActivityType.Playing },
                        { name: "Streaming", value: ActivityType.Streaming },
                        { name: "Listening", value: ActivityType.Listening },
                        { name: "Watching", value: ActivityType.Watching },
                        { name: "Competing", value: ActivityType.Competing },
                    ).setRequired(true))
        ),
    subCommands: {
        "reload": async (ctx, interaction) => {
            await interaction.deferReply();
            const register = interaction.options.getBoolean("register");
            if (register) {
                ctx.LogManager.log(`Reloading commands (Discord re-registration: ${chalk.bold["red"]("true")})`, "load", "CommandManagerBridge");
                await ctx.CommandManager.loadCommands(ctx, true);
                ctx.LogManager.log(`Reloaded ${chalk.bold(ctx.CommandManager.commands.size)} commands`, "load", "CommandManagerBridge");
                return await interaction.editReply(`Reloaded and re-registered **${ctx.CommandManager.commands.size}** commands successfully.`);
            } else {
                ctx.LogManager.log(`Reloading commands (Discord re-registration: ${chalk.bold["green"]("false")})`, "load", "CommandManagerBridge");
                await ctx.CommandManager.loadCommands(ctx, false);
                ctx.LogManager.log(`Reloaded ${chalk.bold(ctx.CommandManager.commands.size)} commands`, "load", "CommandManagerBridge");
                return await interaction.editReply(`Reloaded **${ctx.CommandManager.commands.size}** commands successfully.`);
            };
        },
        status: async (ctx, interaction) => { 
            const status = interaction.options.getString("status");
            const type = interaction.options.getNumber("type");
            await interaction.deferReply();

            ctx.LogManager.log(`Setting status to ${chalk.bold(status)} (${chalk.bold(type)})`, "load", "CommandManagerBridge");
            await ctx.client.user.setActivity(status, { type: type });
            return await interaction.editReply(`Set status to ${status} (${type}) successfully.`);
        }
    }
};

async function execute(ctx, interaction) {
    const subCommand = interaction.options.getSubcommand();
    if (metadata.subCommands[subCommand]) {
        return await metadata.subCommands[subCommand](ctx, interaction);
    } else {
        return await interaction.reply("This subcommand is not yet implemented.");
    };
};

export { metadata, execute };