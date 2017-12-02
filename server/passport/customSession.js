const users = new Map();
let counter = 0;

module.exports = {
    saveUser: (key, user) => {
        if (users.has(key)) {
            return false;
        }
    
        users.set(key, user);
        return true;
    },
    clearUser: (id) => {
        if (users.has(id)) {
            users.delete(id);
            return true;
        }

        return false;
    },
    getUser: (id) => {
        if (users.has(id)) {
            return users.get(id);
        }

        return false;
    },
    getCounter: () => {
        return ++counter;
    }
};