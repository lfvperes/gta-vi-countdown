export function countdownDays(deadline: Date) {
    const now = new Date(); 

    let remainingTime = deadline.getTime() - now.getTime();
    let remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    return remainingDays;
}