const userAccess = (state = '', action) => {
    switch (action.type) {
        case 'USER_ACCESS':
            return action.text;
        default:
            return state;
    }
};

export default userAccess;