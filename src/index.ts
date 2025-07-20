import { BskyAgent } from '@atproto/api';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { countdownDays } from './countdown';

dotenv.config();

// Create a Bluesky Agent 
const agent = new BskyAgent({
    service: 'https://bsky.social',
  })

async function main() {
    await agent.login({
        identifier: process.env.BLUESKY_USERNAME!, 
        password: process.env.BLUESKY_PASSWORD!
    })
    console.log(`Logged in as ${agent.session?.handle}`);
    
    // announced to release in may 26, 2026, 14h UTC
    const releaseTimestamp = Date.UTC(2026, 4, 26, 14);
    const nowTimestamp = new Date().getTime();   
    
    let remainingTime = releaseTimestamp - nowTimestamp;
    let remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    let text = '';
    if (remainingDays > 0) {
        text = `${remainingDays} days remaining until the release of GTA 6`;
    } else if (remainingDays == 0) {
        text = "IT'S TODAY!";
    } else {
        return;
    }

    const recordObj = await agent.post({
        text: text,
    })

    console.log("Just posted!")
}

main();
