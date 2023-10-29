// congrats for finding my script. i mean, it wasn't that hard, but still. some effort.

// pls don't change anything i will be sad and may not function well.

// oh, but if you have any dialogue or events you want to add, let me know ;)

var myName = 'Lickilicksters';
var css = "body{font-family: 'Arial';font-size:15px;color:gray;}";
var responsesId = '1VbUy6xzPTNMqVrFFEq9D963xFqMS3kP2LonIsLkpwxA';
var ui;
var responses = {};

function getResponses(){
  ss = SpreadsheetApp.openById(responsesId);
  sheets = ss.getSheets();
  responses = {};
  // skip first sheet, which is just for computation
  for (let i = 1, length = sheets.length; i < length; i++){
    let sh = sheets[i];
    question = sh.getName();
    responses[question] = []; // creates list of responses
    getResponseAttributes(sh); // creates a dictionary for each response, stores attributes
  }
  return responses;
}

function getResponseAttributes(sh){
  var shName = sh.getName();

  // get number of columns (keys for each response)
  var cols = parseInt(getComp('A1', 'A1', `=COUNTA('${shName}'!A1:Z1)`), 10);
  var rows = parseInt(getComp('A1', 'A1', `=COUNTA('${shName}'!A1:A)`), 10);
  if (rows == 1) // if no response rows (only the key row), then return
  {
    return;
  }

  // get keys, vals
  var keys = sh.getRange(1, 1, 1, cols).getValues()[0];
  var vals = sh.getRange(2, 1, rows - 1, cols).getValues();

  // add keys, vals to responses[question] list
  // length of vals is length of responses
  for (let i = 0, length = vals.length; i < length; i++){
    // make a dictionary for each response
    responses[question][i] = {};
    // set key, set val for each key
    for (let j = 0, length = keys.length; j < length; j++){
      responses[question][i][keys[j]] = vals[i][j];
    }
  }
}

// when calling, vals have to be in order! (match keys order)
function addResponse(question, vals){
  // get sheet
  ss = SpreadsheetApp.openById(responsesId);
  sh = ss.getSheetByName(question);

  // check if number of vals valid
  var cols = parseInt(getComp('A1', 'A1', `=COUNTA('${question}'!A1:Z1)`), 10);
  if (vals.length != cols){
    console.log('Error: # values is not equal to # of keys (attributes of response)');
    return;
  }

  // if valid, then add response
  var blankRow = parseInt(getComp('A1', 'A1', `=COUNTA('${question}'!A1:A)`), 10) + 1;
  
  // add val, for each key (column)
  for (let i = 0, length = vals.length; i < length; i++){
    // get current letter of column
    l = String.fromCharCode(i + 65);
    sh.getRange(l+blankRow).setValue(vals[i]);
  }
}

function getComp(i, o, formula){
  // i = input, o = output
  var comp = ss.getSheetByName('lickitung brain');
  comp.getRange(i).setValue(formula);
  return comp.getRange(o).getValues();
}

function event(){
  // doing it here since google's a jerk and doesn't let me do it outside of function scope
  ui = SpreadsheetApp.getUi();
  responses = getResponses();
  eventLogic(randomize(dialogue));
}
function eventLogic(event) {
  // Display a modeless dialog box with custom HtmlService content.
  if (typeof event === 'function')
  {
    event();
  }
  else {
    talk(event);
  }
}
function randomize(dialogue){
  return dialogue[Math.floor(Math.random() * dialogue.length)];
}
function talk(text){
  ui.alert(text);
}

/* alt talk:
var htmlOutput = HtmlService
.createHtmlOutput(`<style>${css}</style><p>${text}</p>`)
.setWidth(200)
.setHeight(100);
SpreadsheetApp.getUi().showModelessDialog(htmlOutput, myName);
*/

dialogue = [
  // days til xmas
  function (){
    var today=new Date();
    var cmas=new Date(today.getFullYear(), 11, 25);
    if (today.getMonth()==11 && today.getDate()>25) 
    {
    cmas.setFullYear(cmas.getFullYear()+1); 
    }  
    var one_day=1000*60*60*24;
    var daysLeft = Math.ceil((cmas.getTime()-today.getTime())/(one_day));
    
    if (today.getMonth() == 12 && today.getDate() == 25){
      talk("Whoaaa it's Christmas!!!!")
    }
    else if (today.getMonth() == 12 && today.getDate() >= 26){
      talk("ughh i can't believe christmas just passed :(");
    }
    else{
      talk(daysLeft+" days left until Christmas!");
    }
  },
  // my face
  function (){
    let htmlOutput = HtmlService
    .createHtmlOutput(`<style>${css}</style><a href = "https://archives.bulbagarden.net/media/upload/5/5f/Jessie_Lickitung.png">https://123098120398123891230981230988123091230912380921312309.gov</a>`)
    .setWidth(550)
    .setHeight(100);
    ui.showModelessDialog(htmlOutput, ' ');
  },
  // do you love me?
  function (){
    let result = ui.alert(
     '...',
     'do you love me?',
      ui.ButtonSet.YES_NO);
    if (result == ui.Button.YES) {
      talk('thank you :)');
    } else {
      let email = Session.getActiveUser().getEmail();
      let yourName = ContactsApp.getContact(email).getFullName();
      talk('.... i know your personal information and I WILL use it against you, '+yourName+'. Does this look familiar???? -> '+email);
      // there's other stuff i can do too: https://developers.google.com/apps-script/reference/contacts/contact
    }
  },
  // what rhymes with orange
  function (){
    let response = ui.prompt('what rhymes with orange?');
    // Process the user's response.
    if (response.getSelectedButton() == ui.Button.OK) {
      // correct answer?
      let ans = response.getResponseText().toUpperCase;
      if (ans === "BLORENGE" || ans === "SPORANGE"){
        talk("wowwwww you so smurt");
      }
      else if (ans === "ORANGE"){
        talk("that's facts");
      }
      else{
        talk("really??? that rhymes with orange???");
      }
    } else {
      talk("ah ok i guess you don't know");
    }
  },
  // meaning of life
  function (){
    var response = ui.prompt('what is the meaning of life?');
  
    // Process the user's response.
    if (response.getSelectedButton() == ui.Button.OK) {
      let yourAnswer = response.getResponseText();
      var answers = responses['meaning of life'];
      console.log(answers.length);
  
      // if user's answer is not empty, record answer
      if (yourAnswer.trim() != ""){
        let email = Session.getActiveUser().getEmail();
        let yourName = ContactsApp.getContact(email).getFullName();
        // save to storage
        addResponse('meaning of life', [yourName, yourAnswer]);
      }
    } 
    // turn other people's responses into string if array isn't empty
    if (answers.length != 0){
        console.log('ans length: '+answers.length);
        answersStr = "";
      for (let i = 0, length = answers.length; i < length; i++){
        answersStr += `${answers[i]['name']} said, "${answers[i]['answer']}".`;
        answersStr += "\n";
      }
      // show other people's answers
      talk("here are the responses that other people had:\n"+answersStr);
    }
  },
  "have you ever wondered what my deepest, darkest secrets are? well, right click on me, click on the three dots, then alt text to find out! ;)",
  "The supreme art of war is to subdue the enemy without fighting.",
  "lickylickylicksterslicklickcickckiclcicklccilcicliclcilcilcilciclciclcilciicilclcilciclic",
  "liciciiciciickckcllcickccllccicllcicicllcic",
  "sometimes, when i feel sad.. i lick things! you should try it too!",
  "i am BEST POKEMON. great name, great design. anyone else who dares stand in my way will have their future grandchildren abducted and a terrible curse befall their family.",
  "sometimes, i wonder. what is my life's purpose? why am i here? think about it. if i was created in a franchise where i don't even have good stats and my reputation is neither renowned nor notorious, where one of my most prominent recognitions is in a 2016 augmented reality mobile game, why am i still here....",
  "ms schneider is a god. we all must bow down to her. or else unspeakable things will happen....",
  "sophie lin is a very cool child.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n(i am forced to say this HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME)",
  "there aren't any good tongue puns out there",
  "Default (but better) is a really good theme. It's default, but better.",
  "i like to stay in shape... round, that is.",
  "exercise? i thought you said extra fries.",
  "why is called kanSAS and arkanSAW. america, explain!",
  "i play pokemon go every day....!\n\ni play pokemon go....!",
  "https://www.youtube.com/watch?v=k_SJ4PSWH0o",
  "do you ever wonder what people look like if they were bald?",
  "giraffepants",
  "i want to eat potato chips.. but i also don't feel like getting them",
  "cahpstick. chapappiestick. chapapperlapperzapperstick",
  "cereal or milk first? one of humanity's most crucial questions... i say bowl first.",
  "today is national lickitung appreciation day. appreciate me pweese. :)\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nOR ELSE.",
  "i didn't find any infants for purchase at buy buy baby and now i am sad.",
  "e = mc^2",
  "sometimes, when i am fatigued and weary with the world, i sit down and stare at the stern blue sky, so vast and littered with skyscrapers and empty of dreams. humanity has travelled a long way, tearing down trees for homes and growing trees for better homes, fighting amongst themselves based on concepts they act as though were crafted by the hands of god, but are in reality their own flimsy cardboard houses, a dog not knowing that they are chasing their own tail... there is still so much smog in the sky that i see outside my window. i close my eyes. think about these things. and wonder,\n\ndo i look more like a wad of gum or a pink obese baby?",
  "pineapple pen and apple pen were no different than night and day, but they were once great friends and shared a dream: worldwide fame. so when some strange japanese man one day came up to them and requested them to be featured in a music video, they could hardly believe it. these days the media was incredibly discriminatory and consumers only viewed fruit as, well, for literal consuming. but this man, this man understood, this man saw the earnest looks casted by pineapple pen and apple pen's nonexistent faces. you could see the wisdom in his mysterious eyes that seemed to tell you that he knew all too well, those dark dark eyes that hid under a pair of sunglasses reminiscent of a certain 1999 movie about many things, but one most importantly of choosing between two fates denoted by a blue and a red pill. so it came of no surprise when he presented them two options, one of staying in the shadows forever until the expiration date, and one of basking in the sunlight of the world with the small yet unalterable chance of spoiling. apple pen knew that the former path would never bear any fruit, and pressed its friend pineapple pen to agree with its decision. pineapple pen was hesistant, but couldn't bear to see the rare chance of achieving their lifelong dreams being missed and possibly never seen again. so it agreed, and what followed thereafter you already know well. but what you possibly could not know is what happened after a brief period in the limelight. apple pen became drunk on its newfound power, and carried itself with a cocky and presumptuous manner. it never wanted to admit that it was wrong, no matter how many horrendous decision that it made, and loved to be showered with praise, no matter if the sender of such compliments had honest intentions or not. pineapple pen never liked that side of apple pen, but was too afraid to speak up, so apple pen each and every day became a little more egotistical and possessed a little less charm that it had back in the early days, that kind a good friend has when you know that they truly care about you, until a tangy smell filled the air of their studio. apple pen... had spoiled. even though their franchise had long since became rotted to the core, apple pen kept thinking that they still had a chance to make it big, that there were still some believers in the legacy of pen pineapple apple pen. when a shady old man with scraggly gray sideburns requested for a meeting with apple pen about supposed methods to increase public relations and win over more followers by joining his company, of course apple pen gladly accepted. pineapple pen was too afraid to do anything. it was always too afraid to do anything. apple pen never came back to the office the day of that meeting. the old man was a grocer, and the super gross expired flesh of the apple was sold at the highest bidder. pineapple pen was shocked, and wanted to cry. but it knew that pineapples could not cry, or any fruit for that matter, so it just laid on the kitchen counter, thinking back to days of yore, days long gone. should it have done something? perhaps when apple pen agreed to meet up with the grocer. perhaps the fateful day when mr. kosaka approached them. no, even further back. when apple pen first suggested the idea of becoming known to millions, oh how it looked at pineapple pen with those shining nonexistent eyes filled with a childish hope that could fill a whole ocean of substance. pineapple pen didn't want to think of these things anymore, so it sold the studio and bought a humble cottage by the sea where it could live in reclusion. certainly, living such a way was lonely, so sometimes it travelled to the village nearby. because of its kind demeanor and librarian-like personality, pineapple pen became a favorite among the village children, a teller of fantastical tales that lifted the wild imaginations of youngsters. one day, a mousy-haired child went up to pineapple pen and surprised it. this time, she said, tell me a real story. the story about how you met apple pen, and the adventures that you went through together. pineapple pen at this time was at the ripe old age of ten years old, and it had been so many fruit-decades since apple pen had ever been brought up. apple pen, chuckled pineapple pen. now that's a person, er, fruit you would never forget. a childlike wonder sparked in its eyes as it began recounting the tale, and the eager children gathered around the ananas comosus too became filled with such an awe, and when pineapple pen finished retelling the story and left its trance of being captured in story, it looked at the children, their eyes sparkling with the wonder apple pen once had, as if infected with the energy of the kind of person that would believe that anything is possible. pineapple pen smiled. after all, it had a bit of apple pen inside it all along.\n\n(get it? cus... pineAPPLE PEN.\n\n...\n\nhaha funny ammirite.\n\n...\n\ni can't believe i had to write so much to set up this stupid pun.",
  "im a rebel...\n\ntoday i crossed the street!!!\n\nwithout looking both ways!!!","lalallalallalallallallalallallalallalallallallallalallalallalallalallalallallalallallallalallallalalallallalallallalallalallallalallalallalallalallallalallalalla\n\nisn't that a good song?",
  "i hate when you finish drinking boba and there are still some tapioca pearls stuck at the bottom of the cup and you have to take off the lid and tilt the cup downwards so you can eat the rest and they're ok i guess but it's not the same without the boba tea...",
  "when life gives you lemons.. eat them. they're very rich in vitamin c!!",
  "sometimes, i wonder... am i too chibby for my own good??????????????",
  "axolotls are cool",
  "did you know that axolotls can regenerate their limbs?",
  "someone told me that when i smile, i look like a nopoli rockclimbing goby! i don't know what that even means!",
  "i met abraham lincoln once. i asked him how he did it, commanding during an era of nation divided and ultimating uniting it. he smiled that way wise and powerful men do, and said to me, it was ALL THANKS TO THE BEARD BABY!!",
  "eat your vegetables... or they will eat you!!!!",
  "give a man a fire, and he will be warm for a day. set the man on fire, and he will be warm for the rest of his life - confucius (in his hit 217 AD album confuciuslicious)",
  "hakuna matata  - confucius (in his hit 217 AD album confuciuslicious)",
  "i have no idea what i'm saying lol - confucius (in his hit 217 AD album confuciuslicious)",
  "super idol 的笑容都没你的甜",
  "八月正午的阳光都没你耀眼",
  "热爱105度的你 滴滴清纯的蒸馏水",
  "hakuna matata means no worries. hakuna patata means i'm hungry for potatoes.",
  "squid game had nothing to do with squids. -8/10, one for each squid arm.",
  "nvhs principal dr. fuhrer's name means leader. it was destiny....!",
  "communism",
  "my head is like a bag of lays chips.... 80% air.",
  "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  "help!! the russian cyberattackers have invaded the system!!! here is their message: 01111001 01101111 01110101 01110010 00100000 01101101 01101111 01101101",
  "help!! the russian cyberattackers have invaded the system!!! here is their message: 01101110 01100101 01110110 01100101 01110010 00100000 01100111 01101111 01101110 01101110 01100001 00100000 01100111 01101001 01110110 01100101 00100000 01111001 01101111 01110101 00100000 01110101 01110000",
  "it be like that sometimes - gandhi",
  "you should do scioly ;)\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nFEED THE SYSTEM!! FUEL THE CAUSE!! ALL HAIL OUR MAGNIFICIENT LEADER PAULA MUELLER!!!!",
  "The marine biology seminars weren't created for entertainment, but for educational porpoises. The fish are getting annoying with their octopus neighbor. He tentacles late at night. The tuna married the swordfish because he was such a catch. Marine mammals are simply otter this world. Crustaceans only think of themselves. They're so shellfish. This reef is the strongest part of the ocean because it has so many mussels. I can't tell if this fish is lying; she's being so koi. Biologists have recently produced immortal frogs by removing their vocal cords. They can't croak. The best way to communicate with a fish is to drop them a line. On the surface of things, whales are always blowing it.(why are you looking at me like that? i don't sea the problem.)",
  "your mom hah",
  "Yo sé\nBilly la Bufanda es una bufanda\nNo tiene dientes\nNo puede tomar nada\nEs una bufanda\nNo fue a ninguna parte",
  "巧虎 is best anime. you can't deny.",
  "开心超人 will always have a special place in my heart",
  "wow, civet coffee is a thing huh",
  "did you know there's a fungus that can repair concrete?",
  "i have the sudden craving for fried watermelon.",
  "The only paradise is paradise lost.",
  "Everybody in the world was once a child. So in planning a new picture, we don't think of grown-ups, and we don't think of children, but just of that fine, clean, unspoiled spot down deep in every one of us that maybe the world has made us forget and that maybe our pictures can help recall.",
  "When I take you to the Valley, you’ll see the blue hills on the left and the blue hills on the right, the rainbow and the vineyards under the rainbow late in the rainy season, and maybe you’ll say, “There it is, that’s it!” But I’ll say. “A little farther.” We’ll go on, I hope, and you’ll see the roofs of the little towns and the hillsides yellow with wild oats, a buzzard soaring and a woman singing by the shadows of a creek in the dry season, and maybe you’ll say, “Let’s stop here, this is it!” But I’ll say, “A little farther yet.” We’ll go on, and you’ll hear the quail calling on the mountain by the springs of the river, and looking back you’ll see the river running downward through the wild hills behind, below, and you’ll say, “Isn’t that the Valley?” And all I will be able to say is “Drink this water of the spring, rest here awhile, we have a long way yet to go and I can’t go without you.”",
  "Yet each man kills the thing he loves",
  "If music be the food of love, play on, / Give me excess of it; that surfeiting, / The appetite may sicken, and so die.",
  "God does not play dice with the universe.",
  "never gonna give you up, never gonna let you down...",
  "the oof sound in roblox communicates such an intense, profound, unspeakable pain that lays hidden within all of our hearts... such pain..! such beauty...!!",
  "peel the avocado peel the avoCAdo...",
  "ok boomer",
  "There are three deaths. The first is when the body ceases to function. The second is when the body is consigned to the grave. The third is that moment, sometime in the future, when your name is spoken for the last time.",
  "toy ball weasels are a blessing upon this world.",
  "i want an otamatone",
  "obamalamufasamamajama",
  "i put the PRO in procrastination",
  "emOtiOnal DAmage - steven he",
  "banannannanannnanannanannannanannanannanannannanannanannanannana",
  "smolification",
  "that sugar cookie scented elmer's glue be lookin real tasty rn",
  "(-b +- V(b^2 - 4ac))/2",
  "1.61803398874989484820",
  "the world is a giant potato.. there is no meaning behind this metaphor except the fact that i am hungry.",
  "HIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHI MS SCHNEIDER IF YOU ARE READING THIS",
  "omg = oscillating magnetic gyroscope",
  "i could never chat with astrophysicists. the matters they talk about are too... dark.",
  "someone keeps stealing my mechanical pencils >:(",
  "i mean, there's probably a logical explanation for why this code doesn't work, but i'll just say that it's impossible to solve. - programmers and humans in general",
  "chaos.. strange attractors and branching blood vessels and mandelbrot sets. yet the essence of nature.",
  "that kahoot halloween music kinda slaps tho",
  "minecraft > animal crossing. always.",
  "peppa pig is taller than you.",
  "glubluglbulfglfjlfdkljaksdjlkalsdlkasjlasdujasldjklkjasdjlkjalsljkdjalskdjajslkdjuefijffdm - some person who is drowning",
  "water, earth, fire, and air.",
  "What\nis the thing that man fears most? Nuclear war? That we may be alone in this universe? The frighteningly increasing emergence of sentience technology? ............... The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.",
  "i just wasted so much time watching cute baby otter videos that my eyes are starting to burn and water and i question my sanity but it was worth it.",
  "wow, these dialogues are truly the best waste of space ever.",
  "It\'s a beautiful day outside.\nbirds are singing,\nflowers are blooming...\non days like these, kids like you...\n\n\n;)\nWhat?\nthought i was gonna say somethin\' else?'\nno idea what you're talkin' about.",
  "i hate sql so much.",
  "the cornerstone, the magnum opus of sophie's programming career.... this dumb buggy lickitung chatbot.",
  "since there's girls who code, girls in stem should be renamed to girls who stem.",
  "orcas are just panda whales.",
  "ferrets are just elongated hamsters.",
  "i just forgot what i was gonna say",
  "manta rays are called that cus manta means blanket in spanish... they sound so floofy now...",
  "lickitung is love. lickitung is life.",
  "stack overflow error",
  "regex syntax makes onions cry",
  // new dialogue
  "i'm a pink power ranger"
]
