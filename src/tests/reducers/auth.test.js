import authReducer from './../../reducers/auth';

test('should set uid in auth state when login', () => {
    const uid = 'a2fvrroik6Ac';
    const action = {
        type: 'LOGIN',
        uid
    };
    const currentState = {};
    const state = authReducer(currentState, action);
    expect(state).toEqual({ uid });
});

test('should remove uid and set empty auth state obj', () => {
    const action = { type: 'LOGOUT' };
    const currentState = { uid: 'a2fvrroik6Ac' };
    const state = authReducer(currentState, action);
    expect(state).toEqual({});
});