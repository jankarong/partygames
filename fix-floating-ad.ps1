# 修复所有HTML文件中的悬浮广告代码

$rootDir = "C:\Users\X\Documents\GitHub\partygames"
$htmlFiles = Get-ChildItem -Path $rootDir -Filter "*.html" -Recurse -Exclude "floating-ad-example.html", "yandex*", "button.html"

$fixedCount = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    # 检查是否包含有问题的广告代码
    if ($content -match "adCode:\s+<a rel=") {
        Write-Host "修复: $($file.FullName)" -ForegroundColor Yellow

        # 计算相对路径的深度
        $relativePath = $file.FullName -replace [regex]::Escape($rootDir + "\"), ""
        $depth = ($relativePath -split [regex]::Escape("\")).Count - 1

        # 计算回到根目录的路径
        $rootPath = ""
        for ($i = 1; $i -lt $depth; $i++) {
            $rootPath += "../"
        }

        # 如果是根目录的文件，使用绝对路径
        if ($depth -eq 0) {
            $cssPath = "/css/floating-ad.css"
            $jsPath = "/js/floating-ad.js"
        } else {
            $cssPath = "$($rootPath)css/floating-ad.css"
            $jsPath = "$($rootPath)js/floating-ad.js"
        }

        # 替换有问题的广告代码
        $newContent = $content -replace `
            '<!-- Floating Ad -->.*?</script>(?=\s*</body>)', `
            @"
    <!-- Floating Ad -->
    <link rel="stylesheet" href="$cssPath">
    <script src="$jsPath"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof FloatingAdManager !== 'undefined') {
                new FloatingAdManager({
                    showDelay: 2000,
                    rememberClosure: true,
                    adCode: ``
                        <a rel="sponsored" href="https://shopify.pxf.io/c/6627714/3323852/13624" target="_top" id="3323852">
                            <img src="//a.impactradius-go.com/display-ad/13624-3323852" border="0" alt="Shopify" width="640" height="100"/>
                        </a>
                        <img height="0" width="0" src="https://imp.pxf.io/i/6627714/3323852/13624" style="position:absolute;visibility:hidden;" border="0" />
                    ``
                });
            }
        });
    </script>
"@ -replace '``', '`'

        # 写入文件
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        $fixedCount++
    }
}

Write-Host "`n========== 完成 ==========" -ForegroundColor Cyan
Write-Host "已修复: $fixedCount 个文件" -ForegroundColor Green
