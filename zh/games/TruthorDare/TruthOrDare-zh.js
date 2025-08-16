// 中文版游戏数据
const gameData = {
    currentType: null,
    questions: {
        truth: [
            // 轻松有趣类
            "你上次撒谎是什么时候？",
            "如果你能变成一种动物，你想变成什么？",
            "你小时候最奇怪的幻想是什么？",
            "你有没有暗恋过在场的某个人？",
            "你最尴尬的时刻是什么？",
            "你最喜欢的表情包是什么？",
            "你为什么事情哭得最伤心？",
            "如果你隐身一天，你会做什么？",
            "你最喜欢的电影台词是什么？",
            "你做过最无聊的事情是什么？",

            // 情感深度类
            "你暗恋过谁？",
            "你最难忘的恋爱经历是什么？",
            "你理想中的约会是什么样的？",
            "你为爱情做过最疯狂的事情是什么？",
            "你最喜欢自己的哪一点？",
            "你最不喜欢自己的哪一点？",
            "你什么时候感到最愧疚？",
            "你最美好的童年回忆是什么？",
            "你最自豪的事情是什么？",
            "你最害怕什么？",

            // 创意想象类
            "如果你能拥有一种超能力，你想要什么？",
            "如果你能穿越时空，你想改变什么？",
            "如果你能当一天明星，你想当谁？",
            "你最喜欢的虚拟角色是谁？",
            "如果你能发明一种新食物，会是什么？",
            "你最喜欢的节日是什么，为什么？",
            "如果你能生活在任何电影或电视剧的世界里，你会选哪个？",
            "你最想去的旅行目的地是哪里？",
            "如果你能改变世界上的一件事，你会改变什么？",
            "你最喜欢的童年游戏是什么？",

            // 人际关系类
            "你因为什么事对朋友生过气？",
            "你因为什么事对家人生过气？",
            "你因为什么事对同事生过气？",
            "你因为什么事对陌生人生过气？",
            "你经历过最尴尬的事情是什么？",
            "你经历过最开心的事情是什么？",
            "你经历过最伤心的事情是什么？",
            "你经历过最意外的事情是什么？",
            "你什么时候最生气？",
            "你经历过最可怕的事情是什么？",

            // 日常喜好类
            "你最喜欢吃什么？",
            "你最喜欢喝什么？",
            "你最喜欢什么颜色？",
            "你最喜欢什么类型的音乐？",
            "你最喜欢什么运动？",
            "你最喜欢什么书？",
            "你最喜欢什么电影？",
            "你最喜欢什么电视剧？",
            "你最喜欢什么游戏？",
            "你最常用什么社交软件？",

            // 个人秘密类
            "你有什么不为人知的癖好？",
            "你最后悔的一件事是什么？",
            "你做过最冲动的事情是什么？",
            "你最想对某个人说什么话？",
            "你最不想让别人知道的事情是什么？",
            "你做过最幼稚的事情是什么？",
            "你最想忘记的回忆是什么？",
            "你最想实现的愿望是什么？",
            "你对未来最大的担心是什么？",
            "你最想感谢的人是谁？"
        ],
        dare: [
            // 搞笑表演类
            "用屁股写出你的名字",
            "像企鹅一样走路",
            "用奇怪的声音说话直到下一轮",
            "给你通讯录第3个人打电话唱首歌",
            "发一条奇怪的朋友圈",
            "模仿一个明星直到下一轮",
            "把袜子当手套戴5分钟",
            "用口红在脸上画个图案",
            "尝试舔自己的鼻子（或手肘）",
            "对着镜子说10遍'我太帅/美了'",

            // 社交挑战类
            "给你的前任发信息说'我想你了'",
            "在公共场所大声唱歌",
            "拥抱一个陌生人",
            "发一张你的丑照到朋友圈",
            "随机给通讯录里的人打电话假装推销员",
            "在公共场所跳舞",
            "发朋友圈说'我恋爱了'",
            "随机给人打电话假装是机器人",
            "在公共场所大喊'我爱你们所有人！'",
            "随机给人打电话假装是外星人",

            // 互动挑战类
            "给某个人一个拥抱",
            "亲某个人的脸颊",
            "给某个人按摩",
            "给某个人一个小礼物",
            "给某个人一个惊喜",
            "给某个人出一个挑战",
            "给某个人安排一个任务",
            "和某个人分享一个秘密",
            "真诚地夸奖某个人",
            "向某个人道歉",

            // 技能展示类
            "做10个俯卧撑",
            "倒立10秒钟",
            "单脚站立1分钟",
            "表演一段舞蹈",
            "唱一首完整的歌",
            "说一段绕口令",
            "表演一个魔术",
            "讲一个笑话",
            "即兴表演一段戏",
            "画一幅自画像",

            // 社交媒体类
            "发一条感谢朋友的朋友圈",
            "发一条搞笑的自拍",
            "发一条鸡汤文到朋友圈",
            "给你的偶像发私信",
            "在群里发一个表情包接龙",
            "发一条'今天天气真好'",
            "给朋友点赞最近10条动态",
            "发一条美食照片",
            "分享一首你最喜欢的歌",
            "发一条早安/晚安",

            // 创意表达类
            "用身体比划出一个词让大家猜",
            "不能说话只能你划我猜1分钟",
            "学动物叫声",
            "表演一个哑剧",
            "用不同的声音读一段文字",
            "即兴编一个故事",
            "表演醉酒的样子",
            "模仿某个动画角色",
            "表演生气的样子",
            "模仿婴儿说话",

            // 勇气挑战类
            "给你暗恋的人发消息",
            "在群里说出你的一个缺点",
            "承认一个你犯过的错误",
            "大声说出你的一个愿望",
            "当众表扬在场的每个人",
            "说出你对某个人的真实看法",
            "分享一个你的糗事",
            "大胆表达一个观点",
            "说出你最想改变的习惯",
            "向大家道歉你曾经做错的事"
        ]
    }
};

// DOM 元素
const questionText = document.getElementById('questionText');
const nextButton = document.getElementById('nextButton');
const resetButton = document.getElementById('resetButton');
const selectedType = document.getElementById('selectedType');

// 选择真心话或大冒险
function selectChoice(type) {
    gameData.currentType = type;
    
    // 随机选择问题
    const questions = gameData.questions[type];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    // 显示问题
    questionText.textContent = randomQuestion;
    
    // 显示选择的类型
    if (type === 'truth') {
        selectedType.innerHTML = '<span class="badge bg-info">真心话</span>';
    } else {
        selectedType.innerHTML = '<span class="badge bg-danger">大冒险</span>';
    }
    selectedType.style.display = 'block';
    
    // 显示控制按钮
    nextButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
    
    // 隐藏选择按钮
    document.querySelector('.choice-buttons').style.display = 'none';
}

// 下一个问题
function nextQuestion() {
    if (gameData.currentType) {
        const questions = gameData.questions[gameData.currentType];
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionText.textContent = randomQuestion;
    }
}

// 重置游戏
function resetGame() {
    gameData.currentType = null;
    questionText.textContent = '👇 选择你的选项！ 👇';
    selectedType.style.display = 'none';
    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
    document.querySelector('.choice-buttons').style.display = 'flex';
}