const userUid = (state = '', action) => {
    switch (action.type) {
        case 'USER_UID':
            return action.text;
        default:
            return state;
    }
};

export default userUid;