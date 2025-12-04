document.addEventListener('DOMContentLoaded', function() {
    
    
    
    const dateInput = document.getElementById('projectDate');
    if (dateInput) {
        flatpickr("#projectDate", {
            theme: "dark",              
            altInput: true,             
            altFormat: "F j, Y",        
            dateFormat: "Y-m-d",        
            minDate: "today",           
            disableMobile: "true"       
        });
    }

    
    const formElement = document.getElementById('offerForm');
    if (formElement) {
        formElement.addEventListener('submit', function(e) {
            e.preventDefault();

            
            const name = document.getElementById('clientName').value;
            const service = document.getElementById('serviceType').value;
            const date = document.getElementById('projectDate').value; 
            const msg = document.getElementById('message').value;

            
            if (name.trim() === "" || service === "" || date === "") {
                alert("Harap lengkapi Nama, Layanan, dan Tanggal Deadline!");
                return;
            }

            
            const newOrder = {
                id: Date.now(), 
                clientName: name,
                serviceType: service,
                deadline: date,
                status: 'Pending Review' 
            };

            
            let orders = JSON.parse(localStorage.getItem('myOrders')) || [];
            orders.push(newOrder);
            localStorage.setItem('myOrders', JSON.stringify(orders));

            // Feedback & Reset
            alert(`Sukses! Permintaan untuk jasa ${service} telah tercatat di Riwayat Pesanan.`);
            formElement.reset();
            
            
            window.location.href = 'history.html';
        });
    }

    
    const historyContainer = document.getElementById('historyList');
    if (historyContainer) {
        const orders = JSON.parse(localStorage.getItem('myOrders')) || [];

        if (orders.length === 0) {
            historyContainer.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-clipboard-x" style="font-size: 3rem; opacity: 0.5;"></i>
                    <p class="mt-3">Belum ada riwayat pesanan.</p>
                    <a href="contact.html" class="btn btn-outline-glow btn-sm mt-2">Buat Pesanan Baru</a>
                </div>
            `;
        } else {
            
            orders.reverse().forEach(order => {
                
                const dateObj = new Date(order.deadline);
                const dateString = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

                const cardHTML = `
                    <div class="glass-card mb-3 p-4">
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div>
                                <h5 class="fw-bold text-white mb-1">${order.serviceType}</h5>
                                <p class="text-dim mb-0 small"><i class="bi bi-calendar-event me-2"></i>Deadline: ${dateString}</p>
                            </div>
                            <div class="text-end mt-2 mt-md-0">
                                <span class="status-badge status-pending">${order.status}</span>
                                <div class="text-dim small mt-2">Ref ID: #${order.id}</div>
                            </div>
                        </div>
                    </div>
                `;
                historyContainer.innerHTML += cardHTML;
            });
        }
    }
    
    
    const clearBtn = document.getElementById('clearHistory');
    if(clearBtn) {
        clearBtn.addEventListener('click', function() {
            if(confirm("Yakin ingin menghapus semua riwayat?")) {
                localStorage.removeItem('myOrders');
                location.reload();
            }
        });
    }
});