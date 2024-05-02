export const selectCurrentUser = (state) => state.user.currentUser;

export const selectIsLoading = (state) => state.user.isLoading;

export const selectIsValidUser = (state) => {
    if (!!state.user.currentUser) {
        return true;
    }else{
        return false;
    }
}
    
