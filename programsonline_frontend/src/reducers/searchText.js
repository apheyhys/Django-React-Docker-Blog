const searchText = (state = '', action) => {
    switch (action.type) {
        case 'SEARCH_TEXT':
            return action.text;
        default:
            return state;
    }
};

export default searchText;