export const getLocalUser = () => {
    const user = localStorage.getItem("blogUser");
    return user ? JSON.parse(user) : null;
};

export const setLocalUser = (user) => {
    if (user) localStorage.setItem("blogUser", JSON.stringify(user));
};

export const clearLocalUser = () => localStorage.removeItem("blogUser");
