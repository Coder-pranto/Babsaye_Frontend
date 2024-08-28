export const generateCustomId = (prefixStr) => {
    const prefix = `${prefixStr}-`;
    const timestamp = Date.now(); 
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${prefix}${timestamp}-${randomNumber}`;
};