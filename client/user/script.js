document.addEventListener('DOMContentLoaded', function() {
    const singInBTNlink = document.querySelector('.singInBTNlink');
    const createOneLink = document.querySelector('a[href="sign_in.html"]');
    const blocks = document.querySelectorAll('.registration_block_elements');

    singInBTNlink.addEventListener('click', function(event) {
        event.preventDefault();

        blocks.forEach(function(block) {
            block.style.transform = 'translateY(-110%) translateX(0)';
        });
    });

    createOneLink.addEventListener('click', function(event) {
        event.preventDefault();

        blocks.forEach(function(block) {
            block.style.transform = 'translateY(0) translateX(0)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logIn').onclick = function(e) {
        e.preventDefault();
        logIn();
    };

    document.getElementById('register').onclick = function(e) {
        e.preventDefault();
        register();
    };
});

const register = function () {
    fetch('https://dentistry-rho.vercel.app/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.querySelector('input[name=email]').value,
            password: document.querySelector('input[name=password]').value,
            first_name: document.querySelector('input[name=first_name]').value,
            last_name: document.querySelector('input[name=last_name]').value,
            middle_name: document.querySelector('input[name=middle_name]').value,
            birth_date: document.querySelector('input[name=birth_date]').value,
        })
    }).then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert('Registration failed: ' + (data.message || 'Unknown error'));
            }
        })
}

const logIn = function () {
    fetch('https://dentistry-rho.vercel.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById('logInEmail').value,
            password: document.getElementById('logInPassword').value
        })
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.token) {
                localStorage.setItem('token', data.token);
                console.log(data.token);
                $('.contact')[0].click();
            } else {
                alert('Login failed: ' + (data.message || 'Unknown error'));
            }
        })
}
