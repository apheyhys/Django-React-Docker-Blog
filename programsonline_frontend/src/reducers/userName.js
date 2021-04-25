const userName = (state = '', action) => {
    switch (action.type) {
        case 'USER_NAME':
            return action.text;
        default:
            return state;
    }
};

export default userName;