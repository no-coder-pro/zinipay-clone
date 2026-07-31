const PAYMENT_CONFIG = {
  shopName: "Premium Wala",
  invoiceNo: "INV-XXXXXXXXXX",
  amountBDT: 182,
  amountUSDT: 1.54,
  chargeBDT: 2,
  logoUrl: "images/logo.jpg",
  helplinePhone: "+880 XXXXXXXXXX",
  whatsappUrl: "#",

  bkashNumber: "01XXXXXXXXX",
  nagadNumber: "01XXXXXXXXX",
  rocketNumber: "01XXXXXXXXXX",
  upayNumber: "01XXXXXXXXX",
  celfinNumber: "01XXXXXXXXX",

  bankDetails: {
    bankName: "Islami Bank Bangladesh PLC",
    accountName: "Merchant Account Name",
    accountNumber: "01XXXXXXXXXXXXX",
    branchName: "Branch Name",
    district: "District",
    routingNumber: "XXXXXXXXX"
  },

  binanceUid: "XXXXXXXXX"
};

const SVG_SPINNER = `<svg class="spin-loader" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-linecap="round"></path></svg>`;

function setPaymentConfig(newConfig) {
  Object.assign(PAYMENT_CONFIG, newConfig);
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-pill').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(pane => pane.style.display = 'none');

  const selectedTabBtn = document.getElementById(`tab-btn-${tabId}`);
  const selectedPane = document.getElementById(`pane-${tabId}`);

  if (selectedTabBtn) selectedTabBtn.classList.add('active');
  if (selectedPane) selectedPane.style.display = 'grid';
}

function openFlow(methodKey) {
  switch (methodKey) {
    case 'bangla-qr': openBanglaQRStep1(); break;
    case 'bkash': openBkashStep1(); break;
    case 'nagad': openNagadStep1(); break;
    case 'rocket': openRocketStep1(); break;
    case 'upay': openUpayStep1(); break;
    case 'cellfin': openCelfinFlow(); break;
    case 'binance': openBinanceFlow(); break;
    case 'taptap': openTaptapFlow(); break;
    case 'bank-ibbl': openBankTransferFlow(); break;
  }
}

function toggleTrxInput(boxId) {
  const box = document.getElementById(boxId);
  if (!box) return;
  box.style.display = box.style.display === 'none' ? 'flex' : 'none';
}

function submitManualTrx(methodName, inputId) {
  const input = document.getElementById(inputId);
  const val = input ? input.value.trim() : '';
  if (!val) {
    showToast('Please enter your Transaction ID');
    return;
  }
  confirmPayment(methodName);
}

function openBankTransferFlow() {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="celfin-modal-container">
      <div class="celfin-top-nav">
        <button class="celfin-icon-btn" onclick="closeModal()" title="Back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button class="celfin-icon-btn" onclick="closeModal()" title="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="celfin-summary-row">
        <div class="celfin-summary-left">
          <img src="${PAYMENT_CONFIG.logoUrl}" alt="Shop Avatar" class="celfin-shop-avatar" onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=38x38&data=${encodeURIComponent(PAYMENT_CONFIG.shopName)}';">
          <div>
            <div class="celfin-shop-name">${PAYMENT_CONFIG.shopName}</div>
            <div class="celfin-inv-str">INVOICE <br>${PAYMENT_CONFIG.invoiceNo}</div>
          </div>
        </div>
        <div class="celfin-summary-right">
          ৳ ${PAYMENT_CONFIG.amountBDT}
        </div>
      </div>

      <div class="celfin-logo-center-wrap">
        <img src="images/celfin.png" alt="Islami Bank Logo" class="celfin-logo-center-img">
      </div>

      <div class="bank-outer-card">
        <div class="bank-header-subrow">
          <div class="bank-meta-left">
            <div class="bank-avatar-box">
              <img src="images/celfin.png" alt="Islami Bank" class="bank-avatar-img">
            </div>
            <div>
              <div class="bank-name-title">${PAYMENT_CONFIG.bankDetails.bankName}</div>
              <div class="bank-sub-type">Bank Transfer</div>
            </div>
          </div>
          <div class="bank-payable-right">${PAYMENT_CONFIG.amountBDT} BDT</div>
        </div>

        <div class="bank-details-table">
          <div class="bank-table-row">
            <span class="bank-label-text">Merchant Account Name</span>
            <div class="bank-val-box">
              <span>${PAYMENT_CONFIG.bankDetails.accountName}</span>
              <button class="bank-mini-copy-btn" onclick="copyValue('${PAYMENT_CONFIG.bankDetails.accountName}')" title="Copy Name">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>

          <div class="bank-table-row">
            <span class="bank-label-text">Merchant Account Number</span>
            <div class="bank-val-box">
              <span style="font-family:monospace;">${PAYMENT_CONFIG.bankDetails.accountNumber}</span>
              <button class="bank-mini-copy-btn" onclick="copyValue('${PAYMENT_CONFIG.bankDetails.accountNumber}')" title="Copy Account Number">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>

          <div class="bank-table-row">
            <span class="bank-label-text">Branch Name</span>
            <div class="bank-val-box">
              <span>${PAYMENT_CONFIG.bankDetails.branchName}</span>
              <button class="bank-mini-copy-btn" onclick="copyValue('${PAYMENT_CONFIG.bankDetails.branchName}')" title="Copy Branch">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>

          <div class="bank-table-row">
            <span class="bank-label-text">District</span>
            <div class="bank-val-box">
              <span>${PAYMENT_CONFIG.bankDetails.district}</span>
              <button class="bank-mini-copy-btn" onclick="copyValue('${PAYMENT_CONFIG.bankDetails.district}')" title="Copy District">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>

          <div class="bank-table-row">
            <span class="bank-label-text">Routing Number</span>
            <div class="bank-val-box">
              <span style="font-family:monospace;">${PAYMENT_CONFIG.bankDetails.routingNumber}</span>
              <button class="bank-mini-copy-btn" onclick="copyValue('${PAYMENT_CONFIG.bankDetails.routingNumber}')" title="Copy Routing Number">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="bank-upload-dropzone" id="bank-upload-label" onclick="document.getElementById('bank-file-input').click()">
          Payment Slip / Screenshot
        </div>
        <input type="file" id="bank-file-input" style="display:none;" onchange="handleBankFileSelect(this)">

        <input type="text" id="bank-ref-input" class="bank-input-box" placeholder="Transaction Reference / Bank Reference ID">
        <textarea id="bank-notes" class="bank-input-box" placeholder="Optional info" rows="3" style="resize:vertical;"></textarea>
      </div>

      <button class="bank-submit-btn" onclick="submitBankPayment()">Submit Bank Payment</button>
    </div>
  `;

  backdrop.classList.add('active');
}

function handleBankFileSelect(input) {
  const label = document.getElementById('bank-upload-label');
  if (input.files && input.files[0]) {
    label.textContent = `✔ Selected: ${input.files[0].name}`;
    label.style.borderColor = '#008751';
    label.style.color = '#008751';
  }
}

function submitBankPayment() {
  const input = document.getElementById('bank-ref-input');
  const val = input ? input.value.trim() : '';

  if (!val) {
    showToast('Please enter your Transaction Reference / Bank Ref ID');
    return;
  }

  confirmPayment('Islami Bank Direct Wire');
}

function openTaptapFlow() {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="celfin-modal-container">
      <div class="celfin-top-nav">
        <button class="celfin-icon-btn" onclick="closeModal()" title="Back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button class="celfin-icon-btn" onclick="closeModal()" title="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="celfin-summary-row">
        <div class="celfin-summary-left">
          <img src="${PAYMENT_CONFIG.logoUrl}" alt="Shop Avatar" class="celfin-shop-avatar" onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=38x38&data=${encodeURIComponent(PAYMENT_CONFIG.shopName)}';">
          <div>
            <div class="celfin-shop-name">${PAYMENT_CONFIG.shopName}</div>
            <div class="celfin-inv-str">INVOICE <br>${PAYMENT_CONFIG.invoiceNo}</div>
          </div>
        </div>
        <div class="celfin-summary-right">
          ৳ ${PAYMENT_CONFIG.amountBDT}
        </div>
      </div>

      <div class="celfin-logo-center-wrap">
        <img src="images/taptap-send.jpg" alt="Taptap Send Logo" class="tt-logo-center-img">
      </div>

      <div class="celfin-note-box">
        <span class="celfin-note-tag">নোটঃ</span> টাকা পাঠানোর ৫-১০ সেকেন্ড পর ভেরিফাই করবেন।
      </div>

      <div class="tt-green-card">
        <h3 class="tt-card-title">ট্রানজেকশন আইডি দিন</h3>
        <input type="text" id="tt-trx-input" class="tt-input-field" placeholder="ট্রানজেকশন আইডি দিন">

        <div class="tt-subcard">
          <div class="tt-subcard-title">Submit payment details</div>
          <div class="tt-subcard-desc">You can submit your phone number and transaction ID for admin review.</div>
          <div class="tt-subcard-desc-bn">ভেরিফাই না হলে ফোন নাম্বার ও ট্রানজেকশন আইডি দিয়ে ম্যানুয়াল রিভিউতে জমা দিন।</div>
        </div>

        <div class="tt-subcard">
          <div class="tt-subcard-title">Manual Review Request / ম্যানুয়াল রিভিউ</div>
          <input type="text" id="tt-sender" class="tt-input-field" placeholder="Sender account / email / phone" style="margin-bottom:0.65rem;">
          
          <div class="tt-upload-box" id="tt-upload-label" onclick="document.getElementById('tt-file-input').click()">
            📷 Payment Screenshot / Proof
          </div>
          <input type="file" id="tt-file-input" style="display:none;" onchange="handleTtFileSelect(this)">

          <input type="text" id="tt-trx2" class="tt-input-field" placeholder="Transaction ID / ট্রানজেকশন আইডি" style="margin-bottom:0.65rem;">
          <textarea id="tt-notes" class="tt-textarea" placeholder="Optional info" rows="3"></textarea>

          <button class="tt-inner-submit-btn" onclick="submitTtAdminReview()">Submit for Admin Review</button>
        </div>

        <div>
          <div style="font-size:0.75rem; font-weight:800; color:#FEF08A; text-transform:uppercase; margin-top:0.5rem; margin-bottom:0.5rem;">INSTRUCTIONS</div>
          <div style="display:flex; flex-direction:column; gap:0.65rem; font-size:0.825rem; color:#FEF08A; font-weight:700;">
            <div>• Send the exact amount using the TapTap Send details shown above.</div>
            <div>• Amount: ${PAYMENT_CONFIG.amountBDT}</div>
            <div>• Enter your transaction/reference ID and press VERIFY.</div>
          </div>
        </div>
      </div>

      <button class="tt-bottom-verify-btn" onclick="submitTtAdminReview()">Submit for Admin Review</button>
    </div>
  `;

  backdrop.classList.add('active');
}

function handleTtFileSelect(input) {
  const label = document.getElementById('tt-upload-label');
  if (input.files && input.files[0]) {
    label.textContent = `✔ Selected: ${input.files[0].name}`;
    label.style.borderColor = '#FEF08A';
    label.style.color = '#FEF08A';
  }
}

function submitTtAdminReview() {
  showToast('Your payment details have been submitted for Admin Review!');
  confirmPayment('Taptap Send');
}

function openBinanceFlow() {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="bn-modal-container">
      <div class="bn-header-banner">
        <button class="bn-close-btn" onclick="closeModal()" title="Close">&times;</button>
        <div class="bn-header-logo-row">
          <svg viewBox="0 0 24 24" style="width:28px; height:28px; fill:#1E2329;" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.624 13.9202l2.7175 2.7154-7.353 7.353-7.353-7.352 2.7175-2.7164 4.6355 4.6595 4.6356-4.6595zm4.6366-4.6366L24 12l-2.7394 2.7154-2.7175-2.7154 2.7175-2.7164zM7.353 2.7154L11.9886 7.375l4.6355-4.6596 2.7175 2.7154-7.353 7.353-7.353-7.353 2.7175-2.7154zm-4.6366 4.6366L5.434 10.068l-2.7175 2.7164L0 12l2.7164-2.7154zM12 10.426L10.426 12 12 13.574 13.574 12 12 10.426z"></path>
          </svg>
          <h2 class="bn-header-title">Binance Pay</h2>
        </div>
        <div class="bn-header-sub">Secure and fast crypto checkout</div>
      </div>

      <div class="bn-content-body">
        <div class="bn-amount-box">
          <div>
            <div class="bn-amount-label">AMOUNT TO PAY</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="bn-amount-val">${PAYMENT_CONFIG.amountUSDT} <span style="font-size:0.95rem; font-weight:700; color:#707A8A;">USDT</span></span>
            <button style="background:none; border:none; color:#707A8A; cursor:pointer;" onclick="copyValue('${PAYMENT_CONFIG.amountUSDT}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>
        </div>

        <div class="bn-step-block">
          <span class="bn-step-badge">1</span>
          <div class="bn-step-content">
            <div class="bn-step-title">Open Binance App</div>
            <div class="bn-step-desc">Go to your Binance Mobile App or Website and choose <strong>"Send to Binance User"</strong>.</div>
          </div>
        </div>

        <div class="bn-step-block">
          <span class="bn-step-badge">2</span>
          <div class="bn-step-content">
            <div class="bn-step-title">Transfer Details</div>
            <div class="bn-uid-card">
              <div class="bn-uid-sub">Send exactly to this Binance UID:</div>
              <div class="bn-uid-input-row">
                <span class="bn-uid-val">${PAYMENT_CONFIG.binanceUid}</span>
                <button style="background:none; border:none; color:#1E2329; cursor:pointer;" onclick="copyValue('${PAYMENT_CONFIG.binanceUid}')">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="bn-step-block">
          <span class="bn-step-badge">3</span>
          <div class="bn-step-content">
            <div class="bn-step-title">Verify Payment</div>
            <div class="bn-step-desc">After transferring, enter the <strong>Order ID</strong> (Transaction Hash/ID) below to verify your payment.</div>
            
            <div style="font-size:0.8rem; font-weight:700; color:#1E2329; margin-top:0.65rem;">Binance Order ID</div>
            <input type="text" id="binance-order-input" class="bn-order-input" placeholder="e.g. 1928374650">

            <button class="bn-verify-btn" onclick="submitBinancePayment()">Verify Payment</button>
          </div>
        </div>
      </div>

      <div class="bn-warning-footer">
        <span>⚠️</span>
        <span>Please confirm the network is correct before sending.</span>
      </div>
    </div>
  `;

  backdrop.classList.add('active');
}

function submitBinancePayment() {
  const input = document.getElementById('binance-order-input');
  const val = input ? input.value.trim() : '';

  if (!val) {
    showToast('Please enter your Binance Order ID');
    return;
  }

  confirmPayment('Binance Pay');
}

function openCelfinFlow() {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="celfin-modal-container">
      <div class="celfin-top-nav">
        <button class="celfin-icon-btn" onclick="closeModal()" title="Back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button class="celfin-icon-btn" onclick="closeModal()" title="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="celfin-summary-row">
        <div class="celfin-summary-left">
          <img src="${PAYMENT_CONFIG.logoUrl}" alt="Shop Avatar" class="celfin-shop-avatar" onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=38x38&data=${encodeURIComponent(PAYMENT_CONFIG.shopName)}';">
          <div>
            <div class="celfin-shop-name">${PAYMENT_CONFIG.shopName}</div>
            <div class="celfin-inv-str">INVOICE <br>${PAYMENT_CONFIG.invoiceNo}</div>
          </div>
        </div>
        <div class="celfin-summary-right">
          ৳ ${PAYMENT_CONFIG.amountBDT}
        </div>
      </div>

      <div class="celfin-logo-center-wrap">
        <img src="images/celfin.png" alt="CellFin Logo" class="celfin-logo-center-img">
      </div>

      <div class="celfin-note-box">
        <span class="celfin-note-tag">নোটঃ</span> টাকা পাঠানোর ৫-১০ সেকেন্ড পর ভেরিফাই করবেন।
      </div>

      <div class="celfin-green-card">
        <h3 class="celfin-green-title">ট্রানজেকশন আইডি দিন</h3>
        <input type="text" id="celfin-trx-input" class="celfin-trx-input" placeholder="ট্রানজেকশন আইডি দিন">

        <div>
          <div class="celfin-instruct-heading">INSTRUCTIONS</div>
          <div class="celfin-instruct-list">
            <div class="celfin-instruct-item">
              <span class="celfin-instruct-bullet">•</span>
              <span><strong>CELLFIN</strong> অ্যাপ ওপেন করুন।</span>
            </div>
            <div class="celfin-instruct-item">
              <span class="celfin-instruct-bullet">•</span>
              <span><strong>"Fund Transfer"</strong> সিলেক্ট করুন।</span>
            </div>
            <div class="celfin-instruct-item">
              <span class="celfin-instruct-bullet">•</span>
              <span>প্রাপক নম্বর দিন: <strong style="font-size:1.05rem; color:#FEF08A;">${PAYMENT_CONFIG.celfinNumber}</strong> <button class="celfin-copy-btn" onclick="copyValue('${PAYMENT_CONFIG.celfinNumber}')">Copy</button></span>
            </div>
            <div class="celfin-instruct-item">
              <span class="celfin-instruct-bullet">•</span>
              <span>পরিমাণ: <strong style="color:#FEF08A;">${PAYMENT_CONFIG.amountBDT}</strong> টাকা দিয়ে <strong>SUBMIT</strong> করুন।</span>
            </div>

            <img src="images/celfin_personal.png" alt="CellFin Guide" class="celfin-guide-img">

            <div class="celfin-instruct-item">
              <span class="celfin-instruct-bullet">•</span>
              <span>Transaction ID দিয়ে <strong>VERIFY</strong> ক্লিক করুন।</span>
            </div>
          </div>
        </div>
      </div>

      <button class="celfin-verify-btn" onclick="submitCelfinPayment()">VERIFY TRANSACTION</button>
    </div>
  `;

  backdrop.classList.add('active');
}

function submitCelfinPayment() {
  const input = document.getElementById('celfin-trx-input');
  const val = input ? input.value.trim() : '';

  if (!val) {
    showToast('অনুগ্রহ করে ট্রানজেকশন আইডি (TrxID) দিন');
    return;
  }

  confirmPayment('CellFin');
}

function openUpayStep1() {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="bk-modal-container">
      <div class="bk-modal-header">
        <img src="images/upay.png" alt="Upay" class="bk-logo-head">
      </div>

      <div class="bk-merchant-card">
        <div class="bk-merchant-left">
          <div class="up-cart-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <div>
            <div class="bk-merchant-title">${PAYMENT_CONFIG.shopName}</div>
            <div class="bk-invoice-str">
              <span>Inv No: ${PAYMENT_CONFIG.invoiceNo}</span>
              <button style="background:none; border:none; color:#0284C7; cursor:pointer;" onclick="copyValue('${PAYMENT_CONFIG.invoiceNo}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="bk-amount-right">৳${PAYMENT_CONFIG.amountBDT}</div>
      </div>

      <div class="up-blue-body">
        <h3 class="bk-body-title">Your Upay Account Number</h3>
        
        <input type="tel" id="up-phone-input" class="bk-phone-input-field" placeholder="e.g 01XXXXXXXXX" maxlength="11" oninput="handleUpPhoneInput(this)">
        
        <div class="bk-terms-text">
          Confirm and proceed, <u onclick="openDrawerInfo('info')">terms & conditions</u>
        </div>
      </div>

      <div class="bk-actions-footer">
        <button class="btn-bk-cancel" onclick="closeModal()">Cancel</button>
        <button class="btn-bk-confirm" id="up-confirm-btn" disabled onclick="submitUpayStep1()">Confirm</button>
      </div>
    </div>
  `;

  backdrop.classList.add('active');
}

function handleUpPhoneInput(input) {
  const btn = document.getElementById('up-confirm-btn');
  if (!btn) return;

  const val = input.value.trim();
  if (val.length >= 11) {
    btn.disabled = false;
    btn.classList.add('btn-up-confirm', 'active');
  } else {
    btn.disabled = true;
    btn.classList.remove('btn-up-confirm', 'active');
  }
}

function submitUpayStep1() {
  const input = document.getElementById('up-phone-input');
  const val = input ? input.value.trim() : '';

  if (val.length < 11) {
    showToast('অনুগ্রহ করে ১১ ডিজিটের উপায় নম্বর দিন');
    return;
  }

  openUpayStep2(val);
}

function openUpayStep2(userPhone) {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="bk-modal-container">
      <div class="bk-modal-header">
        <img src="images/upay.png" alt="Upay" class="bk-logo-head">
      </div>

      <div class="bk-merchant-card">
        <div class="bk-merchant-left">
          <div class="up-cart-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <div>
            <div class="bk-merchant-title">${PAYMENT_CONFIG.shopName}</div>
            <div class="bk-invoice-str">
              <span>Inv No: ${PAYMENT_CONFIG.invoiceNo}</span>
              <button style="background:none; border:none; color:#0284C7; cursor:pointer;" onclick="copyValue('${PAYMENT_CONFIG.invoiceNo}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="bk-amount-right">৳${PAYMENT_CONFIG.amountBDT}</div>
      </div>

      <div class="up-blue-body">
        <div class="bk-number-box">
          <div>
            <div class="bk-num-label">PERSONAL NUMBER</div>
            <div class="bk-num-val">${PAYMENT_CONFIG.upayNumber}</div>
          </div>
          <button class="bk-copy-circle-btn" onclick="copyValue('${PAYMENT_CONFIG.upayNumber}')" title="Copy Number">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>

        <div class="bk-step-row">
          <span class="bk-step-circle" style="color:#0284C7;">1</span>
          <span>উপরের পার্সোনাল অ্যাকাউন্টের নম্বর কপি করুন</span>
        </div>

        <div class="bk-step-row">
          <span class="bk-step-circle" style="color:#0284C7;">2</span>
          <span>উপায় অ্যাপ এ যান তারপর 'সেন্ড মানি' নির্বাচন করুন</span>
        </div>

        <img src="images/upay_personal.png" alt="Upay Send Money Guide" class="up-guide-img">

        <div class="bk-step-row">
          <span class="bk-step-circle" style="color:#0284C7;">3</span>
          <span>একাউন্ট নম্বর পেস্ট করুন এবং কাঙ্ক্ষিত এমাউন্ট সেন্ড মানি করুন। সেন্ড মানি সম্পন্ন করে এই পেজে অপেক্ষা করুন, পেজটি বন্ধ করবেন না।</span>
        </div>

        <div class="bk-waiting-text">
          <span class="bk-white-dot-pulse"></span> Waiting for payment...
        </div>

        <div class="trx-toggle-row">
          <div class="bk-timer-row">
            Session expires in <span id="up-countdown" style="font-family:monospace; font-weight:700;">09:59</span>
          </div>
          <button class="btn-add-trx-pill" onclick="toggleTrxInput('up-trx-box')">Add Transaction ID</button>
        </div>

        <div class="trx-manual-input-box" id="up-trx-box" style="display:none;">
          <input type="text" id="up-trx-val" class="trx-manual-field" placeholder="Enter TrxID">
          <button class="trx-manual-submit-btn" onclick="submitManualTrx('Upay', 'up-trx-val')">Verify</button>
        </div>
      </div>

      <div class="bk-actions-footer">
        <button class="btn-bk-cancel" onclick="closeModal()">Cancel</button>
        <button class="btn-bk-confirm active" onclick="confirmPayment('Upay')">
          ${SVG_SPINNER} Auto verifying...
        </button>
      </div>
    </div>
  `;

  backdrop.classList.add('active');
  startUpCountdown();
}

let upTimerInterval = null;
function startUpCountdown() {
  if (upTimerInterval) clearInterval(upTimerInterval);
  let sec = 599;
  upTimerInterval = setInterval(() => {
    const timerElem = document.getElementById('up-countdown');
    if (!timerElem) {
      clearInterval(upTimerInterval);
      return;
    }
    if (sec <= 0) {
      clearInterval(upTimerInterval);
      timerElem.textContent = '00:00';
      return;
    }
    sec--;
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    timerElem.textContent = `${m}:${s}`;
  }, 1000);
}

function openBanglaQRStep1() {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="bqr-modal-container">
      <div class="bqr-header">
        <button class="bqr-back-btn" onclick="closeModal()" title="Back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <img src="images/bangla_qr.png" alt="Bangla QR" class="bqr-logo-img">
        <div class="bqr-title-text">BANGLA QR</div>
      </div>

      <div class="bqr-amount-box">
        <div class="bqr-amount-label">AMOUNT</div>
        <div class="bqr-amount-val">${PAYMENT_CONFIG.amountBDT}.00 BDT</div>
      </div>

      <div class="bqr-form-card">
        <h3 class="bqr-card-heading">Your Payment Phone Number</h3>
        <p class="bqr-card-subtext">যে ফোন নাম্বার থেকে QR payment করবেন, সেই নাম্বারটি দিন।</p>
        
        <input type="tel" id="bqr-phone-input" class="bqr-phone-input" placeholder="01XXXXXXXXX" maxlength="11" oninput="handleBqrPhoneInput(this)">
        
        <div class="bqr-next-info">
          <img src="images/bangla_qr.png" style="width:16px; height:16px; object-fit:contain;">
          <span>Bangla QR scan page will open next.</span>
        </div>
      </div>

      <div class="bqr-actions-row">
        <button class="btn-bqr-close" onclick="closeModal()">Close</button>
        <button class="btn-bqr-continue" id="bqr-continue-btn" disabled onclick="submitBqrStep1()">Continue</button>
      </div>

      <div class="bqr-footer-note">Payments are secured and verified automatically.</div>
    </div>
  `;

  backdrop.classList.add('active');
}

function handleBqrPhoneInput(input) {
  const btn = document.getElementById('bqr-continue-btn');
  if (!btn) return;

  const val = input.value.trim();
  btn.disabled = val.length < 11;
}

function submitBqrStep1() {
  const input = document.getElementById('bqr-phone-input');
  const val = input ? input.value.trim() : '';

  if (val.length < 11) {
    showToast('অনুগ্রহ করে ১১ ডিজিটের মোবাইল নম্বর দিন');
    return;
  }

  openBanglaQRStep2(val);
}

function openBanglaQRStep2(phoneNum) {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="bqr-modal-container">
      <div class="bqr-header">
        <button class="bqr-back-btn" onclick="openBanglaQRStep1()" title="Back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <img src="images/bangla_qr.png" alt="Bangla QR" class="bqr-logo-img">
        <div class="bqr-title-text">BANGLA QR</div>
      </div>

      <div class="bqr-amount-box">
        <div class="bqr-amount-label">AMOUNT</div>
        <div class="bqr-amount-val">${PAYMENT_CONFIG.amountBDT}.00 BDT</div>
      </div>

      <div class="bqr-qr-card">
        <div class="bqr-scan-label">
          <img src="images/bangla_qr.png" style="width:14px; height:14px; object-fit:contain;">
          <span>Scan to pay</span>
        </div>
        <div class="bqr-qr-image-wrapper">
          <img src="images/bangla_qr.png" alt="Bangla QR Code" class="bqr-qr-img" onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=155x155&data=BanglaQR_${PAYMENT_CONFIG.amountBDT}.00_BDT';">
        </div>
        <div class="bqr-dashed-divider"></div>
        <div class="bqr-fullscreen-sub">Tap QR code to view fullscreen</div>
      </div>

      <div class="bqr-steps-card">
        <div class="bqr-step-line">
          <span class="bqr-step-badge">1</span>
          <span>আপনার ব্যাংক বা MFS App এ প্রবেশ করুন।</span>
        </div>
        <div class="bqr-step-line">
          <span class="bqr-step-badge">2</span>
          <span>QR code scan করুন। Amount ${PAYMENT_CONFIG.amountBDT}.00 BDT দেন।</span>
        </div>
        <div class="bqr-step-line">
          <span class="bqr-step-badge">3</span>
          <span>Payment confirm করুন। payment auto verify হবে।</span>
        </div>
      </div>

      <div class="bqr-verify-section">
        <div class="bqr-verify-note">
          Please do not close this page. We will automatically verify your payment once it is completed.
        </div>

        <div class="bqr-status-pulse-row">
          <span class="green-dot-pulse"></span>
          <span>Waiting for payment...</span>
        </div>

        <div class="trx-toggle-row" style="justify-content:center;">
          <div class="bqr-session-timer">
            Session expires in <span id="bqr-countdown" style="font-family:monospace; font-weight:700;">09:59</span>
          </div>
          <button class="btn-add-trx-pill" style="border-color:#CBD5E1; color:#334155;" onclick="toggleTrxInput('bqr-trx-box')">Add Transaction ID</button>
        </div>

        <div class="trx-manual-input-box" id="bqr-trx-box" style="display:none; margin-top:0.65rem;">
          <input type="text" id="bqr-trx-val" class="trx-manual-field" style="border:1px solid #CBD5E1;" placeholder="Enter TrxID">
          <button class="trx-manual-submit-btn" style="background:#0047BA; color:#FFF;" onclick="submitManualTrx('Bangla QR', 'bqr-trx-val')">Verify</button>
        </div>
      </div>

      <div class="bqr-actions-row">
        <button class="btn-bqr-close" onclick="closeModal()">Close</button>
        <button class="btn-bqr-continue" onclick="confirmPayment('Bangla QR')">
          ${SVG_SPINNER} Auto verifying...
        </button>
      </div>

      <div class="bqr-footer-note">Payments are secured and verified automatically.</div>
    </div>
  `;

  backdrop.classList.add('active');
  startBqrCountdown();
}

let bqrTimerInterval = null;
function startBqrCountdown() {
  if (bqrTimerInterval) clearInterval(bqrTimerInterval);
  let sec = 599;
  bqrTimerInterval = setInterval(() => {
    const timerElem = document.getElementById('bqr-countdown');
    if (!timerElem) {
      clearInterval(bqrTimerInterval);
      return;
    }
    if (sec <= 0) {
      clearInterval(bqrTimerInterval);
      timerElem.textContent = '00:00';
      return;
    }
    sec--;
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    timerElem.textContent = `${m}:${s}`;
  }, 1000);
}

function openRocketStep1() {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="bk-modal-container">
      <div class="bk-modal-header">
        <img src="images/rocket.png" alt="Rocket" class="bk-logo-head">
      </div>

      <div class="bk-merchant-card">
        <div class="bk-merchant-left">
          <div class="rk-cart-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <div>
            <div class="bk-merchant-title">${PAYMENT_CONFIG.shopName}</div>
            <div class="bk-invoice-str">
              <span>Inv No: ${PAYMENT_CONFIG.invoiceNo}</span>
              <button style="background:none; border:none; color:#8E24AA; cursor:pointer;" onclick="copyValue('${PAYMENT_CONFIG.invoiceNo}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="bk-amount-right">৳${PAYMENT_CONFIG.amountBDT}</div>
      </div>

      <div class="rk-purple-body">
        <h3 class="bk-body-title">Your Rocket Account Number</h3>
        
        <input type="tel" id="rk-phone-input" class="bk-phone-input-field" placeholder="e.g 01XXXXXXXXX or 01XXXXXXXXXX" maxlength="12" oninput="handleRkPhoneInput(this)">
        
        <div class="bk-terms-text">
          Confirm and proceed, <u onclick="openDrawerInfo('info')">terms & conditions</u>
        </div>
      </div>

      <div class="bk-actions-footer">
        <button class="btn-bk-cancel" onclick="closeModal()">Cancel</button>
        <button class="btn-bk-confirm" id="rk-confirm-btn" disabled onclick="submitRocketStep1()">Confirm</button>
      </div>
    </div>
  `;

  backdrop.classList.add('active');
}

function handleRkPhoneInput(input) {
  const btn = document.getElementById('rk-confirm-btn');
  if (!btn) return;

  const val = input.value.trim();
  if (val.length >= 11) {
    btn.disabled = false;
    btn.classList.add('active');
  } else {
    btn.disabled = true;
    btn.classList.remove('active');
  }
}

function submitRocketStep1() {
  const input = document.getElementById('rk-phone-input');
  const val = input ? input.value.trim() : '';

  if (val.length < 11) {
    showToast('অনুগ্রহ করে সঠিক রকেট মোবাইল নম্বর দিন');
    return;
  }

  openRocketStep2(val);
}

function openRocketStep2(userPhone) {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="bk-modal-container">
      <div class="bk-modal-header">
        <img src="images/rocket.png" alt="Rocket" class="bk-logo-head">
      </div>

      <div class="bk-merchant-card">
        <div class="bk-merchant-left">
          <div class="rk-cart-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <div>
            <div class="bk-merchant-title">${PAYMENT_CONFIG.shopName}</div>
            <div class="bk-invoice-str">
              <span>Inv No: ${PAYMENT_CONFIG.invoiceNo}</span>
              <button style="background:none; border:none; color:#8E24AA; cursor:pointer;" onclick="copyValue('${PAYMENT_CONFIG.invoiceNo}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="bk-amount-right">৳${PAYMENT_CONFIG.amountBDT}</div>
      </div>

      <div class="rk-purple-body">
        <div class="bk-number-box">
          <div>
            <div class="bk-num-label">PERSONAL NUMBER</div>
            <div class="bk-num-val">${PAYMENT_CONFIG.rocketNumber}</div>
          </div>
          <button class="bk-copy-circle-btn" onclick="copyValue('${PAYMENT_CONFIG.rocketNumber}')" title="Copy Number">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>

        <div class="bk-step-row">
          <span class="bk-step-circle" style="color:#8E24AA;">1</span>
          <span>Open Rocket and choose the correct payment option.</span>
        </div>

        <div class="bk-step-row">
          <span class="bk-step-circle" style="color:#8E24AA;">2</span>
          <span>Personal Number: ${PAYMENT_CONFIG.rocketNumber}. Amount: ${PAYMENT_CONFIG.amountBDT} BDT.</span>
        </div>

        <img src="images/rocket_personal.png" alt="Rocket Send Money Guide" class="rk-guide-img">

        <div class="bk-step-row">
          <span class="bk-step-circle" style="color:#8E24AA;">3</span>
          <span>Complete the payment from your phone and keep this page open for automatic verification.</span>
        </div>

        <div class="bk-waiting-text">
          <span class="bk-white-dot-pulse"></span> Waiting for payment..
        </div>

        <div class="trx-toggle-row">
          <div class="bk-timer-row">
            Session expires in <span id="rk-countdown" style="font-family:monospace; font-weight:700;">10:00</span>
          </div>
          <button class="btn-add-trx-pill" onclick="toggleTrxInput('rk-trx-box')">Add Transaction ID</button>
        </div>

        <div class="trx-manual-input-box" id="rk-trx-box" style="display:none;">
          <input type="text" id="rk-trx-val" class="trx-manual-field" placeholder="Enter TrxID">
          <button class="trx-manual-submit-btn" onclick="submitManualTrx('Rocket', 'rk-trx-val')">Verify</button>
        </div>
      </div>

      <div class="bk-actions-footer">
        <button class="btn-bk-cancel" onclick="closeModal()">Cancel</button>
        <button class="btn-bk-confirm active" onclick="confirmPayment('Rocket')">
          ${SVG_SPINNER} Auto verifying...
        </button>
      </div>
    </div>
  `;

  backdrop.classList.add('active');
  startRkCountdown();
}

let rkTimerInterval = null;
function startRkCountdown() {
  if (rkTimerInterval) clearInterval(rkTimerInterval);
  let sec = 600;
  rkTimerInterval = setInterval(() => {
    const timerElem = document.getElementById('rk-countdown');
    if (!timerElem) {
      clearInterval(rkTimerInterval);
      return;
    }
    if (sec <= 0) {
      clearInterval(rkTimerInterval);
      timerElem.textContent = '00:00';
      return;
    }
    sec--;
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    timerElem.textContent = `${m}:${s}`;
  }, 1000);
}

function openNagadStep1() {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="ng-modal-container">
      <div class="ng-lang-switcher">
        <span>বাং</span> | <span>Eng</span>
      </div>

      <div class="ng-header-section">
        <svg class="ng-cart-icon" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.8">
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          <circle cx="9" cy="21" r="1.5" fill="#FFF"></circle>
          <circle cx="20" cy="21" r="1.5" fill="#FFF"></circle>
        </svg>
        <h3 class="ng-merchant-name">${PAYMENT_CONFIG.shopName}</h3>
        <div class="ng-invoice-str">Invoice No: ${PAYMENT_CONFIG.invoiceNo}</div>

        <div class="ng-amount-box">
          <div>
            <div class="ng-amount-label">TOTAL AMOUNT:</div>
            <div class="ng-amount-val">BDT ${PAYMENT_CONFIG.amountBDT}</div>
          </div>
          <button style="background:none; border:none; color:#FFF; cursor:pointer;" onclick="copyValue('${PAYMENT_CONFIG.amountBDT}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
        <div class="ng-charge-text">Charge: BDT ${PAYMENT_CONFIG.chargeBDT}</div>
      </div>

      <div>
        <h4 class="ng-body-title">Your Nagad Account Number</h4>
        <input type="tel" id="ng-phone-input" class="ng-phone-input-field" placeholder="01XXXXXXXXX" maxlength="11" oninput="handleNgPhoneInput(this)">
        <p class="ng-terms-subtext">By clicking/tapping "Proceed" you are agreeing to our <strong>Terms and Conditions</strong></p>
      </div>

      <div class="ng-actions-row">
        <button class="btn-ng-close" onclick="closeModal()">Close</button>
        <button class="btn-ng-proceed" id="ng-proceed-btn" disabled onclick="submitNagadStep1()">Proceed</button>
      </div>

      <div class="ng-footer-logo-wrap">
        <img src="images/nagad.png" alt="Nagad Logo" class="ng-footer-logo-img">
      </div>
    </div>
  `;

  backdrop.classList.add('active');
}

function handleNgPhoneInput(input) {
  const btn = document.getElementById('ng-proceed-btn');
  if (!btn) return;

  const val = input.value.trim();
  if (val.length >= 11) {
    btn.disabled = false;
    btn.classList.add('active');
  } else {
    btn.disabled = true;
    btn.classList.remove('active');
  }
}

function submitNagadStep1() {
  const input = document.getElementById('ng-phone-input');
  const val = input ? input.value.trim() : '';

  if (val.length < 11) {
    showToast('অনুগ্রহ করে ১১ ডিজিটের নগদ নম্বর দিন');
    return;
  }

  openNagadStep2(val);
}

function openNagadStep2(userPhone) {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="ng-modal-container">
      <div class="ng-lang-switcher">
        <span>বাং</span> | <span>Eng</span>
      </div>

      <div class="ng-header-section">
        <svg class="ng-cart-icon" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.8">
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          <circle cx="9" cy="21" r="1.5" fill="#FFF"></circle>
          <circle cx="20" cy="21" r="1.5" fill="#FFF"></circle>
        </svg>
        <h3 class="ng-merchant-name">${PAYMENT_CONFIG.shopName}</h3>
        <div class="ng-invoice-str">Invoice No: ${PAYMENT_CONFIG.invoiceNo}</div>

        <div class="ng-amount-box">
          <div>
            <div class="ng-amount-label">TOTAL AMOUNT:</div>
            <div class="ng-amount-val">BDT ${PAYMENT_CONFIG.amountBDT}</div>
          </div>
          <button style="background:none; border:none; color:#FFF; cursor:pointer;" onclick="copyValue('${PAYMENT_CONFIG.amountBDT}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
        <div class="ng-charge-text">Charge: BDT ${PAYMENT_CONFIG.chargeBDT}</div>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.85rem; margin-bottom:1.25rem;">
        <div class="bk-number-box" style="border-color:rgba(255,255,255,0.4);">
          <div>
            <div class="bk-num-label">PERSONAL NUMBER</div>
            <div class="bk-num-val">${PAYMENT_CONFIG.nagadNumber}</div>
          </div>
          <button class="bk-copy-circle-btn" onclick="copyValue('${PAYMENT_CONFIG.nagadNumber}')" title="Copy Number">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>

        <div class="bk-step-row">
          <span class="bk-step-circle" style="color:#8C1306;">1</span>
          <span>উপরের পার্সোনাল অ্যাকাউন্টের নম্বর কপি করুন</span>
        </div>

        <div class="bk-step-row">
          <span class="bk-step-circle" style="color:#8C1306;">2</span>
          <span>নগদ অ্যাপ এ যান তারপর 'সেন্ড মানি' নির্বাচন করুন</span>
        </div>

        <img src="images/nagad_personal.png" alt="Nagad Send Money Guide" class="ng-guide-img">

        <div class="bk-step-row">
          <span class="bk-step-circle" style="color:#8C1306;">3</span>
          <span>একাউন্ট নম্বর পেস্ট করুন এবং কাঙ্ক্ষিত এমাউন্ট সেন্ড মানি করুন। সেন্ড মানি সম্পন্ন করে এই পেজে অপেক্ষা করুন, পেজটি বন্ধ করবেন না।</span>
        </div>

        <div class="bk-waiting-text">
          <span class="bk-white-dot-pulse"></span> Waiting for payment...
        </div>

        <div class="trx-toggle-row">
          <div class="bk-timer-row">
            Session expires in <span id="ng-countdown" style="font-family:monospace; font-weight:700;">09:47</span>
          </div>
          <button class="btn-add-trx-pill" onclick="toggleTrxInput('ng-trx-box')">Add Transaction ID</button>
        </div>

        <div class="trx-manual-input-box" id="ng-trx-box" style="display:none;">
          <input type="text" id="ng-trx-val" class="trx-manual-field" placeholder="Enter TrxID">
          <button class="trx-manual-submit-btn" onclick="submitManualTrx('Nagad', 'ng-trx-val')">Verify</button>
        </div>
      </div>

      <div class="ng-actions-row">
        <button class="btn-ng-close" onclick="closeModal()">Close</button>
        <button class="btn-ng-proceed active" onclick="confirmPayment('Nagad')">
          ${SVG_SPINNER} Auto verifying...
        </button>
      </div>

      <div class="ng-footer-logo-wrap">
        <img src="images/nagad.png" alt="Nagad Logo" class="ng-footer-logo-img">
      </div>
    </div>
  `;

  backdrop.classList.add('active');
  startNgCountdown();
}

let ngTimerInterval = null;
function startNgCountdown() {
  if (ngTimerInterval) clearInterval(ngTimerInterval);
  let sec = 587;
  ngTimerInterval = setInterval(() => {
    const timerElem = document.getElementById('ng-countdown');
    if (!timerElem) {
      clearInterval(ngTimerInterval);
      return;
    }
    if (sec <= 0) {
      clearInterval(ngTimerInterval);
      timerElem.textContent = '00:00';
      return;
    }
    sec--;
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    timerElem.textContent = `${m}:${s}`;
  }, 1000);
}

function openBkashStep1() {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="bk-modal-container">
      <div class="bk-modal-header">
        <img src="images/bkash.png" alt="bKash" class="bk-logo-head">
      </div>

      <div class="bk-merchant-card">
        <div class="bk-merchant-left">
          <div class="bk-cart-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <div>
            <div class="bk-merchant-title">${PAYMENT_CONFIG.shopName}</div>
            <div class="bk-invoice-str">
              <span>Inv No: ${PAYMENT_CONFIG.invoiceNo}</span>
              <button style="background:none; border:none; color:#E91E63; cursor:pointer;" onclick="copyValue('${PAYMENT_CONFIG.invoiceNo}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="bk-amount-right">৳${PAYMENT_CONFIG.amountBDT}</div>
      </div>

      <div class="bk-pink-body">
        <h3 class="bk-body-title">Your bKash Account Number</h3>
        
        <input type="tel" id="bk-phone-input" class="bk-phone-input-field" placeholder="e.g 01XXXXXXXXX" maxlength="11" oninput="handleBkPhoneInput(this)">
        
        <div class="bk-terms-text">
          Confirm and proceed, <u onclick="openDrawerInfo('info')">terms & conditions</u>
        </div>
      </div>

      <div class="bk-actions-footer">
        <button class="btn-bk-cancel" onclick="closeModal()">Cancel</button>
        <button class="btn-bk-confirm" id="bk-confirm-btn" disabled onclick="submitBkashStep1()">Confirm</button>
      </div>
    </div>
  `;

  backdrop.classList.add('active');
}

function handleBkPhoneInput(input) {
  const btn = document.getElementById('bk-confirm-btn');
  if (!btn) return;

  const val = input.value.trim();
  if (val.length >= 11) {
    btn.disabled = false;
    btn.classList.add('active');
  } else {
    btn.disabled = true;
    btn.classList.remove('active');
  }
}

function submitBkashStep1() {
  const input = document.getElementById('bk-phone-input');
  const val = input ? input.value.trim() : '';

  if (val.length < 11) {
    showToast('অনুগ্রহ করে ১১ ডিজিটের বিকাশ নম্বর দিন');
    return;
  }

  openBkashStep2(val);
}

function openBkashStep2(userPhone) {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  container.innerHTML = `
    <div class="bk-modal-container">
      <div class="bk-modal-header">
        <img src="images/bkash.png" alt="bKash" class="bk-logo-head">
      </div>

      <div class="bk-merchant-card">
        <div class="bk-merchant-left">
          <div class="bk-cart-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <div>
            <div class="bk-merchant-title">${PAYMENT_CONFIG.shopName}</div>
            <div class="bk-invoice-str">
              <span>Inv No: ${PAYMENT_CONFIG.invoiceNo}</span>
              <button style="background:none; border:none; color:#E91E63; cursor:pointer;" onclick="copyValue('${PAYMENT_CONFIG.invoiceNo}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="bk-amount-right">৳${PAYMENT_CONFIG.amountBDT}</div>
      </div>

      <div class="bk-pink-body">
        <div class="bk-number-box">
          <div>
            <div class="bk-num-label">PERSONAL NUMBER</div>
            <div class="bk-num-val">${PAYMENT_CONFIG.bkashNumber}</div>
          </div>
          <button class="bk-copy-circle-btn" onclick="copyValue('${PAYMENT_CONFIG.bkashNumber}')" title="Copy Number">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>

        <div class="bk-step-row">
          <span class="bk-step-circle">1</span>
          <span>উপরের পার্সোনাল অ্যাকাউন্টের নম্বর কপি করুন</span>
        </div>

        <div class="bk-step-row">
          <span class="bk-step-circle">2</span>
          <span>বিকাশ অ্যাপ এ যান তারপর 'সেন্ড মানি' নির্বাচন করুন</span>
        </div>

        <img src="images/bkash_personal.png" alt="bKash Send Money Guide" class="bk-guide-img">

        <div class="bk-step-row">
          <span class="bk-step-circle">3</span>
          <span>একাউন্ট নম্বর পেস্ট করুন এবং কাঙ্ক্ষিত এমাউন্ট সেন্ড মানি করুন। সেন্ড মানি সম্পন্ন করে এই পেজে অপেক্ষা করুন, পেজটি বন্ধ করবেন না।</span>
        </div>

        <div class="bk-waiting-text">
          <span class="bk-white-dot-pulse"></span> Waiting for payment...
        </div>

        <div class="trx-toggle-row">
          <div class="bk-timer-row">
            Session expires in <span id="bk-countdown" style="font-family:monospace; font-weight:700;">09:59</span>
          </div>
          <button class="btn-add-trx-pill" onclick="toggleTrxInput('bk-trx-box')">Add Transaction ID</button>
        </div>

        <div class="trx-manual-input-box" id="bk-trx-box" style="display:none;">
          <input type="text" id="bk-trx-val" class="trx-manual-field" placeholder="Enter TrxID">
          <button class="trx-manual-submit-btn" onclick="submitManualTrx('bKash', 'bk-trx-val')">Verify</button>
        </div>
      </div>

      <div class="bk-actions-footer">
        <button class="btn-bk-cancel" onclick="closeModal()">Cancel</button>
        <button class="btn-bk-confirm active" onclick="confirmPayment('bKash')">
          ${SVG_SPINNER} Auto verifying...
        </button>
      </div>
    </div>
  `;

  backdrop.classList.add('active');
  startBkCountdown();
}

let bkTimerInterval = null;
function startBkCountdown() {
  if (bkTimerInterval) clearInterval(bkTimerInterval);
  let sec = 599;
  bkTimerInterval = setInterval(() => {
    const timerElem = document.getElementById('bk-countdown');
    if (!timerElem) {
      clearInterval(bkTimerInterval);
      return;
    }
    if (sec <= 0) {
      clearInterval(bkTimerInterval);
      timerElem.textContent = '00:00';
      return;
    }
    sec--;
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    timerElem.textContent = `${m}:${s}`;
  }, 1000);
}

function openDrawerInfo(type) {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('modal-body');

  let title = '';
  let content = '';

  if (type === 'support') {
    title = '🎧 সাপোর্ট (Support)';
    content = `
      <p style="font-size:0.9rem; color:#475569; margin-bottom:1rem;">পেমেন্ট সংক্রান্ত যেকোনো সমস্যায় আমাদের হেল্পলাইনে যোগাযোগ করুন:</p>
      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        <a href="tel:${PAYMENT_CONFIG.helplinePhone}" style="padding:0.85rem; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; text-decoration:none; color:#0F172A; font-weight:600; display:flex; align-items:center; gap:0.5rem;">
          📞 Helpline: ${PAYMENT_CONFIG.helplinePhone}
        </a>
        <a href="${PAYMENT_CONFIG.whatsappUrl}" target="_blank" style="padding:0.85rem; background:#F0FDF4; border:1px solid #BBF7D0; border-radius:10px; text-decoration:none; color:#166534; font-weight:600; display:flex; align-items:center; gap:0.5rem;">
          💬 WhatsApp Live Support
        </a>
      </div>
    `;
  } else if (type === 'info') {
    title = 'ℹ️ তথ্যাদি (Terms & Info)';
    content = `
      <div style="font-size:0.875rem; color:#475569; line-height:1.6;">
        <p style="margin-bottom:0.5rem;">• <strong>Payment Session:</strong> ১০ মিনিটের মধ্যে ট্রানজেকশন সম্পন্ন করুন।</p>
        <p style="margin-bottom:0.5rem;">• <strong>Verification:</strong> সঠিক TrxID সাবমিট করার সাথে সাথেই অটো ভেরিফাই হবে।</p>
        <p>• <strong>Security:</strong> আপনার পেমেন্ট তথ্য ২৫৬-বিট এনক্রিপশনের মাধ্যমে সম্পূর্ণ সুরক্ষিত।</p>
      </div>
    `;
  } else if (type === 'details') {
    title = '≡ বিস্তারিত (Order Details)';
    content = `
      <div style="font-size:0.875rem; color:#334155; line-height:1.7;">
        <div style="display:flex; justify-content:space-between;"><span>Merchant:</span><strong>${PAYMENT_CONFIG.shopName}</strong></div>
        <div style="display:flex; justify-content:space-between;"><span>Invoice No:</span><span style="font-family:monospace;">${PAYMENT_CONFIG.invoiceNo}</span></div>
        <div style="display:flex; justify-content:space-between;"><span>Product:</span><span>Premium Service Package</span></div>
        <hr style="margin:0.75rem 0; border:none; border-top:1px dashed #CBD5E1;">
        <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1rem; color:#0047BA;"><span>Total Payable:</span><span>৳${PAYMENT_CONFIG.amountBDT} BDT</span></div>
      </div>
    `;
  } else if (type === 'note') {
    title = '📄 পেমেন্ট নোট (Notes)';
    content = `
      <p style="font-size:0.875rem; color:#475569;">অনুগ্রহ করে সেন্ড মানি করার পর রেফারেন্স এ আপনার ইনভয়েস নম্বর অথবা ফোন নম্বর উল্লেখ করুন।</p>
    `;
  } else if (type === 'chat') {
    title = '💬 ইনস্ট্যান্ট চ্যাট (Live Chat)';
    content = `
      <p style="font-size:0.875rem; color:#475569; margin-bottom:1rem;">আমাদের প্রতিনিধি অনলাইনে আছেন। যেকোনো প্রয়োজনে চ্যাট শুরু করুন।</p>
      <button class="btn-action-submit" onclick="showToast('Live chat starting...')">Start Chat</button>
    `;
  }

  container.innerHTML = `
    <div style="padding:1.25rem;">
      <div class="flow-head">
        <div class="flow-title-text">${title}</div>
        <button class="close-x" onclick="closeModal()">&times;</button>
      </div>
      <div style="padding-top:0.5rem;">${content}</div>
    </div>
  `;
  backdrop.classList.add('active');
}

function closeModal() {
  const backdrop = document.getElementById('modal-backdrop');
  if (backdrop) backdrop.classList.remove('active');
}

function copyValue(val) {
  navigator.clipboard.writeText(val).then(() => {
    showToast(`Copied "${val}" to clipboard!`);
  });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function confirmPayment(name) {
  const container = document.getElementById('modal-body');
  container.innerHTML = `
    <div style="padding:1.25rem;">
      <div class="flow-head" style="border-bottom:none;">
        <div class="flow-title-text" style="color:#059669;">✔ পেমেন্ট সফল হয়েছে!</div>
        <button class="close-x" onclick="closeModal()">&times;</button>
      </div>
      <div style="text-align:center; padding:1rem 0;">
        <div style="width:56px; height:56px; background:#D1FAE5; color:#059669; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; margin-bottom:1rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h4 style="font-size:1.1rem; font-weight:700; color:#0F172A; margin-bottom:0.5rem;">আপনার ৳${PAYMENT_CONFIG.amountBDT} BDT পেমেন্ট গৃহীত হয়েছে</h4>
        <p style="font-size:0.85rem; color:#64748B; margin-bottom:1.25rem;">Merchant: <strong>${PAYMENT_CONFIG.shopName}</strong> | Method: <strong style="color:#059669;">${name}</strong></p>
        <button class="btn-action-submit" style="background:#059669;" onclick="closeModal()">সম্পন্ন (Done)</button>
      </div>
    </div>
  `;
}
