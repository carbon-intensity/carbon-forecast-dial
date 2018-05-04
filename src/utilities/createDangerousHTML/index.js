const createDangerousHTML = (theHTML) => {
    return {
        __html : theHTML
    }
};

export default createDangerousHTML;
