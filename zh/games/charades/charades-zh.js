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
    foods: [
        "汉堡", "披萨", "寿司", "拉面", "饺子", "包子",
        "面条", "米饭", "炒饭", "火锅", "烧烤", "麻辣烫",
        "冰淇淋", "蛋糕", "巧克力", "糖果", "饼干", "面包",
        "苹果", "香蕉", "橙子", "草莓", "葡萄", "西瓜",
        "牛奶", "咖啡", "茶", "果汁", "可乐", "水",
        "鸡肉", "牛肉", "猪肉", "鱼", "虾", "蛋",
        "豆腐", "青菜", "胡萝卜", "土豆", "玉米", "番茄"
    ],
    professions: [
        "医生", "护士", "老师", "学生", "警察", "消防员",
        "厨师", "服务员", "司机", "飞行员", "律师", "法官",
        "工程师", "程序员", "设计师", "画家", "歌手", "演员",
        "导演", "记者", "摄影师", "作家", "翻译", "导游",
        "农民", "工人", "建筑师", "会计", "银行家", "商人",
        "理发师", "美容师", "按摩师", "健身教练", "舞蹈老师", "音乐家",
        "科学家", "研究员", "图书管理员", "快递员", "清洁工", "保安"
    ],
    emotions: [
        "开心", "伤心", "生气", "害怕", "惊讶", "厌恶",
        "兴奋", "紧张", "放松", "困惑", "骄傲", "羞愧",
        "嫉妒", "同情", "感激", "后悔", "希望", "绝望",
        "爱", "恨", "喜欢", "讨厌", "信任", "怀疑",
        "乐观", "悲观", "自信", "自卑", "勇敢", "胆小",
        "耐心", "急躁", "冷静", "激动", "满足", "失望",
        "思念", "孤独", "幸福", "痛苦", "安全", "危险"
    ],
    places: [
        "学校", "医院", "银行", "超市", "餐厅", "咖啡厅",
        "电影院", "图书馆", "公园", "动物园", "博物馆", "游乐场",
        "海滩", "山", "森林", "沙漠", "湖", "河",
        "城市", "乡村", "家", "办公室", "工厂", "农场",
        "机场", "火车站", "汽车站", "地铁站", "加油站", "停车场",
        "酒店", "商场", "市场", "药店", "理发店", "健身房",
        "游泳池", "体育馆", "教堂", "寺庙", "墓地", "监狱"
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