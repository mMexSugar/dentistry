const verify = function () {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log(token);
        document.getElementById("register").click();
    } else {
        fetch('https://dentistry-rho.vercel.app/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (!data.valid) {
                    localStorage.removeItem('token');
                    $('#register').click();
                }
                $('.contact')[0].click();
            })
            .catch(error => {
                console.error('Error:', error);
                localStorage.removeItem('token');
                window.location.href = '/login.html';
            });
    }
}