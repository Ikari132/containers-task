export function increaseAngle(angle: number, increaseAmountInDegrees: number) {
    const newAngle = angle + increaseAmountInDegrees;
    return resetAngle(newAngle);
}
export function decreaseAngle(angle: number, increaseAmountInDegrees: number) {
    const newAngle = angle - increaseAmountInDegrees;
    return resetAngle(newAngle);
}

export function resetAngle(angle: number) {
    let newAngle = angle;
    if (newAngle > 360) {
        newAngle -= 360;
    }

    if (newAngle < 0) {
        newAngle += 360;
    }

    return newAngle;
}
export function toRadians(angleInDegrees: number) {
    return angleInDegrees * Math.PI / 180;
}
export function toDegrees(angleInRadians: number) {
    return angleInRadians * 180 / Math.PI;
}