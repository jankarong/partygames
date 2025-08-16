document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const magicBall = document.querySelector('.magic-ball');
    const answerElement = document.getElementById('answer');
    const questionInput = document.getElementById('question');
    const shakeButton = document.getElementById('shake-button');
    const versionSelect = document.getElementById('version');
    const historyList = document.getElementById('history-list');

    // Create customize button
    const customizeButton = document.createElement('button');
    customizeButton.className = 'btn btn-outline-primary mt-3 d-block w-100';
    customizeButton.innerHTML = '<i class="fas fa-magic"></i> 自定义你的答案';
    shakeButton.parentNode.insertBefore(customizeButton, shakeButton.nextSibling);

    // Add dynamic CSS styles for animations
    const style = document.createElement('style');
    style.textContent = `
        /* 加强魔法球的shake动画 */
        .magic-ball {
            transition: transform 0.1s;
            transform-origin: center center;
        }
        
        .magic-ball.shake {
            animation: shakeBall 1.2s cubic-bezier(.36,.07,.19,.97);
        }
        
        @keyframes shakeBall {
            0% { transform: translate(0, 0) rotate(0deg); }
            10% { transform: translate(-30px, -40px) rotate(-25deg); }
            20% { transform: translate(30px, 20px) rotate(20deg); }
            30% { transform: translate(-30px, -30px) rotate(-20deg); }
            40% { transform: translate(30px, 25px) rotate(15deg); }
            50% { transform: translate(-20px, -20px) rotate(-15deg); }
            60% { transform: translate(20px, 15px) rotate(10deg); }
            70% { transform: translate(-15px, -15px) rotate(-10deg); }
            80% { transform: translate(15px, 10px) rotate(5deg); }
            90% { transform: translate(-10px, -5px) rotate(-5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }

        /* 文本长度自适应样式 */
        .answer.long-text {
            font-size: 14px;
        }
        
        .answer.very-long-text {
            font-size: 12px;
        }
    `;
    document.head.appendChild(style);

    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal fade';
    modalContainer.id = 'customAnswersModal';
    modalContainer.setAttribute('tabindex', '-1');
    modalContainer.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">自定义你的神奇答案</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="关闭"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-info alert-dismissible fade show mb-3" role="alert">
                        创建你自己的神奇答案！它们会自动保存。
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="关闭"></button>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" id="customAnswer" 
                            placeholder="在这里输入你的自定义答案..."
                            maxlength="100">
                        <button class="btn btn-primary" id="addCustomAnswer">
                            <i class="fas fa-plus"></i> 添加
                        </button>
                    </div>
                    <div class="custom-answers-wrapper">
                        <ul class="list-group" id="customAnswersList"></ul>
                        <div class="text-center mt-3" id="emptyState">
                            <p class="text-muted">还没有自定义答案。添加你的第一个吧！</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light">
                    <div class="w-100">
                        <!-- Counter Row -->
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <small class="text-muted">
                                <i class="fas fa-info-circle"></i> 自定义答案数量: <span id="customAnswerCount">0 个答案</span>
                            </small>
                            <button type="button" class="btn btn-outline-danger btn-sm" id="clearCustomAnswers">
                                <i class="fas fa-trash"></i> 清除全部
                            </button>
                        </div>
                        <!-- Action Row -->
                        <div class="d-flex gap-2">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">保存并关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalContainer);

    const modal = new bootstrap.Modal(modalContainer);
    customizeButton.addEventListener('click', () => modal.show());

    // 中文版答案数据
    const answers = {
        classic: [
            "毫无疑问",
            "当然可以",
            "绝对没错",
            "肯定是的",
            "值得信赖",
            "看起来是的",
            "很有希望",
            "前途光明",
            "没问题",
            "所有迹象都指向成功",
            "答案不够清楚，再试一次",
            "过会儿再问吧",
            "现在还不能告诉你",
            "目前还看不出来",
            "专心想想再问一遍",
            "不要抱太大希望",
            "恐怕不行",
            "各种信息都显示不可能",
            "不太乐观",
            "很难说会成功"
        ],
        silly: [
            "当然啦，就像独角兽存在一样！",
            "我的水晶球亮了，说YES！",
            "想得美...才怪！",
            "星座显示：也许吧？",
            "等我喝完奶茶再说",
            "我家的招财猫说可以！",
            "除非你能金鸡独立",
            "我的魔法球请假去了",
            "答案藏在你的枕头下面",
            "可以，但仅限周二",
            "想都别想！",
            "宇宙让你重新来过",
            "我拒绝回答这个问题",
            "可以，还送你小红花！",
            "哈哈哈，笑死我了",
            "答案随风而去了",
            "问你家主子去",
            "理论上可以，实际上算了",
            "等猪上天的时候吧",
            "答案永远是42"
        ],
        sarcastic: [
            "当然了，我还是皇帝呢",
            "让我算一卦...卦象显示：别做梦了",
            "可以啊，麒麟也能当宠物",
            "这不是废话吗？",
            "我很想说可以，但良心不允许",
            "在平行宇宙里也许吧",
            "你是认真问这个的？",
            "我当你没问过",
            "emmm...让我想想...不行",
            "比买彩票中大奖还难",
            "我正忙着翻白眼呢",
            "这还用问？",
            "哈哈哈，笑到无法回答",
            "亲，醒醒吧",
            "等母猪会上树再说",
            "我拿我的零花钱打赌：不可能",
            "好搞笑，下一题",
            "你是在逗我吗？",
            "让我先喝杯咖啡压压惊",
            "这么明显的答案我都懒得说"
        ],
        romance: [
            "恋爱的酸臭味扑面而来！",
            "你心里早就有答案了",
            "月老的红线已经牵好了",
            "今天适合表白",
            "有情人终成眷属",
            "缘分天注定",
            "听从内心的声音",
            "好事多磨，再等等",
            "喜欢就要大胆说出来",
            "桃花运就在眼前",
            "这是命中注定的缘分",
            "该主动的时候就主动",
            "爱情需要用心经营",
            "你的桃花运正旺！",
            "相信爱情的力量",
            "好的爱情值得等待",
            "最美的故事刚刚开始",
            "相信自己的感觉",
            "惊喜总在不经意间出现",
            "这个人值得期待"
        ],
        drinking: [
            "干了这杯！",
            "来一口！",
            "走一个！",
            "该你了！",
            "再来一杯！",
            "全场起立干杯！",
            "你很幸运，这轮跳过！",
            "点名一个人喝！",
            "这次放过你！",
            "意思意思就行！",
            "喝点水润润嗓子！",
            "最慢举手的喝一杯！",
            "要么说笑话要么喝酒！",
            "做过的就喝一口",
            "划拳，输的喝！",
            "穿红色的喝一口！",
            "养了几只宠物就喝几口！",
            "刚才看手机的喝！",
            "个子最高的喝！",
            "这周熬夜追剧的喝！"
        ]
    };

    // Load custom answers from localStorage
    let customAnswers = JSON.parse(localStorage.getItem('customAnswers-zh')) || [];

    // Add custom version to answers object
    answers.custom = customAnswers;

    // Create and append custom answers UI
    function createCustomAnswersUI() {
        // Add custom option to version select if not exists
        if (!Array.from(versionSelect.options).some(option => option.value === 'custom')) {
            const customOption = new Option('✨ 自定义答案', 'custom');
            versionSelect.add(customOption);
        }

        // Update custom answers list
        updateCustomAnswersList();

        // Add event listeners for custom answers
        const addButton = document.getElementById('addCustomAnswer');
        const input = document.getElementById('customAnswer');
        const clearButton = document.getElementById('clearCustomAnswers');

        addButton.addEventListener('click', addCustomAnswer);
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') addCustomAnswer();
        });

        // Add input validation and character count
        input.addEventListener('input', function () {
            const remaining = 100 - this.value.length;
            addButton.disabled = this.value.trim().length === 0;
            if (remaining <= 20) {
                this.classList.add('is-warning');
            } else {
                this.classList.remove('is-warning');
            }
        });

        clearButton.addEventListener('click', function () {
            if (confirm('你确定要删除所有自定义答案吗？')) {
                customAnswers = [];
                updateCustomAnswersList();
                saveCustomAnswers();
            }
        });

        // Update custom answer count when modal is shown
        modalContainer.addEventListener('show.bs.modal', () => {
            document.getElementById('customAnswerCount').textContent =
                `${customAnswers.length} 个答案`;
        });
    }

    // Update custom answers list
    function updateCustomAnswersList() {
        const list = document.getElementById('customAnswersList');
        const emptyState = document.getElementById('emptyState');
        const countBadge = document.getElementById('customAnswerCount');

        list.innerHTML = '';
        countBadge.textContent = `${customAnswers.length} 个答案`;

        if (customAnswers.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        customAnswers.forEach((answer, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span class="me-2">${answer}</span>
                <button class="btn btn-outline-danger btn-sm" onclick="removeCustomAnswer(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            list.appendChild(listItem);
        });

        // Update answers object
        answers.custom = customAnswers;
    }

    // Add custom answer
    function addCustomAnswer() {
        const input = document.getElementById('customAnswer');
        const answer = input.value.trim();

        if (answer && !customAnswers.includes(answer)) {
            customAnswers.push(answer);
            updateCustomAnswersList();
            saveCustomAnswers();
            input.value = '';
        }
    }

    // Remove custom answer
    window.removeCustomAnswer = function(index) {
        customAnswers.splice(index, 1);
        updateCustomAnswersList();
        saveCustomAnswers();
    };

    // Save custom answers to localStorage
    function saveCustomAnswers() {
        localStorage.setItem('customAnswers-zh', JSON.stringify(customAnswers));
    }

    // Initialize custom UI
    createCustomAnswersUI();

    let isShaking = false;
    let questionHistory = [];

    // Show initial "8"
    answerElement.textContent = '8';

    // Add shake animation
    function shake() {
        if (isShaking) return;

        isShaking = true;
        magicBall.classList.add('shake');
        answerElement.style.opacity = '0';

        setTimeout(() => {
            const currentVersion = versionSelect.value;
            const currentAnswers = answers[currentVersion];

            if (currentAnswers.length === 0 && currentVersion === 'custom') {
                answerElement.textContent = '请先添加自定义答案！';
            } else {
                const randomAnswer = currentAnswers[Math.floor(Math.random() * currentAnswers.length)];
                answerElement.textContent = randomAnswer;

                // Add to history if there's a question
                const question = questionInput.value.trim();
                if (question) {
                    addToHistory(question, randomAnswer);
                    questionInput.value = '';
                }
            }

            answerElement.style.opacity = '1';
            magicBall.classList.remove('shake');
            isShaking = false;
        }, 1500);
    }

    // Add to history
    function addToHistory(question, answer) {
        const historyItem = {
            question: question,
            answer: answer,
            timestamp: new Date().toLocaleString('zh-CN')
        };

        questionHistory.unshift(historyItem);
        if (questionHistory.length > 10) {
            questionHistory.pop();
        }

        updateHistoryDisplay();
    }

    // Update history display
    function updateHistoryDisplay() {
        historyList.innerHTML = '';

        if (questionHistory.length === 0) {
            const emptyItem = document.createElement('li');
            emptyItem.className = 'list-group-item text-muted text-center';
            emptyItem.textContent = '还没有问题历史';
            historyList.appendChild(emptyItem);
            return;
        }

        questionHistory.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <strong>问题:</strong> ${item.question}<br>
                        <strong>答案:</strong> ${item.answer}
                    </div>
                    <small class="text-muted">${item.timestamp}</small>
                </div>
            `;
            historyList.appendChild(listItem);
        });
    }

    // Event listeners
    shakeButton.addEventListener('click', shake);
    magicBall.addEventListener('click', shake);
    questionInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') shake();
    });

    // Initialize history
    updateHistoryDisplay();
});