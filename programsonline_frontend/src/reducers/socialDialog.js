const socialDialog = (state = false, action) => {
    switch (action.type) {
        case 'SOCIAL_DIALOG':
            return action.text;
        default:
            return state;
    }
};

export default socialDialog;