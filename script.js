const wrapper = document.querySelector('.wrapper');
form = wrapper.querySelector('form');
fileInp = form.querySelector('input');
infoTxt = form.querySelector('p');
closeBtn = wrapper.querySelector('.close');
copyBtn = wrapper.querySelector('.copy');

function fetchRequest(formData, file) {
    infoTxt.innerText = 'Scanning QR-Code ... '
    //sending post request to qr-server api with passing formData as body and getting response from api
    fetch('http://api.qrserver.com/v1/read-qr-code/', {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            result = result[0].symbol[0].data;
            wrapper.querySelector('textarea').innerText = result;
            console.log(result);
            infoTxt.innerText = result ? 'Upload QR-Code to Scan' : "Couldn't Scan QR-Code";
            if(!result) return;
            form.querySelector('img').src = URL.createObjectURL(file);
            wrapper.classList.add('active');
        })
        .catch(() => {
            infoTxt.innerText = "Couldn't Scan QR-Code";
        });
}

fileInp.addEventListener('change', e => {
    let file = e.target.files[0]; //selecting file
    if(!file) return;
    let formData = new FormData(); //creating a new FormData object
    formData.append("file", file); //adding selected file to formData
    fetchRequest(formData, file);
})

copyBtn.addEventListener('click', () => {
    let text = wrapper.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text);
})

form.addEventListener('click', ()=> fileInp.click());
closeBtn.addEventListener('click', () => wrapper.classList.remove('active'));