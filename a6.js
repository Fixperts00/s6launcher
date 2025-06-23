const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");
const tabImageCounts = [5, 21]; // 첫 번째 탭: 5개, 두 번째 탭: 21개
let currentTabIndex = 0; // 현재 활성화된 탭 인덱스

// 단계별 안내 텍스트 정의
const stepDescriptions = {
  0: [ // 안드로이드 버전 확인
    "1. 화면 오른쪽 아래의 앱스를 터치합니다.",
    "2. 설정 앱을 실행합니다.",
    "3. 메뉴를 아래로 끝까지 내린 후 디바이스 정보(태블릿 정보)를 선택합니다.",
    "4. 소프트웨어 정보를 선택합니다.",
    "5. 안드로이드 버전을 확인합니다. <span style='color: #dc3545; font-weight: bold;'>안드로이드 버전이 6.0.1 버전이 아닐 경우</span>, 담당 선생님이나 밀크T 고객센터로 연락 부탁드립니다."
  ],
  1: [ // 런처 설치 (21개)
    "1. 화면 오른쪽 아래의 앱스를 터치합니다.",
    "2. 오른쪽 위의 검색을 터치합니다.",
    "3. Chrome 앱을 검색하여 실행합니다.",
    "4. 주소창에 <strong>url.kr/5zqumj</strong>을 입력하여 밀크T런처 파일을 다운로드합니다.",
    "5. 크롬 앱을 닫고 메인 화면으로 이동하여 내 파일 앱을 실행합니다.",
    "6. 내 파일 앱에서 밀크T 런처 apk 파일을 터치합니다.",
    "7. 설치가 차단되었다는 알림창이 뜬다면 '설정'을 터치합니다.",
    "8. 출처를 알 수 없는 앱의 버튼을 터치하여 활성화합니다.",
    "9. '허용'을 터치합니다.",
    "10. '설치'를 터치하여 밀크T 홈을 설치합니다.",
    "11. 밀크T 홈 설치가 완료되면 '열기'를 터치합니다.",
    "12. 아래의 권한을 허용하는 디바이스 관리자를 실행합니다.",
    "13. '허용'을 눌러 밀크T 홈의 파일 액세스 권한을 허용합니다.",
    "14. '허용'을 눌러 밀크T 홈의 위치 액세스 권한을 허용합니다.",
    "15. 가입한 서비스를 선택한 후 '다음'을 터치합니다.",
    "16. 와이파이 연결 확인, 배터리 상태 확인이 완료되면 '다음'을 터치합니다.",
    "17. 개인정보 수집, 이용동의서의 약관동의를 체크 후 확인을 터치합니다.",
    "18. 태블릿 시리얼 인증이 완료된 후 '다음'을 터치합니다.",
    "19. '설치 준비중'이 '설치하기'로 변경되면 터치합니다.",
    "20. 아래의 권한을 허용하는 디바이스 관리자를 실행합니다.",
    "21. 학습에 필요한 콘텐츠를 설치하는데는 상황에 따라 20분~50분 가량 소요됩니다. 콘텐츠 설치가 완료되면 '시작하기'를 터치하여 학습 이용 가능합니다."
  ]
};

// 이미지 아래 추가 설명 (특정 단계만)
const additionalNotes = {
  1: { // 런처 설치
    3: "주소를 입력하면 별도 페이지 이동 없이 파일이 다운로드됩니다. 다운로드시 크롬에서 권한 허용을 요청하는 창이 노출될 수 있습니다. <span style='color: #dc3545; font-weight: bold;'>정상적인 동작이니 '권한 업데이트'나 '허용', '계속'등을 눌러 진행해주세요.</span>",
    6: "'취소'와 '설정'이 보이지 않고 '확인'만 노출될 경우, 패밀리링크 앱에 의해 설치가 차단된 상황입니다. 학부모님의 휴대폰 앱에서 감독중지를 요청하여 학습생을 감독 대상에서 제외시켜 주세요. 이후 내 파일 앱에서 밀크T 런처 apk 파일을 터치하면 설치 진행 가능합니다.<br><span style='color: #dc3545; font-weight: bold; background-color: #fff3cd; padding: 2px 4px; border-radius: 3px; vertical-align: middle;'><span style='vertical-align: middle;'>*</span>패밀리링크의 감독 중지 방법은 밀크T에서 안내가 어렵습니다. 만약 감독 중지 진행이 어려우신 경우 구글 측으로 문의해주시기를 부탁드립니다.</span>",
    11: "밀크T 학습을 위한 필수 권한을 허용하는 것으로, 임의로 학습 데이터를 삭제하거나 기기 설정을 변경하는 것은 아닙니다.",
    14: "학습생의 실제 학년에 맞는 서비스를 선택해주세요.(예를 들어, 학습생이 6학년이라면 밀크T 초등 선택)",
    15: "'다음'이 보이지 않을 경우 와이파이 연결이 되지 않았거나 배터리가 30% 미만인 상황입니다. 충전기를 연결하면 배터리 30%가 되지 않더라도 '다음'버튼이 활성화됩니다.",
    17: "인증이 너무 오래 걸리거나 실패했다고 나온다면 와이파이 공유기 재부팅을 부탁드립니다.",
    19: "밀크T 학습을 위한 필수 권한을 허용하는 것으로, 임의로 학습 데이터를 삭제하거나 기기 설정을 변경하는 것은 아닙니다.",
    20: "밀크T와 함께해주셔서 감사합니다. 만약 설치 진행이 어려우시거나 정상적으로 설치가 되지 않는 경우에는, <span style='color: #dc3545; font-weight: bold;'> 담당 선생님이나 밀크T 고객센터로 연락 부탁드립니다.</span>"
  }
};

// 이미지 로딩 상태 표시 함수
function showImageLoadingState(imgElement) {
  // 로딩 중 상태 표시
  imgElement.style.opacity = '0.7';
  imgElement.style.transition = 'opacity 0.3s ease';
  
  // 이미지 로드 완료시 원래 상태로 복원
  imgElement.onload = () => {
    imgElement.style.opacity = '1';
  };
  
  // 이미지 로드 실패시 처리
  imgElement.onerror = () => {
    imgElement.style.opacity = '0.5';
    imgElement.alt = '이미지를 불러올 수 없습니다';
  };
}

// 페이지 로드 시 초기 설정
window.addEventListener('load', function() {
  generateScrollImages();
  updateNavigation();
  setupBackButtonHandler();
});

// 뒤로가기 버튼 핸들러 설정
function setupBackButtonHandler() {
  // 히스토리 상태 추가 (현재 탭 정보 저장)
  history.replaceState({ tab: currentTabIndex }, '', '');
  
  // popstate 이벤트 리스너 추가
  window.addEventListener('popstate', function(event) {
    if (currentTabIndex === 1) {
      // 런처 설치 탭에서 뒤로가기를 누르면 안드로이드 버전 확인 탭으로 이동
      event.preventDefault();
      showTab(0);
      // 히스토리에 현재 상태 추가
      history.pushState({ tab: 0 }, '', '');
    } else {
      // 안드로이드 버전 확인 탭에서 뒤로가기를 누르면 기종 선택 페이지로 이동
      location.href = 'tab.html';
    }
  });
}

function generateScrollImages() {
  for (let tabIndex = 0; tabIndex < 2; tabIndex++) {
    const container = document.getElementById(`scrollImages${tabIndex}`);
    container.innerHTML = '';
    const totalImages = tabImageCounts[tabIndex];
    
    for (let i = 1; i <= totalImages; i++) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'image-wrapper';
      
      // 단계 설명 텍스트 추가
      const stepText = document.createElement('div');
      stepText.className = 'step-text';
      stepText.innerHTML = stepDescriptions[tabIndex][i - 1] || `단계 ${i} 설명`;
      
      const img = document.createElement('img');
      img.src = getImageSrc('a6', tabIndex, i);
      img.alt = `단계 ${i}`;
      img.onclick = () => openModal('a6', tabIndex, i);
      img.className = 'scroll-image';
      
      // Lazy loading 속성 추가 (최신 브라우저 지원)
      img.loading = 'lazy';
      
      // 이미지 로딩 상태 표시
      showImageLoadingState(img);
      
      imageWrapper.appendChild(stepText);
      imageWrapper.appendChild(img);
      
      // 추가 설명이 있는 경우 이미지 아래에 추가
      if (additionalNotes[tabIndex] && additionalNotes[tabIndex][i - 1]) {
        const additionalNote = document.createElement('div');
        additionalNote.className = 'additional-note';
        additionalNote.innerHTML = additionalNotes[tabIndex][i - 1];
        imageWrapper.appendChild(additionalNote);
      }
      
      container.appendChild(imageWrapper);
    }
  }
}

function showTab(index) {
  currentTabIndex = index; // 현재 탭 인덱스 업데이트
  
  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    contents[i].classList.toggle("active", i === index);
  });
  
  // 네비게이션 업데이트
  updateNavigation();
  
  // 히스토리 상태 업데이트
  if (index === 1) {
    // 런처 설치 탭으로 이동할 때 히스토리에 상태 추가
    history.pushState({ tab: 1 }, '', '');
  }
}

function updateNavigation() {
  const backBtn = document.getElementById('backBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (currentTabIndex === 0) {
    // 1. 안드로이드 버전 확인 탭
    backBtn.textContent = '← 기종 선택으로';
    nextBtn.textContent = '다음 단계로 →';
    nextBtn.style.display = 'block';
  } else {
    // 2. 런처 설치 탭
    backBtn.textContent = '← 이전 단계로';
    nextBtn.style.display = 'none';
  }
}

function handleBackClick() {
  if (currentTabIndex === 0) {
    // 1번 탭에서: 기종 선택 페이지로 이동
    location.href = 'tab.html';
  } else {
    // 2번 탭에서: 1번 탭으로 이동
    showTab(0);
  }
}

function handleNextClick() {
  if (currentTabIndex === 0) {
    // 1번 탭에서: 2번 탭으로 이동
    showTab(1);
  }
  // 2번 탭에서는 다음 버튼이 없으므로 이 함수가 호출되지 않음
}

// 모달 관련 변수
let modalDevice = 'a6';
let modalTabIndex = 0;
let modalSlideIndex = 1;

// 모달 함수들
function openModal(device, tabIndex, slideIndex) {
  modalDevice = device;
  modalTabIndex = tabIndex;
  modalSlideIndex = slideIndex;
  
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  
  // 모달 이미지 설정
  modalImage.src = getImageSrc(device, tabIndex, slideIndex);
  
  // 모달 표시
  modal.style.display = "block";
  
  // body 스크롤 방지 강화
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
  
  // body 스크롤 복원
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

function navigateModal(direction) {
  const maxSlides = tabImageCounts[modalTabIndex];
  modalSlideIndex += direction;
  
  // 모달에서도 순환 기능 적용
  if (modalSlideIndex < 1) {
    modalSlideIndex = maxSlides;
  }
  if (modalSlideIndex > maxSlides) {
    modalSlideIndex = 1;
  }
  
  const modalImage = document.getElementById("modalImage");
  modalImage.src = getImageSrc(modalDevice, modalTabIndex, modalSlideIndex);
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// 모달 배경 클릭 시 닫기
document.getElementById("imageModal").addEventListener('click', function(event) {
  if (event.target === this) {
    closeModal();
  }
});

function getImageSrc(device, tabIndex, slideIndex) {
  if (device === 'a6' && tabIndex === 0) {
    // A6 안드로이드 버전 확인 (5장)
    if (slideIndex === 3) {
      // 3번 이미지는 a6and 레포의 새로운 이미지로 교체
      return 'https://raw.githubusercontent.com/skyhigh79/a6and/main/a6_android_check_03.png';
    } else {
      // 나머지는 기존 a6os 레포 이미지 사용
      const paddedIndex = slideIndex.toString().padStart(2, '0');
      return `https://raw.githubusercontent.com/skyhigh79/a6os/main/a6_android_check_${paddedIndex}.png`;
    }
  } else if (device === 'a6' && tabIndex === 1) {
    // A6 런처 설치 (21장)
    if (slideIndex === 5) {
      // 5번 이미지는 adimage 레포 사용
      return 'https://raw.githubusercontent.com/skyhigh79/adimage/main/a6_launcher_install_05.png';
    } else {
      // 나머지는 a6 레포 이미지 사용
      const paddedIndex = slideIndex.toString().padStart(2, '0');
      return `https://raw.githubusercontent.com/skyhigh79/a6/main/a6_launcher_install_${paddedIndex}.png`;
    }
  }
  
  // 기본값 (테스트용 이미지)
  return `https://raw.githubusercontent.com/skyhigh79/aa/main/ex.png`;
}

// 맨 위로 버튼 기능
const scrollToTopBtn = document.getElementById('scrollToTop');

// 스크롤 이벤트 리스너
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

// 맨 위로 스크롤 함수
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}