
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const headerButton = item.querySelector('.accordion-header-button');

  headerButton.addEventListener('click', () => {
    item.classList.toggle('active');

    accordionItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
  });
});

$(document).ready(function() {
    fetchDentists();
    fetchServices();
});

async function fetchDentists() {
    await fetch('https://dentistry-rho.vercel.app/dentist')
        .then(response => response.json())
        .then(data => {
            data.forEach(dentist => {
                let option = document.createElement('option');
                option.value = dentist.id;
                option.text = `${dentist.first_name} ${dentist.last_name}`;
                $('select[name="dentist_id"]').first().append(option);
            });
        });
}

async function fetchServices() {
    await fetch('https://dentistry-rho.vercel.app/service')
        .then(response => response.json())
        .then(data => {
            data.forEach(service => {
                let option = document.createElement('option');
                option.value = service.id;
                option.text = service.name;
                $('select[name="service_id"]').first().append(option);
            });
        });
}

async function fetchTimeSlots() {
    const token = localStorage.getItem('token');
    let dentistId = $('#dentist_id').val();
    let queryParam = new URLSearchParams({date: $('#data').val() });
    let url = `https://dentistry-rho.vercel.app/appointment/${dentistId}?${queryParam.toString()}`;

    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            $('select[name="time"]').empty();
            data.forEach(timeSlot => {
                let option = document.createElement('option');
                option.value = timeSlot;
                option.text = timeSlot.split(':').slice(0, 2).join(':');
                $('select[name="time"]').first().append(option);
            });

        });
}

$('#submitBtn').on('click', (e) => {
    e.preventDefault();
    console.log('submit');

    if (!validateForm()) {
        alert('Please, select a date in the future');
        return;
    }

    const data = {
        dentist_id: $('#dentist_id').val(),
        service_id: $('#service_id').val(),
        date: $('#data').val(),
        time: $('#time').val(),
        comment: $('#comment').val()
    };

    fetch('https://dentistry-rho.vercel.app/appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Appointment created');
            $('#data').val('');
            $('#time').val('');
            $('#comment').val('');
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

const validateForm = () => {
    return new Date($('#data').val()) > Date.now();
}