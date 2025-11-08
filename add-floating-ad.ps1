param(
    [string]$FilePath = ""
)

# 悬浮广告脚本模板
$adScript = @"
    <!-- Floating Ad -->
    <link rel="stylesheet" href="{CSS_PATH}">
    <script src="{JS_PATH}"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof FloatingAdManager !== 'undefined') {
                new FloatingAdManager({
                    showDelay: 3000,
                    rememberClosure: true,
                    adCode: `
                        <a rel="sponsored" href="https://shopify.pxf.io/c/6627714/3323852/13624" target="_top" id="3323852">
                            <img src="//a.impactradius-go.com/display-ad/13624-3323852" border="0" alt="Shopify" width="640" height="100"/>
                        </a>
                        <img height="0" width="0" src="https://imp.pxf.io/i/6627714/3323852/13624" style="position:absolute;visibility:hidden;" border="0" />
                    `
                });
            }
        });
    </script>
"@

function Get-RelativePathToRoot {
    param([string]$FilePath)

    # 获取文件相对于项目根目录的深度
    $relativePath = $FilePath -replace [regex]::Escape("C:\Users\X\Documents\GitHub\partygames\"), ""
    $depth = ($relativePath -split [regex]::Escape("\")).Count - 1

    # 计算返回根目录的 ../
    $rootPath = ""
    for ($i = 0; $i -lt $depth; $i++) {
        $rootPath += "../"
    }

    return $rootPath
}

function Add-FloatingAdToFile {
    param(
        [string]$FilePath
    )

    # 检查文件是否存在
    if (-not (Test-Path $FilePath)) {
        Write-Error "文件不存在: $FilePath"
        return $false
    }

    # 读取文件内容
    $content = Get-Content $FilePath -Raw -Encoding UTF8

    # 检查是否已经添加了广告脚本
    if ($content -like "*Floating Ad*" -or $content -like "*FloatingAdManager*") {
        Write-Warning "文件已包含悬浮广告: $FilePath"
        return $false
    }

    # 计算CSS和JS的相对路径
    $rootPath = Get-RelativePathToRoot $FilePath
    $cssPath = "$($rootPath)css/floating-ad.css"
    $jsPath = "$($rootPath)js/floating-ad.js"

    # 替换路径占位符
    $adScriptWithPath = $adScript -replace "{CSS_PATH}", $cssPath -replace "{JS_PATH}", $jsPath

    # 找到 </body> 标签并在其前插入脚本
    if ($content -match "</body>") {
        $newContent = $content -replace "</body>", "$adScriptWithPath`n</body>"

        # 写入文件
        Set-Content -Path $FilePath -Value $newContent -Encoding UTF8 -Force
        Write-Host "✓ 已添加广告到: $FilePath" -ForegroundColor Green
        return $true
    } else {
        Write-Error "文件中未找到 </body> 标签: $FilePath"
        return $false
    }
}

# 如果指定了单个文件
if ($FilePath) {
    Add-FloatingAdToFile $FilePath
} else {
    # 处理所有 HTML 文件
    $rootDir = "C:\Users\X\Documents\GitHub\partygames"
    $htmlFiles = Get-ChildItem -Path $rootDir -Filter "*.html" -Recurse -Exclude "floating-ad-example.html", "yandex*"

    Write-Host "找到 $($htmlFiles.Count) 个 HTML 文件"

    $successCount = 0
    $skipCount = 0

    foreach ($file in $htmlFiles) {
        $result = Add-FloatingAdToFile $file.FullName
        if ($result) {
            $successCount++
        } else {
            $skipCount++
        }
    }

    Write-Host "`n========== 处理完成 ==========" -ForegroundColor Cyan
    Write-Host "✓ 成功添加: $successCount" -ForegroundColor Green
    Write-Host "⊘ 跳过: $skipCount" -ForegroundColor Yellow
}
