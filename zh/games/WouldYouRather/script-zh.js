const questions = [
    // 食物相关
    {
        optionA: "再也不能吃甜食",
        optionB: "再也不能吃咸的食物"
    },
    {
        optionA: "只能吃辣的食物",
        optionB: "只能吃清淡的食物"
    },
    {
        optionA: "一辈子只能吃火锅",
        optionB: "一辈子只能吃寿司"
    },
    {
        optionA: "每天必须喝10杯咖啡",
        optionB: "永远不能喝咖啡"
    },
    {
        optionA: "只能吃素食",
        optionB: "只能吃肉食"
    },

    // 超能力相关
    {
        optionA: "能读懂所有人的心思",
        optionB: "让所有人都能读懂你的心思"
    },
    {
        optionA: "回到过去改变一件事",
        optionB: "看到未来的一切"
    },
    {
        optionA: "瞬间移动但每次都会晕车10分钟",
        optionB: "能飞但只能飞3米高"
    },
    {
        optionA: "永远不会感到疲惫",
        optionB: "永远不会感到饥饿"
    },
    {
        optionA: "能和动物对话",
        optionB: "能说世界上所有的语言"
    },
    {
        optionA: "拥有透视眼",
        optionB: "拥有隐身术"
    },
    {
        optionA: "能控制天气",
        optionB: "能控制时间"
    },

    // 生活方式
    {
        optionA: "只能在白天清醒",
        optionB: "只能在夜晚清醒"
    },
    {
        optionA: "住在没有音乐的世界",
        optionB: "住在没有电影电视的世界"
    },
    {
        optionA: "永远不能用手机",
        optionB: "永远不能看电视"
    },
    {
        optionA: "住在古代但是皇帝",
        optionB: "住在现代但是普通人"
    },
    {
        optionA: "每天只能睡3小时",
        optionB: "每天必须睡15小时"
    },
    {
        optionA: "永远不能洗澡",
        optionB: "永远不能刷牙"
    },

    // 情感智慧
    {
        optionA: "世界上最聪明但没人爱",
        optionB: "被所有人爱但智商平平"
    },
    {
        optionA: "永远诚实",
        optionB: "永远善良"
    },
    {
        optionA: "知道自己的死亡日期",
        optionB: "知道所有人的死亡日期"
    },
    {
        optionA: "永远孤独但富有",
        optionB: "永远贫穷但有真爱"
    },
    {
        optionA: "失去所有记忆",
        optionB: "永远不能形成新记忆"
    },

    // 金钱相关
    {
        optionA: "有无限的钱但只能花在别人身上",
        optionB: "钱只有一半但可以随意花"
    },
    {
        optionA: "中彩票1亿但必须捐出9000万",
        optionB: "稳定赚到1000万"
    },
    {
        optionA: "有钱但永远不快乐",
        optionB: "没钱但永远快乐"
    },
    {
        optionA: "免费环游世界但不能拍照",
        optionB: "只能在国内旅游但可以记录一切"
    },

    // 社交相关
    {
        optionA: "在所有人面前出丑一次",
        optionB: "永远不能在公共场合说话"
    },
    {
        optionA: "被最好的朋友背叛",
        optionB: "背叛最好的朋友"
    },
    {
        optionA: "永远不能交新朋友",
        optionB: "失去所有老朋友"
    },
    {
        optionA: "成为网红但被全网黑",
        optionB: "默默无闻但被少数人深爱"
    },
    {
        optionA: "能听到别人对你的真实想法",
        optionB: "别人永远对你说真话"
    },

    // 外貌身体
    {
        optionA: "永远不会变老但会变丑",
        optionB: "快速衰老但永远美丽"
    },
    {
        optionA: "身高2米",
        optionB: "身高1米5"
    },
    {
        optionA: "头发永远不能剪",
        optionB: "永远是光头"
    },
    {
        optionA: "只能穿一种颜色的衣服",
        optionB: "每天必须穿不同颜色的衣服"
    },
    {
        optionA: "声音像小孩",
        optionB: "声音像老人"
    },

    // 娱乐科技
    {
        optionA: "只能看一部电影重复一万遍",
        optionB: "永远不能再看电影"
    },
    {
        optionA: "只能听一首歌",
        optionB: "永远听不到音乐"
    },
    {
        optionA: "只能玩一款游戏",
        optionB: "永远不能玩游戏"
    },
    {
        optionA: "网络永远很慢",
        optionB: "网络经常断线"
    },
    {
        optionA: "手机永远只有1%电量但能用",
        optionB: "手机永远满电但经常死机"
    },

    // 工作学习
    {
        optionA: "做自己喜欢的工作但工资很低",
        optionB: "做讨厌的工作但工资很高"
    },
    {
        optionA: "永远不用工作但很无聊",
        optionB: "做喜欢的工作但很忙碌"
    },
    {
        optionA: "考试永远第一名但没朋友",
        optionB: "成绩平平但朋友很多"
    },
    {
        optionA: "学什么都很快但容易忘",
        optionB: "学得很慢但永远不忘"
    },

    // 奇葩选择
    {
        optionA: "每说一句话都要唱出来",
        optionB: "每走一步都要跳着走"
    },
    {
        optionA: "永远只能说真话",
        optionB: "别人永远不相信你说的话"
    },
    {
        optionA: "每次打喷嚏都会传送到随机地点",
        optionB: "每次打嗝都会说出内心想法"
    },
    {
        optionA: "永远不能笑",
        optionB: "永远不能哭"
    },
    {
        optionA: "每天必须对10个陌生人说'我爱你'",
        optionB: "每天必须对认识的人说一句狠话"
    },

    // 家庭感情
    {
        optionA: "父母能读懂你的所有想法",
        optionB: "你能读懂父母的所有想法"
    },
    {
        optionA: "和爱人分开但对方幸福",
        optionB: "和爱人在一起但对方不快乐"
    },
    {
        optionA: "忘记所有恋爱回忆",
        optionB: "忘记所有家庭回忆"
    },
    {
        optionA: "永远单身但有很多朋友",
        optionB: "只有一个爱人但没有朋友"
    }
];

let currentQuestion = -1;
let selectedOption = null;

const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const optionAText = document.getElementById('optionAText');
const optionBText = document.getElementById('optionBText');
const percentageA = document.getElementById('percentageA');
const percentageB = document.getElementById('percentageB');
const nextButton = document.getElementById('nextQuestion');

function showNextQuestion() {
    // 重置选择
    optionA.classList.remove('selected');
    optionB.classList.remove('selected');
    percentageA.style.opacity = '0';
    percentageB.style.opacity = '0';
    selectedOption = null;

    // 获取下一个问题
    currentQuestion = (currentQuestion + 1) % questions.length;
    const question = questions[currentQuestion];

    // 更新文字
    optionAText.textContent = question.optionA;
    optionBText.textContent = question.optionB;
}

function selectOption(option) {
    if (selectedOption !== null) return;

    selectedOption = option;
    const otherOption = option === 'A' ? 'B' : 'A';

    // 显示选择
    document.getElementById(`option${option}`).classList.add('selected');

    // 生成随机百分比
    const percentage = Math.floor(Math.random() * 31) + 35; // 35-65%
    const otherPercentage = 100 - percentage;

    // 显示百分比
    document.getElementById(`percentage${option}`).textContent = `${percentage}%`;
    document.getElementById(`percentage${otherOption}`).textContent = `${otherPercentage}%`;
    
    document.getElementById(`percentage${option}`).style.opacity = '1';
    document.getElementById(`percentage${otherOption}`).style.opacity = '1';
}

// 重置游戏
function resetGame() {
    currentQuestion = -1;
    selectedOption = null;
    showNextQuestion();
}

// 事件监听
optionA.addEventListener('click', () => selectOption('A'));
optionB.addEventListener('click', () => selectOption('B'));
nextButton.addEventListener('click', showNextQuestion);

// 如果有重置按钮，添加事件监听
const resetButton = document.getElementById('resetButton');
if (resetButton) {
    resetButton.addEventListener('click', resetGame);
}

// 显示第一个问题
showNextQuestion();