const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const myGuildID = "1081268387604336781";
let myGuild = null;
const roleID = "1081313810851319838";
const memberName = "Jeaaaaaannne !";

function setGuild() {
  myGuild = client.guilds.cache.at(0);
}

function getMember() {
  const user_id = client.users.cache.find(user => user.username == memberName).id;
  const member = myGuild.members.cache.get(user_id);

  return member;
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  setGuild()
})

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.reply(({
      content: "pong",
    }))

    const member = getMember()
    member.roles.add(roleID)
  }
  
})

client.login(process.env['TOKEN'])
