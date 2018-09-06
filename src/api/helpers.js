const apiURL = 'http://127.0.0.1:8000/';

export {apiURL};

const auth = {
    isAuthenticated() {
        return localStorage.getItem("token") !== null
    },
    authenticate(authData, cb) {
        fetch(apiURL + 'user/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)

        }).then(function (response) {
            return response.json()

        }).then((data) => {
            if (data.token) {
                // save token
                this.setSession(data);
                cb()
            } else {
                // return form errors
                cb(data)
            }

        })
    },
    setSession(authResult) {
        localStorage.setItem('token', authResult.token);
        localStorage.setItem('username', authResult.user.username);
    },
    signout(cb) {
        this.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('username');

    },
    getToken(){
        return localStorage.getItem("token")
    }

};

export {auth};