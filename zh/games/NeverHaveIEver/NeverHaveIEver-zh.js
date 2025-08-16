const statements = [
    // 感情恋爱类
    "我有过在第一次约会就接吻",
    "我有过暗恋朋友的对象",
    "我有过发错微信给别人",
    "我有过装病逃避约会或聚会",
    "我有过一夜情",
    "我有过谎报自己的年龄",
    "我有过地下恋情",
    "我有过在考试中作弊",
    "我有过被当场抓住撒谎",
    "我有过暗恋老师或老板",
    "我有过裸体游泳",
    "我有过做关于认识的人的春梦",
    "我有过为了打折或免费东西而撒娇",
    "我有过暗恋朋友的前任",
    "我有过偷看别人的手机",
    "我有过谎报自己的感情状态",
    "我有过迷恋明星",
    "我有过发暧昧照片",
    "我有过暗恋同事",
    "我有过用小号或假账号",
    "我有过暗恋朋友的兄弟姐妹",
    "我有过谎报自己的工作或收入",
    "我有过暗恋邻居",
    "我有过暗恋最好的朋友",
    "我有过对陌生人一见钟情",
    "我有过暗恋明星的另一半",
    "我有过暗恋朋友的父母",
    "我有过暗恋助教",
    "我有过暗恋朋友喜欢的人",
    "我有过暗恋朋友的朋友",

    // 日常生活类
    "我有过在课堂上睡着",
    "我有过在公共场所唱歌",
    "我有过熬夜通宵",
    "我有过偷吃室友的食物",
    "我有过在下雨天忘记带伞",
    "我有过翘课打游戏",
    "我有过在电影院看电影时睡着",
    "我有过在公共场所穿反衣服",
    "我有过在公共场所大声放屁",
    "我有过约会迟到",
    "我有过在洗澡时唱歌",
    "我有过在公共场所摔倒",
    "我有过整夜玩游戏",
    "我有过把咖啡洒在键盘上",
    "我有过在麦克风还开着时说尴尬的话",
    "我有过冲动网购",
    "我有过假装健身",
    "我有过垃圾分类错误",
    "我有过在最糟糕的时候手机响了",
    "我有过把重要文件忘在打印机里",

    // 社交尴尬类
    "我有过在社交媒体上假装单身",
    "我有过装病逃避什么事情",
    "我有过假装听懂别人在说什么",
    "我有过把衣服在洗衣机里洗坏",
    "我有过在公交车上睡过站",
    "我有过搞混重要日期",
    "我有过叫错别人的名字",
    "我有过在朋友圈发后悔的内容",
    "我有过在群里发错消息",
    "我有过在不合适的时候大笑",

    // 学习工作类
    "我有过上课迟到",
    "我有过在会议上睡着",
    "我有过在工作时间刷抖音",
    "我有过假装很忙来逃避工作",
    "我有过在老板面前说错话",
    "我有过忘记重要的截止日期",
    "我有过在演讲时忘词",
    "我有过在面试时撒谎",
    "我有过抄袭作业",
    "我有过在课堂上玩手机被抓",

    // 家庭朋友类
    "我有过和父母撒谎",
    "我有过偷用家人的钱",
    "我有过背后说朋友坏话",
    "我有过食言重要承诺",
    "我有过忘记朋友的生日",
    "我有过拒绝帮助别人",
    "我有过嫉妒朋友的成功",
    "我有过在家庭聚会上撒谎",
    "我有过逃避家务",
    "我有过和兄弟姐妹打架",

    // 饮食购物类
    "我有过半夜偷吃零食",
    "我有过因为便宜买不需要的东西",
    "我有过点外卖点到破产",
    "我有过因为减肥饿肚子",
    "我有过吃过期食物",
    "我有过在餐厅吃到不喜欢的菜还说好吃",
    "我有过为了省钱吃泡面一个月",
    "我有过买假货",
    "我有过因为包装好看买东西",
    "我有过为了试吃去超市蹭吃",

    // 娱乐爱好类
    "我有过为了追星花大钱",
    "我有过为了游戏充钱",
    "我有过追剧追到天亮",
    "我有过因为看小说忘记时间",
    "我有过在KTV唱歌跑调",
    "我有过在游戏里骂队友",
    "我有过为了抢红包熬夜",
    "我有过在直播间刷礼物",
    "我有过因为追星和朋友吵架",
    "我有过在游戏里被骗装备",

    // 健康习惯类
    "我有过一天刷牙少于两次",
    "我有过连续几天不洗头",
    "我有过熬夜到第二天不睡觉",
    "我有过一天喝水少于8杯",
    "我有过因为懒得动而点外卖",
    "我有过因为玩手机而忘记吃饭",
    "我有过一坐就是一整天不起来",
    "我有过因为追剧而忘记睡觉",
    "我有过连续一周没运动",
    "我有过因为减肥而节食"
];

let usedStatements = [];

document.addEventListener('DOMContentLoaded', () => {
    const statementElement = document.getElementById('statement');
    const nextButton = document.getElementById('nextBtn');
    const resetButton = document.getElementById('resetBtn');

    function getRandomStatement() {
        if (statements.length === usedStatements.length) {
            return '游戏结束！点击重置按钮重新开始。';
        }

        let availableStatements = statements.filter(statement => !usedStatements.includes(statement));
        let randomIndex = Math.floor(Math.random() * availableStatements.length);
        let selectedStatement = availableStatements[randomIndex];
        usedStatements.push(selectedStatement);
        return selectedStatement;
    }

    function resetGame() {
        usedStatements = [];
        statementElement.textContent = '点击"开始"按钮获取第一个问题！';
        nextButton.textContent = '开始';
        nextButton.disabled = false;
    }

    nextButton.addEventListener('click', () => {
        const newStatement = getRandomStatement();
        statementElement.textContent = newStatement;
        if (nextButton.textContent === '开始') {
            nextButton.textContent = '下一题';
        }
        if (usedStatements.length === statements.length) {
            nextButton.disabled = true;
        }
    });

    resetButton.addEventListener('click', resetGame);

    // 初始化游戏
    resetGame();
});