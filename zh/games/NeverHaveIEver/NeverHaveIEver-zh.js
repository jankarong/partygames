const statements = [
    // 感情恋爱类
    "我从未在第一次约会就接吻过",
    "我从未暗恋过朋友的对象",
    "我从未发错过微信给别人",
    "我从未装病逃避约会或聚会",
    "我从未有过一夜情",
    "我从未谎报过自己的年龄",
    "我从未有过地下恋情",
    "我从未在考试中作弊",
    "我从未被当场抓住撒谎",
    "我从未暗恋过老师或老板",
    "我从未裸体游泳过",
    "我从未做过关于认识的人的春梦",
    "我从未为了打折或免费东西而撒娇",
    "我从未暗恋过朋友的前任",
    "我从未偷看过别人的手机",
    "我从未谎报过自己的感情状态",
    "我从未迷恋过明星",
    "我从未发过暧昧照片",
    "我从未暗恋过同事",
    "我从未用过小号或假账号",
    "我从未暗恋过朋友的兄弟姐妹",
    "我从未谎报过自己的工作或收入",
    "我从未暗恋过邻居",
    "我从未暗恋过最好的朋友",
    "我从未对陌生人一见钟情",
    "我从未暗恋过明星的另一半",
    "我从未暗恋过朋友的父母",
    "我从未暗恋过助教",
    "我从未暗恋过朋友喜欢的人",
    "我从未暗恋过朋友的朋友",

    // 日常生活类
    "我从未在课堂上睡着过",
    "我从未在公共场所唱过歌",
    "我从未熬夜通宵过",
    "我从未偷吃过室友的食物",
    "我从未在下雨天忘记带伞",
    "我从未翘课打游戏",
    "我从未在电影院看电影时睡着",
    "我从未在公共场所穿反衣服",
    "我从未在公共场所大声放屁",
    "我从未约会迟到过",
    "我从未在洗澡时唱歌",
    "我从未在公共场所摔倒过",
    "我从未整夜玩游戏",
    "我从未把咖啡洒在键盘上",
    "我从未在麦克风还开着时说尴尬的话",
    "我从未冲动网购过",
    "我从未假装健身过",
    "我从未垃圾分类错误过",
    "我从未在最糟糕的时候手机响了",
    "我从未把重要文件忘在打印机里",

    // 社交尴尬类
    "我从未在社交媒体上假装单身",
    "我从未装病逃避什么事情",
    "我从未假装听懂别人在说什么",
    "我从未把衣服在洗衣机里洗坏过",
    "我从未在公交车上睡过站",
    "我从未搞混过重要日期",
    "我从未叫错过别人的名字",
    "我从未在朋友圈发过后悔的内容",
    "我从未在群里发错过消息",
    "我从未在不合适的时候大笑",

    // 学习工作类
    "我从未上课迟到过",
    "我从未在会议上睡着",
    "我从未在工作时间刷抖音",
    "我从未假装很忙来逃避工作",
    "我从未在老板面前说错话",
    "我从未忘记重要的截止日期",
    "我从未在演讲时忘词",
    "我从未在面试时撒谎",
    "我从未抄袭过作业",
    "我从未在课堂上玩手机被抓",

    // 家庭朋友类
    "我从未和父母撒谎过",
    "我从未偷用过家人的钱",
    "我从未背后说过朋友坏话",
    "我从未食言过重要承诺",
    "我从未忘记过朋友的生日",
    "我从未拒绝过帮助别人",
    "我从未嫉妒过朋友的成功",
    "我从未在家庭聚会上撒谎",
    "我从未逃避过家务",
    "我从未和兄弟姐妹打架",

    // 饮食购物类
    "我从未半夜偷吃过零食",
    "我从未因为便宜买过不需要的东西",
    "我从未点外卖点到破产",
    "我从未因为减肥饿肚子",
    "我从未吃过过期食物",
    "我从未在餐厅吃到不喜欢的菜还说好吃",
    "我从未为了省钱吃泡面一个月",
    "我从未买过假货",
    "我从未因为包装好看买过东西",
    "我从未为了试吃去超市蹭吃",

    // 娱乐爱好类
    "我从未为了追星花过大钱",
    "我从未为了游戏充过钱",
    "我从未追剧追到天亮",
    "我从未因为看小说忘记时间",
    "我从未在KTV唱歌跑调",
    "我从未在游戏里骂过队友",
    "我从未为了抢红包熬夜",
    "我从未在直播间刷过礼物",
    "我从未因为追星和朋友吵架",
    "我从未在游戏里被骗过装备",

    // 健康习惯类
    "我从未一天刷牙少于两次",
    "我从未连续几天不洗头",
    "我从未熬夜到第二天不睡觉",
    "我从未一天喝水少于8杯",
    "我从未因为懒得动而点外卖",
    "我从未因为玩手机而忘记吃饭",
    "我从未一坐就是一整天不起来",
    "我从未因为追剧而忘记睡觉",
    "我从未连续一周没运动",
    "我从未因为减肥而节食"
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