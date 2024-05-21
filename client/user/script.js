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
