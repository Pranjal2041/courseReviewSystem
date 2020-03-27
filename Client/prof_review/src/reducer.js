const Reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            return {
                ...state,
                posts: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;
