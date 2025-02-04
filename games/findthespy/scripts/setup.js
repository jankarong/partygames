// 开始游戏
function startGame(settings) {
    // 保存游戏设置到 sessionStorage
    sessionStorage.setItem('gameSettings', JSON.stringify(settings));
    // 跳转到角色分配页面
    window.location.href = './role-assignment.html';
} 