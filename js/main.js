// Inisialisasi Elemen
const menu = document.querySelector('.menu');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const iconBars = document.querySelector('.icon-bars');
const iconClose = document.querySelector('.icon-close');
const sliderContent = document.querySelector('.slider-content');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

// Modal Sertifikat
const modal = document.getElementById("certificateModal");
const modalImg = document.getElementById('imgModal');
const captionText = document.getElementById("caption");
const span = document.querySelector(".close-modal");

// Modal Pengalaman
const expModal = document.getElementById("experienceModal");
const expDetail = document.getElementById("experienceDetail");
const closeExp = document.querySelector(".close-experience");

// Data Source
const dataPengalaman = {
    "klinik": {
        title: "Klinik Max Dental Center - Admin & IT Support",
        desc: "(1) Berhasil melakukan transisi dari sistem manual ke digital dengan mengelola dokumentasi medis secara akurat untuk mendukung pemenuhan standar akreditasi klinik. (2) Mengoptimalkan alur sistem pendaftaran pasien yang berdampak langsung pada peningkatan efisiensi operasional harian klinik. (3) Memastiikan kelancaran operasional di Klinik dengan menangani pemeliharaan perangkat IT dan memberikan dukungan teknis harian bagi staf klinik.",
        images: ["images/pengalaman/klinik/k1.webp","images/pengalaman/klinik/k2.webp","images/pengalaman/klinik/k3.webp","images/pengalaman/klinik/k4.webp"]
    },
    "putri-intan": {
        title: "CV Putri Intan Kencana - Pengembang Web",
        desc: "(1) Merancang dan membangun aplikasi web menggunakan bahasa pemrograman PHP untuk mengotomisasi sistem penjualan perusahaan. (2) Mengintegrasikan basis data MySQL yang memungkinkan perusahaan melacak stok barang dan histori secara real-time. (3) Bekerja sama dengan staf operasional untuk memastikan antarmuka aplikasi (UI) intuitif dan mudah digunakan dalam aktivitas kerja sehari-hari.",
        images: ["images/pengalaman/putri-kencana/pk1.webp","images/pengalaman/putri-kencana/pk2.webp","images/pengalaman/putri-kencana/pk3.webp","images/pengalaman/putri-kencana/pk4.webp"]
    },
    "mbkm": {
        title: "MBKM Kampus Mengajar 3 - Asisten Pengajar",
        desc: "(1) Memimpin dan mengkoordinasikan kelompok mahasiswa dalam menyusun rencana pembelajaraan inovativ yang disesuaikan dengan kebutuhan sekolah. (2) Bertindak sebagai penghubung utama antara pihak sekolah, mahasiswa dan koordinator program untuk memastikan seluruh target pengabdian tercapai. (3) Menjalankan kegiatan pembelajaran kreatif yang dirancang untuk meningkatkan efektivitas edukasi bagi siswa di lingkungan sekolah tersebut..",
        images: ["images/pengalaman/mbkm/mbkm1.webp","images/pengalaman/mbkm/mbkm2.webp","images/pengalaman/mbkm/mbkm3.webp","images/pengalaman/mbkm/mbkm4.webp"]
    }
};

const allCertificates = [
    { img: 'jna.webp', title: 'Administrator Jaringan Muda' },
    { img: 'dms.webp', title: 'Data Management Staff' },
    { img: 'jwd.webp', title: 'Pengembang Web Pratama' },
    { img: 'html5.webp', title: 'HTML5 Development App' },
    { img: 'pjna.webp', title: 'Pelatihan Junior Net Admin' },
    { img: 'pdea.webp', title: 'Pelatihan Digital Enterp Acc' },
    { img: 'geept.webp', title: 'Golden English EPT' },
    { img: 'uept.webp', title: 'Uniku English Proficiency Test' },
    { img: 'toefl.webp', title: 'TOEFL ITP Certificate' },
    { img: 'bhd.webp', title: 'Sertifikat BHD KEMENKES' },
    { img: 'jwr.webp', title: 'Juara 2 Lomba Video Pendek' },
    { img: 'pnt.webp', title: 'Panitia FKOMFEST 2021' },
];

const allProjects = [
    { img: 'prjk1.webp', title: 'Aplikasi Sistem Pakar Bioponik', category: 'Web Development' },
    { img: 'prjk2.webp', title: 'Aplikasi Prediksi Jurusan C45', category: 'Web Development' },
    { img: 'prjk3.webp', title: 'Aplikasi SIM FIFO', category: 'Web Development' },
    { img: 'prjk4.webp', title: 'Aplikasi Furniture CRM', category: 'Web Development' },
    { img: 'prjk5.webp', title: 'Aplikasi SPK SAW', category: 'Web Development' },
    { img: 'prjk6.webp', title: 'Kamu, Alamku', category: 'Videoghraphy' },
    { img: 'prjk7.webp', title: 'Ini Hidup', category: 'Videoghraphy' },
    { img: 'prjk8.webp', title: 'Kembali', category: 'Videoghraphy' }
];

const allExperiences = [
    { id: "klinik", img: "images/pengalaman/p1.webp", company: "Klinik Max Dental Center", role: "Admin & IT Support", period: "Jul 2025 - Jan 2026" },
    { id: "putri-intan", img: "images/pengalaman/p2.webp", company: "CV Putri Intan Kencana", role: "Pengembang Web", period: "Okt 2022 - Feb 2023" },
    { id: "mbkm", img: "images/pengalaman/p3.webp", company: "MBKM Kampus Mengajar 3", role: "Asisten Pengajar", period: "Jan 2022 - Jul 2022" }
];

// --- FUNGSI HELPER SCROLL (Agar tidak loncat) ---
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80; // Sesuaikan dengan tinggi navbar sticky kamu
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = section.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// --- LOGIKA PENGALAMAN ---
const expPerPage = 3; 
let currentExpPage = 1;

function displayExperiences(page) {
    const grid = document.getElementById('experience-grid');
    if (!grid) return;
    
    grid.innerHTML = "";
    page--;
    const start = expPerPage * page;
    const end = start + expPerPage;
    const paginatedItems = allExperiences.slice(start, end);

    paginatedItems.forEach(exp => {
        grid.innerHTML += `
        <div class="item">
            <img src="${exp.img}" alt="${exp.company}" loading="lazy">
            <div class="item-detail">
                <p>${exp.company} <br> - ${exp.role}</p>
                <div>
                    <small><i class="fa-solid fa-clock"></i> ${exp.period}</small>
                    <a href="javascript:void(0)" class="button btn-pengalaman" onclick="openExpModal('${exp.id}')">
                        <i class="fa-solid fa-eye"></i> Lihat
                    </a>
                </div>
            </div>
        </div>`;
    });
    setupExpPagination();
}

function setupExpPagination() {
    const pageNumbers = document.getElementById('exp-page-numbers');
    const paginationContainer = document.getElementById('exp-pagination');
    const pageCount = Math.ceil(allExperiences.length / expPerPage);

    if (!pageNumbers || !paginationContainer) return;

    if (pageCount <= 1) {
        paginationContainer.style.display = "none";
        return;
    } else {
        paginationContainer.style.display = "flex";
    }

    pageNumbers.innerHTML = "";
    for (let i = 1; i <= pageCount; i++) {
        let btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('page-num');
        if (i === currentExpPage) btn.classList.add('active');
        btn.onclick = (e) => {
            e.preventDefault();
            currentExpPage = i;
            displayExperiences(i);
            scrollToSection('pengalaman');
        };
        pageNumbers.appendChild(btn);
    }

    document.getElementById('prev-exp').disabled = currentExpPage === 1;
    document.getElementById('next-exp').disabled = currentExpPage === pageCount;
}

// --- LOGIKA SERTIFIKAT ---
const cardsPerPage = 6;
let currentPage = 1;

function displayCertificates(page) {
    const grid = document.getElementById('certificate-grid');
    if(!grid) return;

    grid.innerHTML = "";
    page--;
    const start = cardsPerPage * page;
    const end = start + cardsPerPage;
    const paginatedItems = allCertificates.slice(start, end);

    paginatedItems.forEach(cert => {
        grid.innerHTML += `
        <div class="item">
            <div class="item-detail">
                <img src="images/sertifikasi/${cert.img}" alt="${cert.title}" loading="lazy">
                <div>
                    <small><i class="fa-solid fa-address-card"></i> ${cert.title}</small>
                    <a href="javascript:void(0)" class="button btn-lihat" onclick="openCertModal('images/sertifikasi/${cert.img}', '${cert.title}')">
                        <i class="fa-solid fa-eye"></i> Lihat
                    </a>
                </div>
            </div>
        </div>`;
    });
    setupPagination();
}

function setupPagination() {
    const pageNumbers = document.getElementById('page-numbers');
    const paginationContainer = document.getElementById('pagination');
    const pageCount = Math.ceil(allCertificates.length / cardsPerPage);

    if (!pageNumbers || !paginationContainer) return;

    if (pageCount <= 1) {
        paginationContainer.style.display = "none";
        return;
    } else {
        paginationContainer.style.display = "flex";
    }

    pageNumbers.innerHTML = "";
    for (let i = 1; i <= pageCount; i++) {
        let btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('page-num');
        if (i === currentPage) btn.classList.add('active');
        btn.onclick = (e) => {
            e.preventDefault();
            currentPage = i;
            displayCertificates(i);
            scrollToSection('certificate');
        };
        pageNumbers.appendChild(btn);
    }

    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === pageCount;
}

// --- LOGIKA PROJEK ---
function displayProjects() {
    const slider = document.getElementById('project-slider');
    if(!slider) return;
    slider.innerHTML = allProjects.map(proj => `
        <div class="slider-item">
            <img src="images/projek/${proj.img}" alt="${proj.title}">
            <div class="slider-desc">
                <h5>${proj.title}</h5>
                <small>${proj.category}</small>
            </div>
        </div>`).join('');
}

// --- MODAL FUNCTIONS ---
window.openCertModal = function(imgSrc, title) {
    if (modal && modalImg) {
        modal.style.display = "block";
        modalImg.src = imgSrc;
        captionText.innerHTML = title;
    }
};

window.openExpModal = function(id) {
    const data = dataPengalaman[id];
    if (data) {
        let imagesHtml = data.images.map(img => 
            `<img src="${img}" alt="Gallery" loading="lazy" class="modal-gallery-img">`).join('');
        expDetail.innerHTML = `
            <h3 style="color:#00ADB5; margin-bottom:10px;">${data.title}</h3>
            <p style="color:#eee; line-height:1.6; margin-bottom:20px; text-align:justify;">${data.desc}</p>
            <p style="font-weight:bold; color:#00ADB5; margin-bottom:10px;">Gallery Kegiatan:</p>
            <div class="exp-slider-container">
                <div class="exp-slider" id="modalSlider">
                    ${imagesHtml}
                </div>
                ${data.images.length > 1 ? `
                <div class="exp-nav">
                    <button onclick="moveExpSlider(-1)"><i class="fa-solid fa-chevron-left"></i></button>
                    <button onclick="moveExpSlider(1)"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
                ` : ''}
            </div>
        `;
        expModal.style.display = "block";
    }
};

window.moveExpSlider = function(direction) {
    const slider = document.getElementById('modalSlider');
    const scrollAmount = slider.clientWidth + 10;
    slider.scrollLeft += direction * scrollAmount;
};

// Navigasi Mobile
hamburgerMenu.onclick = displayMenu;
menu.onclick = (e) => {
    if(e.target.tagName === 'A') displayMenu();
};

function displayMenu() {
    menu.classList.toggle('tampil');
    const isTampil = menu.classList.contains('tampil');
    iconBars.style.display = isTampil ? 'none' : 'inline';
    iconClose.style.display = isTampil ? 'inline' : 'none';
}

// Slider Projek
nextBtn.onclick = () => {
    const item = document.querySelector('.slider-item');
    if(item) sliderContent.scrollLeft += item.clientWidth + 20;
};
prevBtn.onclick = () => {
    const item = document.querySelector('.slider-item');
    if(item) sliderContent.scrollLeft -= item.clientWidth + 20;
};

// Pagination Cert Prev/Next
document.getElementById('prev-page').onclick = (e) => {
    e.preventDefault();
    if(currentPage > 1) {
        currentPage--;
        displayCertificates(currentPage);
        scrollToSection('certificate');
    }
};
document.getElementById('next-page').onclick = (e) => {
    e.preventDefault();
    const pageCount = Math.ceil(allCertificates.length / cardsPerPage);
    if(currentPage < pageCount) {
        currentPage++;
        displayCertificates(currentPage);
        scrollToSection('certificate');
    }
};

// Pagination Exp Prev/Next
document.getElementById('prev-exp').onclick = (e) => {
    e.preventDefault();
    if(currentExpPage > 1) {
        currentExpPage--;
        displayExperiences(currentExpPage);
        scrollToSection('pengalaman');
    }
};
document.getElementById('next-exp').onclick = (e) => {
    e.preventDefault();
    const pageCount = Math.ceil(allExperiences.length / expPerPage);
    if(currentExpPage < pageCount) {
        currentExpPage++;
        displayExperiences(currentExpPage);
        scrollToSection('pengalaman');
    }
};

// Close Modals
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
    if (event.target == expModal) expModal.style.display = "none";
};
if(span) span.onclick = () => modal.style.display = "none";
if(closeExp) closeExp.onclick = () => expModal.style.display = "none";

// Run Initialization
displayExperiences(currentExpPage);
displayCertificates(currentPage);
displayProjects();
