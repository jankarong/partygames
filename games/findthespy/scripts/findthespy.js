document.addEventListener('DOMContentLoaded', () => {
    // 获取所有角色计数器组件
    const roleCounters = document.querySelectorAll('.role-counter');
    const playerCountInput = document.getElementById('playerCount');
    const spyCountInput = document.getElementById('spyCount');
    const blankCountInput = document.getElementById('blankCount');

    // 更新空白角色的最大数量
    const updateBlankLimit = () => {
        const playerCount = parseInt(playerCountInput.value);
        const spyCount = parseInt(spyCountInput.value);
        // 空白角色最大数量 = 总人数 - 间谍数量 - 1（至少需要1个平民）
        const maxBlanks = playerCount - spyCount - 1;

        blankCountInput.max = maxBlanks;
        // 如果当前空白数超过新的上限，则调整为上限值
        if (parseInt(blankCountInput.value) > maxBlanks) {
            blankCountInput.value = maxBlanks;
            blankCountInput.dispatchEvent(new Event('change'));
        }
    };

    roleCounters.forEach(counter => {
        const decreaseBtn = counter.querySelector('[data-action="decrease"]');
        const increaseBtn = counter.querySelector('[data-action="increase"]');
        const field = counter.querySelector('input[type="number"]');

        // 处理减少按钮点击
        decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(field.value);
            const minValue = parseInt(field.min);

            if (currentValue > minValue) {
                field.value = currentValue - 1;
                field.dispatchEvent(new Event('change'));
            }
        });

        // 处理增加按钮点击
        increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(field.value);
            const maxValue = parseInt(field.max);

            if (currentValue < maxValue) {
                field.value = currentValue + 1;
                field.dispatchEvent(new Event('change'));
            }
        });

        // 根据当前值更新按钮状态
        const updateButtonStates = () => {
            const currentValue = parseInt(field.value);
            const minValue = parseInt(field.min);
            const maxValue = parseInt(field.max);

            decreaseBtn.disabled = currentValue <= minValue;
            increaseBtn.disabled = currentValue >= maxValue;
        };

        // 初始化按钮状态
        updateButtonStates();

        // 当值变化时更新按钮状态
        field.addEventListener('change', updateButtonStates);
    });

    // 处理词源选择标签切换
    const wordSourceTabs = document.querySelectorAll('.word-source__tab');
    const wordSourceContents = document.querySelectorAll('.word-source__content > div');

    wordSourceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有活动状态
            wordSourceTabs.forEach(t => t.classList.remove('active'));
            wordSourceContents.forEach(c => c.classList.remove('active'));

            // 添加当前选中的活动状态
            tab.classList.add('active');
            const source = tab.dataset.source;
            document.querySelector(`.word-source__${source}`).classList.add('active');
        });
    });

    // 监听玩家数量和间谍数量的变化
    playerCountInput.addEventListener('change', updateBlankLimit);
    spyCountInput.addEventListener('change', updateBlankLimit);

    // 初始化空白角色数量限制
    updateBlankLimit();

    // 处理开始游戏
    const startGameBtn = document.getElementById('startGame');
    startGameBtn.addEventListener('click', () => {
        // 收集游戏设置
        const gameSettings = {
            playerCount: parseInt(playerCountInput.value),
            spyCount: parseInt(spyCountInput.value),
            blankCount: parseInt(blankCountInput.value),
            timeLimit: parseInt(document.getElementById('timeLimit').value),
            wordSource: document.querySelector('.word-source__tab.active').dataset.source,
            words: getSelectedWords()
        };

        // 验证游戏设置
        if (!validateGameSettings(gameSettings)) {
            return;
        }

        // 开始游戏
        startGame(gameSettings);
    });

    // 获取选中的词
    function getSelectedWords() {
        const activeSource = document.querySelector('.word-source__content > div.active');
        if (activeSource.classList.contains('word-source__preset')) {
            const wordPack = document.getElementById('wordPack').value;
            return getPresetWords(wordPack);
        } else {
            return {
                regular: document.getElementById('regularWord').value.trim(),
                spy: document.getElementById('spyWord').value.trim()
            };
        }
    }

    // 验证游戏设置
    function validateGameSettings(settings) {
        if (settings.wordSource === 'custom') {
            if (!settings.words.regular || !settings.words.spy) {
                alert('Please enter both regular and spy words');
                return false;
            }
            if (settings.words.regular === settings.words.spy) {
                alert('Regular word and spy word must be different');
                return false;
            }
        }
        return true;
    }

    // 开始游戏
    function startGame(settings) {
        // 保存游戏设置到 sessionStorage
        sessionStorage.setItem('gameSettings', JSON.stringify(settings));
        // 跳转到角色分配页面
        window.location.href = 'role-assignment.html';
    }

    // 预设词包
    function getPresetWords(packId) {
        const encode = (str) => btoa(encodeURIComponent(str));
        const decode = (str) => decodeURIComponent(atob(str));

        const encodedWordPacks = {
            food: {
                name: 'Food & Drink',
                words: [
                    { regular: 'UGl6emE=', spy: 'QnVyZ2Vy' },
                    { regular: 'U3VzaGk=', spy: 'U2FzaGltaQ==' },
                    { regular: 'Q29mZmVl', spy: 'VGVh' },
                    { regular: 'Q29rZQ==', spy: 'UGVwc2k=' },
                    { regular: 'SWNlJTIwQ3JlYW0=', spy: 'RnJvemVuJTIwWW9ndXJ0' },
                    { regular: 'RnJlbmNoJTIwRnJpZXM=', spy: 'UG90YXRvJTIwQ2hpcHM=' },
                    { regular: 'Q2hvY29sYXRl', spy: 'Q2FuZHk=' },
                    { regular: 'QnJlYWQ=', spy: 'Q2FrZQ==' },
                    { regular: 'QXBwbGU=', spy: 'QmFuYW5h' },
                    { regular: 'V2F0ZXJtZWxvbg==', spy: 'Q2FudGFsb3VwZQ==' },
                    { regular: 'UGFuY2FrZQ==', spy: 'V2FmZmxl' },
                    { regular: 'SG90JTIwRG9n', spy: 'U2FuZHdpY2g=' },
                    { regular: 'TWlsa3NoYWtl', spy: 'U21vb3RoaWU=' },
                    { regular: 'UG9wY29ybg==', spy: 'Q2hpcHM=' },
                    { regular: 'Q2hlZXNl', spy: 'QnV0dGVy' },
                    { regular: 'UGFzdGE=', spy: 'Tm9vZGxlcw==' },
                    { regular: 'U3RlYWs=', spy: 'UmlicwA=' },
                    { regular: 'U2FsYWQ=', spy: 'U291cA==' },
                    { regular: 'RG9udXQ=', spy: 'TXVmZmlu' },
                    { regular: 'WW9ndXJ0', spy: 'UHVkZGluZw==' },
                    { regular: 'S2V0Y2h1cA==', spy: 'TXVzdGFyZA==' },
                    { regular: 'U2FsdA==', spy: 'UGVwcGVy' },
                    { regular: 'V2luZQ==', spy: 'QmVlcg==' },
                    { regular: 'V2hpc2tleQ==', spy: 'Vm9ka2E=' },
                    { regular: 'TGVtb25hZGU=', spy: 'SWNlZCUyMFRlYQ==' },
                    { regular: 'Q2VyZWFs', spy: 'T2F0bWVhbA==' },
                    { regular: 'VGFjbw==', spy: 'QnVycml0bw==' },
                    { regular: 'U29kYQ==', spy: 'SnVpY2U=' },
                    { regular: 'Q29va2ll', spy: 'QnJvd25pZQ==' },
                    { regular: 'SG9uZXk=', spy: 'U3lydXA=' }
                ]
            },
            popculture: {
                name: 'Pop Culture & Memes',
                words: [
                    { regular: 'VGlrVG9r', spy: 'SW5zdGFncmFtJTIwUmVlbHM=' },
                    { regular: 'TWVtZQ==', spy: 'R0lG' },
                    { regular: 'TmV0ZmxpeA==', spy: 'QmluZ2UlMjBXYXRjaGluZw==' },
                    { regular: 'TWFydmVs', spy: 'REM=' },
                    { regular: 'SGFycnklMjBQb3R0ZXI=', spy: 'TG9yZCUyMG9mJTIwdGhlJTIwUmluZ3M=' },
                    { regular: 'U3BpZGVyLU1hbg==', spy: 'QmF0bWFu' },
                    { regular: 'U3RhciUyMFdhcnM=', spy: 'U3RhciUyMFRyZWs=' },
                    { regular: 'RGlzbmV5', spy: 'UGl4YXI=' },
                    { regular: 'QXZlbmdlcnM=', spy: 'SnVzdGljZSUyMExlYWd1ZQ==' },
                    { regular: 'RnJvemVu', spy: 'Wm9vdG9waWE=' },
                    { regular: 'WW91VHViZQ==', spy: 'VHdpdGNo' },
                    { regular: 'U3RyZWFtZXI=', spy: 'R2FtZXI=' },
                    { regular: 'RW1vamk=', spy: 'VGV4dA==' },
                    { regular: 'SGFzaHRhZw==', spy: 'VHJlbmRpbmclMjBUb3BpYw==' },
                    { regular: 'VmlyYWwlMjBWaWRlbw==', spy: 'Q2xhc3NpYyUyME1vdmll' },
                    { regular: 'U3VwZXJmYW4=', spy: 'Q2FzdWFsJTIwVmlld2Vy' },
                    { regular: 'RmFuZG9t', spy: 'SGF0ZXI=' },
                    { regular: 'Q29zcGxheQ==', spy: 'Q29zdHVtZQ==' },
                    { regular: 'QW5pbWU=', spy: 'Q2FydG9vbg==' },
                    { regular: 'Sy1Qb3A=', spy: 'UG9w' },
                    { regular: 'UG9kY2FzdA==', spy: 'UmFkaW8=' },
                    { regular: 'SW5mbHVlbmNlcg==', spy: 'Q2VsZWJyaXR5' },
                    { regular: 'U2VsZmll', spy: 'R3JvdXAlMjBQaG90bw==' },
                    { regular: 'RmlsdGVy', spy: 'Tm8lMjBGaWx0ZXI=' },
                    { regular: 'VW5ib3hpbmc=', spy: 'UmV2aWV3' },
                    { regular: 'U3BvaWxlcg==', spy: 'UGxvdCUyMFR3aXN0' },
                    { regular: 'RmFuJTIwQXJ0', spy: 'T3JpZ2luYWwlMjBBcnQ=' },
                    { regular: 'TWVtZSUyMExvcmQ=', spy: 'THVya2Vy' },
                    { regular: 'U3Vic2NyaWJlcg==', spy: 'Rm9sbG93ZXI=' },
                    { regular: 'TGlrZQ==', spy: 'U2hhcmU=' }
                ]
            },
            animals: {
                name: 'Animals',
                words: [
                    { regular: 'Q2F0', spy: 'RG9n' },
                    { regular: 'VGlnZXI=', spy: 'TGlvbg==' },
                    { regular: 'UGFuZGE=', spy: 'S29hbGE=' },
                    { regular: 'RWxlcGhhbnQ=', spy: 'Umhpbm8=' },
                    { regular: 'V2hhbGU=', spy: 'U2hhcms=' },
                    { regular: 'QnV0dGVyZmx5', spy: 'QmVl' },
                    { regular: 'UmFiYml0', spy: 'SGFtc3Rlcg==' },
                    { regular: 'Q3JvY29kaWxl', spy: 'SGlwcG8=' },
                    { regular: 'UGVuZ3Vpbg==', spy: 'UG9sYXIlMjBCZWFy' },
                    { regular: 'UGVhY29jaw==', spy: 'UGFycm90' },
                    { regular: 'RG9scGhpbg==', spy: 'U2VhbA==' },
                    { regular: 'T3ds', spy: 'RWFnbGU=' },
                    { regular: 'RnJvZw==', spy: 'VG9hZA==' },
                    { regular: 'VHVydGxl', spy: 'VG9ydG9pc2U=' },
                    { regular: 'V29sZg==', spy: 'Rm94' },
                    { regular: 'R2lyYWZmZQ==', spy: 'WmVicmE=' },
                    { regular: 'S2FuZ2Fyb28=', spy: 'V2FsbGFieQ==' },
                    { regular: 'TW9ua2V5', spy: 'R29yaWxsYQ==' },
                    { regular: 'U25ha2U=', spy: 'TGl6YXJk' },
                    { regular: 'Q2hpY2tlbg==', spy: 'RHVjaw==' },
                    { regular: 'UGln', spy: 'Qm9hcg==' },
                    { regular: 'RGVlcg==', spy: 'TW9vc2U=' },
                    { regular: 'U2hlZXA=', spy: 'R29hdA==' },
                    { regular: 'Q3JhYg==', spy: 'TG9ic3Rlcg==' },
                    { regular: 'T2N0b3B1cw==', spy: 'U3F1aWQ=' },
                    { regular: 'SmVsbHlmaXNo', spy: 'U3RhcmZpc2g=' },
                    { regular: 'QW50', spy: 'QmVldGxl' },
                    { regular: 'SG9yc2U=', spy: 'RG9ua2V5' },
                    { regular: 'U3dhbg==', spy: 'R29vc2U=' },
                    { regular: 'QmF0', spy: 'QmlyZA==' }
                ]
            },
            objects: {
                name: 'Everyday Objects',
                words: [
                    { regular: 'VG9vdGhicnVzaA==', spy: 'VG9vdGhwYXN0ZQ==' },
                    { regular: 'VG93ZWw=', spy: 'QmF0aHJvYmU=' },
                    { regular: 'Q3Vw', spy: 'Qm93bA==' },
                    { regular: 'UGlsbG93', spy: 'QmxhbmtldA==' },
                    { regular: 'VW1icmVsbGE=', spy: 'UGFyYXNvbA==' },
                    { regular: 'QmFja3BhY2s=', spy: 'V2FsbGV0' },
                    { regular: 'V2F0Y2g=', spy: 'QnJhY2VsZXQ=' },
                    { regular: 'TWlycm9y', spy: 'Q29tYg==' },
                    { regular: 'U2Npc3NvcnM=', spy: 'R2x1ZQ==' },
                    { regular: 'TGlnaHQlMjBCdWxi', spy: 'TGFtcA==' },
                    { regular: 'UmVtb3RlJTIwQ29udHJvbA==', spy: 'VFY=' },
                    { regular: 'UGhvbmU=', spy: 'UGhvbmUlMjBDYXNl' },
                    { regular: 'Qm9vaw==', spy: 'Qm9va21hcms=' },
                    { regular: 'Q2hhaXI=', spy: 'U3Rvb2w=' },
                    { regular: 'VGFibGU=', spy: 'RGVzaw==' },
                    { regular: 'UGVu', spy: 'UGVuY2ls' },
                    { regular: 'UGFwZXI=', spy: 'Tm90ZWJvb2s=' },
                    { regular: 'S2V5', spy: 'TG9jaw==' },
                    { regular: 'U2hvZQ==', spy: 'U29jaw==' },
                    { regular: 'SGF0', spy: 'Q2Fw' },
                    { regular: 'R2xhc3Nlcw==', spy: 'U3VuZ2xhc3Nlcw==' },
                    { regular: 'QmFn', spy: 'UHVyc2U=' },
                    { regular: 'Q2xvY2s=', spy: 'V2F0Y2g=' },
                    { regular: 'RmFu', spy: 'QWlyJTIwQ29uZGl0aW9uZXI=' },
                    { regular: 'Q2FuZGxl', spy: 'TGFtcA==' },
                    { regular: 'U3Bvb24=', spy: 'Rm9yaw==' },
                    { regular: 'UGxhdGU=', spy: 'Qm93bA==' },
                    { regular: 'Qm90dGxl', spy: 'SmFy' },
                    { regular: 'Qm94', spy: 'Q29udGFpbmVy' },
                    { regular: 'RG9vcg==', spy: 'V2luZG93' }
                ]
            },
            fantasy: {
                name: 'Fantasy & Sci-Fi',
                words: [
                    { regular: 'QWxpZW4=', spy: 'Um9ib3Q=' },
                    { regular: 'VmFtcGlyZQ==', spy: 'Wm9tYmll' },
                    { regular: 'VW5pY29ybg==', spy: 'RHJhZ29u' },
                    { regular: 'VGltZSUyMFRyYXZlbA==', spy: 'VGVsZXBvcnRhdGlvbg==' },
                    { regular: 'TWFnaWNpYW4=', spy: 'U3VwZXJoZXJv' },
                    { regular: 'SW52aXNpYmlsaXR5', spy: 'U2hhcGVzaGlmdGluZw==' },
                    { regular: 'UGFyYWxsZWwlMjBVbml2ZXJzZQ==', spy: 'QmxhY2slMjBIb2xl' },
                    { regular: 'RHJlYW0=', spy: 'TmlnaHRtYXJl' },
                    { regular: 'R2hvc3Q=', spy: 'U3Bpcml0' },
                    { regular: 'RnV0dXJlJTIwQ2l0eQ==', spy: 'QW5jaWVudCUyMEtpbmdkb20=' },
                    { regular: 'U3BhY2VzaGlw', spy: 'VGltZSUyME1hY2hpbmU=' },
                    { regular: 'V2l6YXJk', spy: 'V2l0Y2g=' },
                    { regular: 'RWxm', spy: 'RHdhcmY=' },
                    { regular: 'RmFpcnk=', spy: 'UGl4aWU=' },
                    { regular: 'TWVybWFpZA==', spy: 'U2lyZW4=' },
                    { regular: 'Q3lib3Jn', spy: 'QW5kcm9pZA==' },
                    { regular: 'R2FsYXh5', spy: 'VW5pdmVyc2U=' },
                    { regular: 'U3VwZXJwb3dlcg==', spy: 'TWFnaWMlMjBTcGVsbA==' },
                    { regular: 'UG9ydGFs', spy: 'V29ybWhvbGU=' },
                    { regular: 'Q2xvbmU=', spy: 'VHdpbg==' },
                    { regular: 'TW9uc3Rlcg==', spy: 'Q3JlYXR1cmU=' },
                    { regular: 'TXl0aA==', spy: 'TGVnZW5k' },
                    { regular: 'VHJlYXN1cmU=', spy: 'QXJ0aWZhY3Q=' },
                    { regular: 'UXVlc3Q=', spy: 'QWR2ZW50dXJl' },
                    { regular: 'Q2FzdGxl', spy: 'UGFsYWNl' },
                    { regular: 'U3dvcmQ=', spy: 'U2hpZWxk' },
                    { regular: 'QXJtb3I=', spy: 'Q2xvYWs=' },
                    { regular: 'UG90aW9u', spy: 'RWxpeGly' },
                    { regular: 'U3BlbGxib29r', spy: 'R3JpbW9pcmU=' },
                    { regular: 'SGVybw==', spy: 'VmlsbGFpbg==' }
                ]
            }
        };

        const pack = encodedWordPacks[packId];
        const randomIndex = Math.floor(Math.random() * pack.words.length);
        const selectedWords = pack.words[randomIndex];

        return {
            regular: decode(selectedWords.regular),
            spy: decode(selectedWords.spy)
        };
    }
}); 