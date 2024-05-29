const verify = function () {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
        document.getElementById("register").click();
    }
    else {
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
                    document.getElementById("register").click();
                }
                document.getElementById("contact").click();
            })
            .catch(error => {
                console.error('Error:', error);
                localStorage.removeItem('token');
                window.location.href = '/login.html';
            });
    }
}

$(document).ready(() => {
    $(".verify").on("click", () => {
        try {
            verify();
        } catch (error) {
            console.error(error);
        }
    });
});
