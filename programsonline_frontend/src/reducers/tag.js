const tag = (state = '', action) => {
    switch (action.type) {
        case 'ADD_TAG':
            return action.text;
        default:
            return state;
    }
};


export default tag;