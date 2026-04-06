// Magic 8 Ball Game Logic - Korean Version
const answers = {
    classic: [
        "네, 확실합니다.", "가능성이 매우 높습니다.", "의심할 여지가 없습니다.", "네, 분명히 그렇습니다.", "믿고 진행하셔도 좋습니다.",
        "제가 보기엔 그렇습니다.", "아마도 잘 될 것입니다.", "분위기가 좋습니다.", "네.", "징조가 좋습니다.",
        "지금은 판단하기 어렵습니다.", "나중에 다시 물어보세요.", "지금은 말씀드리지 않는 게 좋겠네요.", "현재로서는 예측할 수 없습니다.", "마음을 가다듬고 다시 물어보세요.",
        "너무 기대하지 마세요.", "제 대답은 '아니오'입니다.", "부정적인 결과가 예상됩니다.", "전망이 그리 좋지 않습니다.", "매우 희박합니다."
    ],
    silly: [
        "유니콘이 실존할 확률만큼 확실합니다!", "수정구슬이 '좋아!'라고 외치고 있어요!", "당연히... 아니오!", "별들이 아마도라고 말하는 것 같네요.", "커피 한 잔 마시고 다시 오세요.",
        "마법의 햄스터가 '네'라고 합니다.", "한 발로 세 번 뛸 수 있다면요.", "오늘 8볼은 휴가 중입니다.", "대답은 아마 침대 밑에 있을 거예요.", "화요일이라면 '네'입니다.",
        "그건 신선도 제로의 질문이네요.", "우주가 한 번 더 물어보라고 합니다.", "강력한 '아니오'입니다.", "네, 토핑까지 얹어서요!", "너무 웃겨서 대답을 못 하겠어요.",
        "바람에게 물어보세요.", "집에 있는 강아지한테 물어보는 게 빠를걸요.", "마법은 '예스', 이성은 '노'.", "내일 해가 서쪽에서 뜬다면요.", "정답은 42입니다. 언제나 42죠."
    ],
    sarcastic: [
        "네, 그럼요. 제가 왕이라면 말이죠.", "수정구슬 좀 볼게요... '어딜 봐서?'라고 하네요.", "네네, 산타할아버지도 실존하죠.", "그걸 지금 진심으로 물어보시는 건가요?", "네라고 하고 싶지만 양심이 허락지 않네요.",
        "어떤 평행우주에서 온 질문인가요?", "그 질문, 정말 용기 가상하네요.", "방금 질문은 못 들은 걸로 할게요.", "음... 역시 아니오.", "로또 두 번 연속 당첨될 확률보다 낮네요.",
        "대답하기 전에 한숨 한 번만 쉬어도 될까요?", "그걸 꼭 대답해줘야 아나요?", "너무 어이가 없어서 말이 안 나오네요.", "유감스럽게도 없습니다.", "돼지가 하늘을 날면 가능할지도요.",
        "제 전 재산을 걸고 '아니오'입니다.", "참 재미있네요. 다음 질문 주세요.", "지금 그걸 진심으로?", "커피라도 마시고 제정신으로 다시 오세요.", "답이 너무 뻔해서 말 안 할래요."
    ],
    romance: [
        "사랑의 기운이 느껴집니다.", "당신의 마음은 이미 답을 알고 있어요.", "큐피드의 화살이 당신을 향하고 있네요.", "연애운이 상승하고 있습니다.", "사랑은 반드시 길을 찾을 거예요.",
        "망설이고 있다면 조금 더 용기를 내보세요.", "이번에는 마음이 시키는 대로 해도 좋습니다.", "사랑은 기다림. 서두르지 마세요.", "진심이 닿을 곳으로 가세요.", "설렘이 아주 가까이 와 있네요.",
        "두 사람 사이에 묘한 기류가 흐릅니다.", "이제 한 걸음 더 나아갈 때입니다.", "사랑은 함께 써 내려가는 이야기입니다.", "전망이 매우 핑크빛입니다.", "자연스러운 흐름을 믿어보세요.",
        "사랑에는 때때로 시간이 더 필요합니다.", "좋은 인연일수록 천천히 자라납니다.", "당신의 직감을 믿으세요.", "사랑은 생각지 못한 순간에 찾아옵니다.", "이 인연, 꽤 기대해 봐도 좋겠네요."
    ],
    drinking: [
        "오른쪽 사람 한 잔!", "시원하게 원샷!", "다 같이 건배!", "당신이 주인공입니다! 한 잔!", "두 모금 마십니다!",
        "모두 다 같이 마셔요!", "이번엔 패스! 운이 좋네요.", "누구든 한 명 지목해서 마시게 하기!", "안 마셔도 됩니다!", "옆 사람이랑 러브샷!",
        "가끔은 물도 마셔주세요.", "가장 늦게 손든 사람 마시기!", "개인기 보여주거나 한 잔 마시기!", "안주 먹고 한 잔 더!", "왼쪽 사람이랑 가위바위보, 지는 사람 마시기!",
        "안경 쓴 사람 마시기!", "오늘 입은 옷 색깔이 검은색인 사람 마시기!", "지난 10분 동안 폰 본 사람 마시기!", "가장 키 큰 사람 마시기!", "오늘 가장 늦게 온 사람 마시기!"
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    const magicBall = document.querySelector('.magic-ball');
    const answerElement = document.getElementById('answer');
    const questionInput = document.getElementById('question');
    const shakeButton = document.getElementById('shake-button');
    const versionSelect = document.getElementById('version');
    const historyList = document.getElementById('history-list');

    const customizeButton = document.createElement('button');
    customizeButton.className = 'btn btn-outline-primary mt-3 d-block w-100 rounded-pill';
    customizeButton.innerHTML = '<i class="fas fa-magic"></i> 답변 커스터마이징';
    shakeButton.parentNode.insertBefore(customizeButton, shakeButton.nextSibling);

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal fade';
    modalContainer.id = 'customAnswersModal';
    modalContainer.setAttribute('tabindex', '-1');
    modalContainer.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg rounded-4">
                <div class="modal-header bg-primary text-white border-0 rounded-top-4">
                    <h5 class="modal-title fw-bold">답변 커스터마이징</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="alert alert-info border-0 rounded-3 mb-4">
                        우리들만의 특별한 답변을 추가해 보세요! 자동으로 저장됩니다.
                    </div>
                    <div class="input-group mb-4">
                        <input type="text" class="form-control rounded-pill-start ps-3" id="customAnswer" 
                            placeholder="답변을 입력하세요..."
                            maxlength="100">
                        <button class="btn btn-primary rounded-pill-end px-3" id="addCustomAnswer">
                            <i class="fas fa-plus"></i> 추가
                        </button>
                    </div>
                    <div class="custom-answers-wrapper">
                        <ul class="list-group list-group-flush border rounded-3 overflow-hidden" id="customAnswersList"></ul>
                        <div class="text-center mt-3" id="emptyState">
                            <p class="text-muted small">입력된 커스텀 답변이 없습니다.</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light border-0 rounded-bottom-4 p-4">
                    <div class="w-100">
                        <div class="d-flex justify-content-center mb-3">
                            <span class="badge bg-primary fs-6 px-3 py-2 rounded-pill" id="customAnswerCount">0 개의 답변</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-link text-danger text-decoration-none p-0" id="clearCustomAnswers">전체 삭제</button>
                            <button type="button" class="btn btn-success px-4 rounded-pill fw-bold" id="saveCustomAnswers">저장 완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalContainer);

    const modal = new bootstrap.Modal(modalContainer);
    customizeButton.addEventListener('click', () => modal.show());

    let customAnswers = JSON.parse(localStorage.getItem('customAnswers_ko')) || [];
    answers.custom = customAnswers;

    function updateCustomAnswersList() {
        const list = document.getElementById('customAnswersList');
        const emptyState = document.getElementById('emptyState');
        const countBadge = document.getElementById('customAnswerCount');
        if (!list) return;
        list.innerHTML = '';
        countBadge.textContent = `${customAnswers.length} 개의 답변`;

        if (customAnswers.length === 0) {
            emptyState.style.display = 'block';
            list.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            list.style.display = 'block';
            customAnswers.forEach((answer, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center border-bottom';
                li.innerHTML = `
                    <span class="answer-text small">${answer}</span>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-link link-primary p-1 edit-answer" data-index="${index}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-link link-danger p-1 delete-answer" data-index="${index}"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                list.appendChild(li);
            });
        }
        answers.custom = customAnswers;
        localStorage.setItem('customAnswers_ko', JSON.stringify(customAnswers));

        document.querySelectorAll('.delete-answer').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                customAnswers.splice(index, 1);
                updateCustomAnswersList();
            });
        });

        document.querySelectorAll('.edit-answer').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                const answerTextSpan = this.closest('li').querySelector('.answer-text');
                const originalText = answerTextSpan.textContent;
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control form-control-sm';
                input.value = originalText;
                answerTextSpan.replaceWith(input);
                input.focus();
                
                const saveEdit = () => {
                    const newText = input.value.trim();
                    if (newText && newText !== originalText) {
                        customAnswers[index] = newText;
                        updateCustomAnswersList();
                    } else { input.replaceWith(answerTextSpan); }
                };
                
                input.addEventListener('blur', saveEdit);
                input.addEventListener('keypress', e => { if (e.key === 'Enter') saveEdit(); });
            });
        });
    }

    function addCustomAnswer() {
        const input = document.getElementById('customAnswer');
        const answer = input.value.trim();
        if (answer && !customAnswers.includes(answer)) {
            customAnswers.unshift(answer);
            updateCustomAnswersList();
            input.value = '';
        }
    }

    const addButton = document.getElementById('addCustomAnswer');
    const inputField = document.getElementById('customAnswer');
    const clearButton = document.getElementById('clearCustomAnswers');

    if (addButton) addButton.addEventListener('click', addCustomAnswer);
    if (inputField) inputField.addEventListener('keypress', e => { if (e.key === 'Enter') addCustomAnswer(); });
    if (clearButton) clearButton.addEventListener('click', () => {
        if (confirm('모든 커스텀 답변을 삭제하시겠습니까?')) {
            customAnswers = [];
            updateCustomAnswersList();
        }
    });

    document.getElementById('saveCustomAnswers').addEventListener('click', () => {
        if (customAnswers.length > 0) {
            versionSelect.value = 'custom';
            modal.hide();
        } else { alert('최소 한 개의 답변을 추가해 주세요.'); }
    });

    updateCustomAnswersList();

    const handleShake = () => {
        if (magicBall.classList.contains('shake')) return;
        const question = questionInput.value.trim();
        magicBall.classList.add('shake');
        const answerList = answers[versionSelect.value];
        const answer = answerList[Math.floor(Math.random() * answerList.length)] || '...';

        setTimeout(() => { answerElement.textContent = answer; }, 500);
        setTimeout(() => {
            magicBall.classList.remove('shake');
            if (question) {
                const li = document.createElement('li');
                li.className = 'list-group-item bg-transparent border-0 border-bottom d-flex justify-content-between align-items-center py-3';
                li.innerHTML = `<span class="small text-muted">${question}</span><span class="badge bg-primary rounded-pill px-3">${answer}</span>`;
                historyList.insertBefore(li, historyList.firstChild);
                if (historyList.children.length > 10) historyList.removeChild(historyList.lastChild);
            }
        }, 1000);
    };

    shakeButton.addEventListener('click', handleShake);
    magicBall.addEventListener('click', handleShake);
    questionInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleShake(); });
});
