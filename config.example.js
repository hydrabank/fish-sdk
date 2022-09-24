// This is the configuration file for Fish. It supports JavaScript modules, however unlike the main portions of the bot, it does NOT support Babel.
// Only CommonJS-exported modules are supported.

const { ActivityType } = require("discord.js");
module.exports = {
    discord: {
        clientID: "461995836063088652", // The client ID of this Fish SDK instance. This ID should match with the corresponding bot token in clientToken.
        clientToken: "NzMwODA0MzQzNzkyNDg4MDA2.NOT-A-VALID-TOKEN.vf4NWkeu386VrPXt2pjA5Gm1hST", // The Discord bot token used for Fish SDK.
        status: { // Setting either or both to null will set it to default
            type: ActivityType.Watching, // Use this to configure the descriptive verb that prefixes the status. (SDKv3 uses ActivityType to configure these instead of regular strings; this is a Discord.js v14 change.)
            content: "fishies go brrrr" // This is the content of the status.
        },
    },
    databases: {
        url: "mongodb://127.0.0.1:27017/FishSDK",
        // This supports Mongo and Redis out of the box.
        // Leaving it blank will use in-memory Keyv, however all data will clear after stopping Fish.
        // Support for MySQL, Postgres, and many other databases are available. As long as it's supported by Keyv, you can use it. Just install the corresponding Keyv extension and change the URL to the correct format.
        // The Fish SDK has only been tested in environments with MongoDB and Redis, however, and while we can try to assist with using other databases, this is not a guarantee.
        // ^ However, most other database extensions for Keyv *should* work just fine (given the database-agnostic structure of Keyv).
        namespace: "fish" // This corresponds to the namespace used in the database. This is useful if you want to use the same database host/cluster for multiple bots.
    },
    proctors: ["181944866987704320"], // This is an array of Discord user IDs that correspond to Fish bot administrators (internally called proctors). Administrators have access to the Swiss Knife, a meta-command with various subcommands that allow for administrators to perform various tasks in real time with the bot.
    testing: true, // This can be used to enable testing mode. This will cause the bot to only respond to guild commands in the guild specified by testingServerID.
    testingServerID: "966151942118195252", // The ID of the server to use for testing mode.
    meta: {
        displayName: "Fish", // The name of the bot. This will be used in strings like descriptions and command responses.
    }
};