export const logInfo = (message: string): void => {
    // eslint-disable-next-line no-console
    console.log(message);
};

export const logWarning = (message: string): void => {
    console.warn(message);
};

export const logError = (errorMessage: string | Error): void => {
    if (errorMessage instanceof Error) {
        console.error(errorMessage.message, errorMessage.stack);
    } else {
        console.error("ERROR: ", errorMessage);
    }
};