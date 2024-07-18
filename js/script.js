document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Percabangan Mencari tombol submit
    const submitButton = document.querySelector('.submit-class');
    if (submitButton) {
        console.log("Submit button found"); 
        submitButton.addEventListener('click', function(e) {
            console.log("Submit button clicked");
            e.preventDefault(); // Mencegah perilaku default form
            hitungBMI(); // Memanggil fungsi untuk menghitung BMI
        });
    } else {
        console.error("Submit button not found");
    }

    const resetButton = document.querySelector('.reset-class');
    if (resetButton) {
        console.log("Reset button found");
        resetButton.addEventListener('click', function(e) {
            console.log("Reset button clicked");
            e.preventDefault(); // Mencegah perilaku default form
            resetForm(); // Memanggil fungsi untuk reset Form
        });
    } else {
        console.error("Reset button not found");
    }
});

//fungsi untuk menghitung BMI
function hitungBMI() {
    console.log("hitungBMI function called");
    try {
        // Mengambil dan mengkonversi nilai yang diinput
        const berat = parseFloat(document.getElementById('weight-selection').value);
        const tinggi = parseFloat(document.getElementById('height-input').value) / 100; // Mengkonversi cm ke m
        const usia = parseInt(document.getElementById('age-input').value);
        const jenisKelamin = document.querySelector('input[name="sex"]:checked');

        console.log("Input values:", { berat, tinggi, usia, jenisKelamin: jenisKelamin ? jenisKelamin.value : 'not selected' });

        // Memeriksa apakah semua input terisi valid
        if (isNaN(berat) || isNaN(tinggi) || isNaN(usia) || !jenisKelamin) {
            throw new Error('Mohon isi semua field dengan benar');
        }
        //Rumus perhitungan BMI
        const bmi = berat / (tinggi * tinggi); 
        let kategori = '';
        let keterangan = '';
        let kondisi = '';

        //Percabangan Kondisi di dalam result content
        if (bmi < 18.5) {
            kategori = 'Kekurangan berat badan';
            keterangan = 'Anda memiliki berat badan kurang dari normal.';
            kondisi = 'Berat badan kurang';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            kategori = 'Normal (Ideal)';
            keterangan = 'Anda memiliki berat badan ideal. Pertahankan!';
            kondisi = 'Berat badan Ideal';
        } else if (bmi >= 25 && bmi < 29.9) {
            kategori = 'Kelebihan berat badan';
            keterangan = 'Anda memiliki berat badan berlebih. Perhatikan pola makan Anda.';
            kondisi = 'Berat badan lebih';
        } else {
            kategori = 'Kegemukan (Obesitas)';
            keterangan = 'Anda termasuk kategori obesitas. Konsultasikan dengan dokter untuk penurunan berat badan yang sehat.';
            kondisi = 'Berat badan terlalu berlebih';
        }

        tampilkanHasil(bmi, kategori, keterangan, kondisi, jenisKelamin.value);
    } catch (error) {
        console.error("Error in hitungBMI:", error);
        alert(error.message);
    }
}

//Fungsi untuk menampilkan hasil
function tampilkanHasil(bmi, kategori, keterangan, kondisi, jenisKelamin) {
    console.log("tampilkanHasil called with:", { bmi, kategori, keterangan, kondisi, jenisKelamin });

    const downloadButton = document.querySelector('.download-class');
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadHasilBMI);
    }
    const resultElement = document.getElementById('result-content');
    if (!resultElement) {
        console.error("Result content element not found");
        return;
    }

    resultElement.innerHTML = `
        <p>${kondisi}</p>
        <p>Jenis Kelamin: ${jenisKelamin === 'man' ? 'Laki-laki' : 'Perempuan'}</p>
        <p class="bmi-value">BMI Anda: ${bmi.toFixed(1)}</p>
        <p>Kategori: ${kategori}</p>
        <p>${keterangan}</p>
    `;

    //Percabangan Kondisi pesan yang akan tampil di dynamic-message
    const dynamicMessage = document.getElementById('dynamic-message');
    if (dynamicMessage) {
        let message = '';
        if (bmi < 18.5) {
            message = 'Anda berada dalam kategori kekurangan berat badan. Konsumsi makanan bergizi dan berprotein serta jangan lupa konsultasikan dengan dokter untuk meningkatkan berat badan Anda.';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            message = 'Anda berada dalam kategori berat badan normal (ideal).<br> Pertahankan pola makan dan gaya hidup sehat Anda dengan makan-makanan bergizi dan berolahraga!';
        } else if (bmi >= 25 && bmi < 29.9) {
            message = 'Anda berada dalam kategori overweight atau kelebihan berat badan. Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalori makanan yang dikonsumsi dan berolahraga.<br> Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas Normal.';
        } else {
            message = 'Anda berada dalam kategori obesitas. Konsultasikan dengan dokter untuk program penurunan berat badan yang sehat dan aman. serta kurangi makanan berlemak';
        }
        dynamicMessage.innerHTML = `<p>${message}</p>`;
    }

    //Percabangan pesan yang akan tampil di BMI message
    const bmiMessage = document.getElementById('bmi-message');
if (bmiMessage) {
    let messageHTML = '';
    if (bmi < 18.5) {
        messageHTML = `
            <p class="message-title">Beberapa penyakit yang mungkin muncul:</p>
            <ul class="disease-list">
                <li>Malnutrisi</li>
                <li>Osteoporosis</li>
                <li>Kardiovaskular</li>
                <li>Sistem kekebalan tubuh lemah</li>
            </ul>
        `;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        messageHTML = '<p class="message-ideal">Tubuh Anda sehat. Jagalah terus kesehatan tubuh Anda!</p>';
    } else {
        messageHTML = `
            <p class="message-title">Beberapa penyakit dari kegemukan:</p>
            <ul class="disease-list">
                <li>Diabetes</li>
                <li>Hipertensi</li>
                <li>Sakit jantung</li>
                <li>Osteoarthritis</li>
            </ul>
        `;
    }
    bmiMessage.innerHTML = messageHTML;
}

    // Ubah gambar latar belakang konten kiri
    const leftClass = document.querySelector('.left-class');
    if (leftClass) {
        leftClass.style.backgroundImage = "url('css/kiri.jpg')";
        console.log("Left class background image changed");
    } else {
        console.error("Left class element not found");
    }

    // menampilkan konten kanan dengan gambar baru
    const rightClass = document.querySelector('.right-class');
    if (rightClass) {
        rightClass.style.display = 'block';
        rightClass.style.backgroundImage = "url('css/kanan.jpg')";

        // menyesuaikan lebar container utama
        const sectionClass = document.querySelector('.section-class');
        if (sectionClass) {
            sectionClass.style.width = '200%'; // Membuat container dua kali lebih lebar
        }

        console.log("Right class displayed");
    } else {
        console.error("Right class element not found");
    }
}

//fungsi reset form element
function resetForm() {
    document.querySelector('.form-class').reset();
    const resultContent = document.getElementById('result-content');
    if (resultContent) {
        resultContent.innerHTML = '';
    }
    const rightClass = document.querySelector('.right-class');
    if (rightClass) {
        rightClass.style.display = 'none';
    }

    // Mereset gambar latar belakang konten kiri ke gambar awal
    const leftClass = document.querySelector('.left-class');
    if (leftClass) {
        leftClass.style.backgroundImage = "url('css/image.jpg')";
        console.log("Left class background image reset");
    }

    // Mereset lebar container utama
    const sectionClass = document.querySelector('.section-class');
    if (sectionClass) {
        sectionClass.style.width = '100%';
    }

    const downloadButton = document.querySelector('.download-class');
    if (downloadButton) {
        downloadButton.removeEventListener('click', downloadHasilBMI);
    }
}

//Fungsi untuk Download hasil BMI
function downloadHasilBMI() {
    const resultContent = document.getElementById('result-content');
    if (resultContent) {
        // Ambil teks dari result-content
        const text = resultContent.innerText;

        // Buat instance jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Tambahkan teks ke PDF
        doc.text(text, 10, 10);

        // Simpan PDF
        doc.save('Hasil_BMI.pdf');
    } else {
        console.error("Result content not found");
        alert("Maaf, hasil BMI tidak tersedia untuk diunduh.");
    }
}

// Event listener untuk resize window
window.addEventListener('resize', function() {
    const leftClass = document.querySelector('.left-class');
    const rightClass = document.querySelector('.right-class');
    if (leftClass && rightClass && rightClass.style.display !== 'none') {
        const leftHeight = leftClass.offsetHeight;
        rightClass.style.height = `${leftHeight}px`;
    }
});