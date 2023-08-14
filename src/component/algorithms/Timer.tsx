// delay timer function
export async function timer(ms: number) {
    if (ms < 20)
        return new Promise((resolve) => setTimeout(resolve, 1000 / ms));
    return new Promise((resolve) =>
        setTimeout(resolve, 1000 / Math.pow(ms + 1, 1.5))
    );
}
