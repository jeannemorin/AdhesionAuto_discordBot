const { Client, GatewayIntentBits } = require('discord.js')

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let info = null;

app.listen(8080, () => console.log('Music sounds better with yooooouuuu'));

app.get('/', (req, res) => {
  res.send("Hello World !")
});

app.post('/action', (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const reqparse = JSON.parse(body);
    if (reqparse.eventType == 'Order')
      info = reqparse;

    console.log(info.data.items[0].customFields[0].answer)
    const memberName = info.data.items[0].customFields[0].answer.toString();
    addRole(memberName)
  });

  
});


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const myGuildID = "1081268387604336781";
let myGuild = null;
const roleID = "1081313810851319838";

function setGuild() {
  myGuild = client.guilds.cache.at(0);
}

async function getMember(memberName) {

  await myGuild.members.fetch()
  const user = myGuild.members.cache.find(member => member.user.username == memberName)
  
  if (user)
  {
    const user_id = user.id;
    const member = myGuild.members.cache.get(user_id);
    return member;
  }
  else
  {
    throw Error("Member not existing :" + memberName+ "*")
  }
}

async function addRole(memberName) {
  const member = await getMember(memberName)
  member.roles.add(roleID)
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  setGuild()
})

client.login(process.env['TOKEN'])
