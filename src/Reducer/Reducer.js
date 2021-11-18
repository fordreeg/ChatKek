const IS_AUTH = 'IS_AUTH';
export default (state, action) => {
    switch (action.type) {
        case IS_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        default:
            break
    }
}