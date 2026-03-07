
document.getElementById('login-btn').addEventListener('click', function () {
    // 1. get the username
    const inputUserName = document.getElementById('input-username');
    const userName = inputUserName.value;
    console.log(userName);

    // 2. get the password
    const inputPassword = document.getElementById('input-password');
    const password = inputPassword.value;
    console.log(password);

    // 3. match username & password
    if(userName === 'admin' && password === 'admin123') {
        // 3-1. true >> alert >> homepage
        alert('SignIn Success');

        // window.location.replace('/home.html')
        window.location.assign('/home.html')
    }
    else {
        // 3-2. false >> alert >> return
        alert('SignIn Failed');
        return;
    }

})