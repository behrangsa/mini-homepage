(function() {
    const AUTH_SERVER = "https://mini-auth-2019.herokuapp.com";
    
    let AUTH_RESPONSE;

    function auth(username, password) {
        return axios.post(`${AUTH_SERVER}/auth`, {
            username: username,
            password: password
        });
    }

    function isLoggedIn() {
        return AUTH_RESPONSE && AUTH_RESPONSE.authorization;
    }

    $(function() {
        $("[data-js-id=login]").on("click", function() {
            let username = $("#usernameInput").val();
            let password = $("#passwordInput").val();

            auth(username, password).then(function(response) {
                AUTH_RESPONSE = response.data;
                $("#login-modal").modal('hide');
            });
        });

        $("#login-modal").on('hide.bs.modal', function(e) {
            if (AUTH_RESPONSE) {
                $("#session").text(JSON.stringify(AUTH_RESPONSE, null, 4));
            }
        })
    });
})();

