const userSurname = (state = '', action) => {
    switch (action.type) {
        case 'USER_SURNAME':
            return action.text;
        default:
            return state;
    }
};

export default userSurname;