const userPicture = (state = '', action) => {
    switch (action.type) {
        case 'USER_PICTURE':
            return action.text;
        default:
            return state;
    }
};

export default userPicture;