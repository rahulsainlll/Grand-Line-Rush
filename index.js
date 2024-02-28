#!/user/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const getRandomText = () => {
  const texts = [
    "I am going to be the Pirate King! I'm not a hero because I want your approval.",
    "I do it because I want to! I don't want to conquer anything.",
    "I just think the guy with the most freedom in this whole ocean... is the Pirate King! I don't want to live a thousand years.",
    "If I just live through today, that'll be enough. I'll do what you can't do, you do what I can't do.",
    "We're even! Freedom! I don't want your treasures, your fame, your power!",
    "I just want to live my life as I see fit! I don't want to hear about being a hero!",
    "All I want is to be a pirate! If you don't take risks, you can't create a future!",
    "You can't bring back what you've lost, think about what you have now! There's no way I'm gonna die before you do!",
    "You need to accept the fact that you're not the best and have all the will to strive to be better than anyone you face. It's foolish to fear what we've yet to see and know.",
    "It's also foolish to fear what we have. Naruto! I can't believe I'm about to say this, but...",
    "You're the third guy I've ever seen who's got the Nine-Tails under control. The first was the Fourth Hokage, the second was the masked man...",
    "And the third is you. The third guy is the third Hokage's grandson, Naruto Uzumaki. I'm not gonna lie to you.",
    "It's gonna take a while to control it. It's not easy to master, but I'm sure you can do it. You've got something that I don't, Naruto.",
    "You have the potential to surpass the Fourth Hokage. You have the potential to become Hokage yourself. It's foolish to fear what we've yet to see and know.",
    "It's also foolish to fear what we have. Naruto! I can't believe I'm about to say this, but...",
    "You're the third guy I've ever seen who's got the Nine-Tails under control. The first was the Fourth Hokage, the second was the masked man...",
    "And the third is you. The third guy is the third Hokage's grandson, Naruto Uzumaki. I'm not gonna lie to you.",
    "It's gonna take a while to control it. It's not easy to master, but I'm sure you can do it. You've got something that I don't, Naruto.",
    "You have the potential to surpass the Fourth Hokage. You have the potential to become Hokage yourself.",
  ];

  return texts[Math.floor(Math.random() * texts.length)];
};

async function welcome() {
  console.clear();
  console.log(gradient.fruit("Welcome to the Grand Line Rush!"));

  await sleep();

  console.log(`
Once you've completed your typing, I'll calculate your Typing Speed ${chalk.bgRedBright(
    " KING "
  )}.
Here's an inspiring quote to type:
`);
  await sleep();
}

const calculateWPM = (typedText, timeTaken) => {
  const words = typedText.split(/\s+/).length;
  const minutes = timeTaken / 60;
  return Math.floor(words / minutes);
};

const calculateAccuracy = (randomText, typed_text) => {
  let correctCount = 0;
  for (let i = 0; i < randomText.length; i++) {
    if (randomText[i] === typed_text[i]) {
      correctCount++;
    }
  }

  return (correctCount / randomText.length) * 100;
};

async function handleCalculation(randomText, timeTaken, typedText) {
  const spinner = createSpinner("Calclating speed... \n").start();
  await sleep();

  const wpm = calculateWPM(randomText, timeTaken);
  const accuracy = calculateAccuracy(randomText, typedText);

  if (typedText.length >= randomText.length - 5) {
    console.log(`\n Typing speed is ${wpm} words per minute.`);
    console.log(` Accuracy  ${Math.floor(accuracy)}\% \n \n`);
    spinner.success({
      text: `See you in the next one 🐯`,
    });
  } else {
    spinner.error({
      text: "☠️  ☠️  ☠️  Game Over. Try to complete sentence next time. \n",
    });
    process.exit(1);
  }
}

const main = async () => {
  const randomText = getRandomText();
  console.log(randomText);

  console.log("\nType the quote you see above:");

  const start = new Date();
  const { typedText } = await inquirer.prompt([
    {
      name: "typedText",
      message: "",
    },
  ]);

  const end = new Date();
  const timeTaken = (end - start) / 1000;

  handleCalculation(randomText, timeTaken, typedText);
};

await welcome();
await main();
