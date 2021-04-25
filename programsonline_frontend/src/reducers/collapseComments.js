const collapseComments = (state = false, action) => {
    switch (action.type) {
        case 'COLLAPSE_COMMENTS':
            return action.text;
        default:
            return state;
    }
};

export default collapseComments;