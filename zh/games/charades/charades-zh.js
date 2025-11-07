// 中文词汇库
const wordDatabase = {
    animals: [
        "大象", "长颈鹿", "企鹅", "袋鼠", "狮子", "老虎", "猴子",
        "蝴蝶", "蜘蛛", "鳄鱼", "海豚", "老鹰", "章鱼",
        "熊猫", "兔子", "蛇", "斑马", "熊", "猫头鹰", "青蛙",
        "小狗", "小猫", "金鱼", "乌龟", "松鼠", "浣熊", "狐狸",
        "河马", "犀牛", "鲨鱼", "鲸鱼", "海豹", "考拉", "树懒",
        "蜜蜂", "蚂蚁", "蝎子", "螃蟹", "龙虾", "海星"
    ],
    actions: [
        "游泳", "跳舞", "滑雪", "做饭", "画画", "跑步",
        "弹吉他", "看书", "睡觉", "唱歌", "拳击",
        "滑冰", "冲浪", "打篮球", "拍照",
        "钓鱼", "杂耍", "打网球", "跳水", "写字",
        "骑自行车", "开车", "爬山", "瑜伽", "举重",
        "打太极", "踢足球", "打乒乓球", "下棋", "弹钢琴",
        "洗衣服", "刷牙", "洗脸", "梳头", "化妆",
        "打电话", "发短信", "上网", "购物", "旅游"
    ],
    objects: [
        "雨伞", "手机", "电脑", "吉他", "相机", "时钟",
        "眼镜", "书", "椅子", "桌子", "铅笔", "镜子", "门",
        "窗户", "台灯", "电视", "自行车", "钢琴", "背包",
        "耳机", "键盘", "鼠标", "充电器", "水杯", "筷子",
        "勺子", "盘子", "碗", "锅", "刀", "叉子",
        "毛巾", "枕头", "被子", "床", "沙发", "冰箱",
        "洗衣机", "空调", "风扇", "花瓶"
    ],
    movies: [
        "星球大战", "泰坦尼克号", "狮子王", "哈利波特", "阿凡达",
        "侏罗纪公园", "蜘蛛侠", "黑客帝国", "海底总动员",
        "加勒比海盗", "冰雪奇缘", "复仇者联盟", "玩具总动员",
        "蝙蝠侠", "夺宝奇兵", "异形", "大白鲨", "超人", "捉鬼敢死队",
        "绿野仙踪", "功夫熊猫", "怪物史莱克", "马达加斯加",
        "变形金刚", "钢铁侠", "雷神", "美国队长", "黑寡妇",
        "西游记", "花木兰", "大话西游", "英雄", "卧虎藏龙",
        "让子弹飞", "战狼", "流浪地球", "哪吒", "千与千寻"
    ],
    funny: [
        "喝醉", "僵尸", "老人腰疼", "装孙子",
        "装富人", "踩香蕉皮", "跳广场舞",
        "大妈唠叨", "卡电梯", "打瞌睡",
        "高跟鞋滑倒", "学婴儿", "腰闪了",
        "被附身", "无地自容", "低头撞人",
        "相亲紧张", "跳霸王舞", "说相声", "摔楼梯",
        "飞檐走壁", "撒泼打滚", "假装没听清",
        "醉鬼跳舞", "装委屈", "中二少年",
        "被胶带粘住", "鸭子走路", "被雷劈", "老农种地",
        "吃冰淇淋", "宅男走路", "假装成功"
    ],
    sports: [
        "篮球", "足球", "网球", "乒乓球", "羽毛球", "排球",
        "棒球", "美式橄榄球", "冰球", "高尔夫", "保龄球",
        "游泳", "跳水", "冲浪", "滑雪", "滑冰", "花样滑冰",
        "体操", "田径", "摔跤", "拳击", "击剑", "射箭",
        "骑自行车", "山地自行车", "滑板", "攀岩", "跑步", "马拉松",
        "跳绳", "健身", "瑜伽", "柔道", "跆拳道", "武术"
    ],
    professions: [
        "医生", "护士", "牙医", "精神病医生", "警察", "消防员",
        "厨师", "服务员", "出租车司机", "长途卡车司机", "飞行员", "空姐",
        "律师", "法官", "检察官", "工程师", "建筑师", "程序员",
        "UI设计师", "画家", "雕塑家", "歌星", "演员", "电影导演",
        "编剧", "新闻记者", "摄影师", "摄像师", "作家", "诗人",
        "翻译", "导游", "教授", "小学老师", "健身教练", "体育裁判",
        "农民", "建筑工人", "电工", "管道工", "木匠", "理发师",
        "美发师", "按摩师", "瑜伽教练", "营养师", "医学生", "护理实习生",
        "保姆", "保安", "清洁工", "快递员", "超市收银员", "餐厅经理"
    ],
    historical: [
        "孔子", "老子", "秦始皇", "武则天", "康熙皇帝",
        "成吉思汗", "忽必烈", "郑和", "李时珍", "王昭君",
        "诸葛亮", "曹操", "刘备", "孙权", "周瑜",
        "岳飞", "文天祥", "戚继光", "林则徐", "邓世昌",
        "孙中山", "毛泽东", "周恩来", "邓小平", "江泽民",
        "拿破仑", "爱因斯坦", "莎士比亚", "莫扎特", "贝多芬",
        "列奥纳多·达·芬奇", "梵高", "米开朗基罗", "牛顿", "伽利略",
        "居里夫人", "爱迪生", "乔治·华盛顿", "甘地", "马丁·路德·金",
        "屈原", "司马迁", "唐太宗", "苏轼", "李白",
        "杜甫", "王维", "白居易", "柳宗元", "韩愈"
    ]
};

class CharadesGame {
    constructor() {
        this.setupScreen = document.getElementById('setup-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.currentWordElement = document.getElementById('current-word');
        this.timerElement = document.getElementById('timer');
        this.scoreElement = document.getElementById('score');
        this.gameHeader = document.querySelector('#game-header');
        this.infoSection = document.querySelector('#info-section');

        this.initializeButtons();
        this.resetGame();
    }

    initializeButtons() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('correct').addEventListener('click', () => this.handleCorrect());
        document.getElementById('skip').addEventListener('click', () => this.handleSkip());
        document.getElementById('play-again').addEventListener('click', () => this.resetGame());
    }

    resetGame() {
        this.score = 0;
        this.currentWords = [];
        this.correctWords = [];
        this.skippedWords = [];
        this.timeLeft = 60;
        this.isGameRunning = false;

        this.setupScreen.classList.remove('hidden');
        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.add('hidden');
        this.gameHeader.classList.remove('hidden');
        this.infoSection.classList.remove('hidden');

        this.updateScore();
    }

    startGame() {
        this.timeLeft = parseInt(document.getElementById('round-time').value);
        const category = document.getElementById('word-category').value;

        this.currentWords = this.getWords(category);
        if (this.currentWords.length === 0) {
            alert('没有足够的词汇可用！');
            return;
        }

        this.setupScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.resultScreen.classList.add('hidden');
        this.gameHeader.classList.add('hidden');
        this.infoSection.classList.add('hidden');

        this.isGameRunning = true;
        this.nextWord();
        this.startTimer();
    }

    getWords(category) {
        let words = [];
        if (category === 'all') {
            Object.values(wordDatabase).forEach(categoryWords => {
                words = words.concat(categoryWords);
            });
        } else {
            words = wordDatabase[category] || [];
        }
        return this.shuffleArray([...words]);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = this.timeLeft;
            console.log("计时器:", this.timeLeft);

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    nextWord() {
        if (this.currentWords.length > 0) {
            const word = this.currentWords.pop();
            this.currentWordElement.textContent = word;
            console.log("当前词汇:", word);
        } else {
            this.endGame();
        }
    }

    handleCorrect() {
        if (!this.isGameRunning) return;
        console.log("答对了按钮被点击");

        this.correctWords.push(this.currentWordElement.textContent);
        this.score += 1;
        this.updateScore();
        this.nextWord();
    }

    handleSkip() {
        if (!this.isGameRunning) return;
        console.log("跳过按钮被点击");

        this.skippedWords.push(this.currentWordElement.textContent);
        this.nextWord();
    }

    updateScore() {
        this.scoreElement.textContent = `得分：${this.score}`;
    }

    endGame() {
        this.isGameRunning = false;
        clearInterval(this.timerInterval);

        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        this.gameHeader.classList.remove('hidden');

        document.getElementById('final-score').textContent = `最终得分：${this.score}`;

        let summary = '<h3>答对的词汇：</h3>';
        summary += this.correctWords.length > 0 ?
            `<p>${this.correctWords.join('、')}</p>` :
            '<p>无</p>';

        summary += '<h3>跳过的词汇：</h3>';
        summary += this.skippedWords.length > 0 ?
            `<p>${this.skippedWords.join('、')}</p>` :
            '<p>无</p>';

        document.getElementById('word-summary').innerHTML = summary;
    }
}

// 在DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM已加载，正在初始化游戏...");
    new CharadesGame();
});