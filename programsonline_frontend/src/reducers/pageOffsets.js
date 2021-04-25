const offset = (state = '', action) => {
    switch (action.type) {
        case 'ADD_OFFSET':
            return action.text;
        default:
            return state;
    }
};


export default offset;